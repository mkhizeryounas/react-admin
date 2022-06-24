import React, { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import Loader from '../components/Loader';

export default function SignIn() {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader />;
}
