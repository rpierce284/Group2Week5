import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '300px',
          margin: '20px auto',
          textAlign: 'center',
        }}
      >
        <img
          src={user.picture}
          alt={user.name}
          style={{
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            marginRight: '15px',
            border: '2px solid #4a90e2',
          }}
        />
        <div>
          <h2 style={{ margin: '0', color: '#333' }}>{user.name}</h2>
          <p style={{ margin: '5px 0', color: '#666' }}>{user.email}</p>
        </div>
      </div>
    )
  );
};

export default Profile;
