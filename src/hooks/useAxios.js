import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../constants';

const useAxios = () => {
  const { getAccessTokenSilently } = useAuth0();

  const instance = axios.create({
    baseURL: API_URL,
  });

  instance.interceptors.request.use(async (value) => {
    const token = await getAccessTokenSilently();
    value.headers = {
      Authorization: `Bearer ${token}`,
    };
    return value;
  });

  return instance;
};

export default useAxios;
