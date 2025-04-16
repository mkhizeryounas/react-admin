export const API_URL =
  import.meta.env.VITE_APP_API_URL || 'http://localhost:3000';
export const AUTH0 = {
  DOMAIN: import.meta.env.VITE_APP_AUTH0_DOMAIN || 'shopdesk.auth0.com',
  CLIENT_ID:
    import.meta.env.VITE_APP_AUTH0_CLIENT_ID ||
    'YDlVbCYRTIsKGfDvGUaJU0WNuCIdXenE',
};
