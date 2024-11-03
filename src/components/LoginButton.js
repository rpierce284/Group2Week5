import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    try {
      console.log("Attempting login...");
      await loginWithRedirect();
    } catch (e) {
      console.error("Login error:", e);
      alert("Login failed. Please check your Auth0 settings.");
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    logout({ returnTo: window.location.origin });
  };

  return (
    <button onClick={isAuthenticated ? handleLogout : handleLogin}>
      {isAuthenticated ? 'Log Out' : 'Log In'}
    </button>
  );
};

export default AuthButton;
