import { useState } from 'react';
// custom hook for storing session token in state
export default function useSessionToken() {
    const getSessionToken = () => {
        const token = sessionStorage.getItem('token');
        const sessionToken = JSON.parse(token);
        return sessionToken
      };

  const [sessionToken, setSessionToken] = useState(getSessionToken);

  const storeToken = (token) => {
    sessionStorage.setItem('token', JSON.stringify(token));
    setSessionToken(token);
  };


  return {
    sessionToken,
    setSessionToken: storeToken
   
  }

}