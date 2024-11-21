import { useState, useEffect } from 'react';
import ls from '../utils/localstorage';
import axios from '../utils/axios';

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = ls.get('user');
  const accessToken = user?.accessToken;
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  const authenticate = async () => {
    if (!isAuthenticated) {
      return false;
    }
    let success = false;
    setIsLoading(true);
    try {
      await axios.get('/users/me');
      success = true;
    } catch (err) {
      console.log('Authenticate error', err);
      success = false;
    }
    setIsLoading(false);
    setIsAuthenticated(success);
    return success;
  };

  const logout = ({ returnTo = '/' }) => {
    ls.remove('user');
    window.location.href = returnTo;
  };

  const login = async ({ returnTo = '/', email, password }) => {
    const values = { email, password };
    setIsLoading(true);
    try {
      const { data: user } = await axios.post('/users/signin', values);
      ls.set({ key: 'user', data: user });
      setIsLoading(false);
      window.location.href = returnTo;
    } catch (err) {
      ls.remove('user');
      setIsLoading(false);
      throw err;
    }
  };

  const signup = async ({ returnTo = '/', email, password, name }) => {
    const values = {
      email,
      password,
      name,
    };

    setIsLoading(true);

    try {
      await axios.post('/users/signup', values);
      setIsLoading(false);
      window.location.href = returnTo;
    } catch (err) {
      ls.remove('user');
      setIsLoading(false);
      throw err;
    }
  };

  useEffect(() => {
    authenticate();
    // eslint-disable-next-line
  }, []);

  return {
    user,
    isAuthenticated,
    accessToken,
    isLoading,
    logout,
    login,
    signup,
  };
};

export default useAuth;
