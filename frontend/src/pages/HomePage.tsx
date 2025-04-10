// import React from 'react';
import { useNavigate } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import BillboardBackground from '../components/BillboardBackground';

function HomePage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/register');
  };

  return (
    <div
      style={{
        /* A vertical display that covers the full viewport height. */
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',

        /* A gentle background gradient. Adjust or replace as desired. */
        background: 'linear-gradient(135deg, #091236 0%, #1E215D 100%)',
        color: '#fff',
      }}
    >
      {/* Billboard background goes here, behind everything */}
      <BillboardBackground />
      {/* Login Button (Fixed in Top Right) */}
      <button
        onClick={handleLogin}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          border: '1px solid #fff',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#fff',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            'rgba(255,255,255,0.3)';
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            'rgba(255,255,255,0.1)';
        }}
      >
        Login
      </button>

      {/* Main Content (Centered) */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
          Welcome to the Home Page
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            maxWidth: '500px',
            marginBottom: '30px',
            opacity: 0.9,
          }}
        >
          Here you can find various resources and information.
        </p>

        {/* Emphasized Sign Up Button */}
        <button
          onClick={handleSignup}
          style={{
            padding: '20px 40px',
            backgroundColor: '#00b894',
            color: '#fff',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              'scale(1.05)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              '0 6px 12px rgba(0,0,0,0.3)';
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              'scale(1.0)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              '0 4px 10px rgba(0,0,0,0.3)';
          }}
        >
          Sign Up
        </button>
      </div>

      {/* Cookie Consent Banner */}
      <CookieConsent style={{ background: '#222' }}>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </div>
  );
}

export default HomePage;
