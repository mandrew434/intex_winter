// import { useNavigate } from 'react-router-dom';

// function Logout(props: { children: React.ReactNode }) {
//   const navigate = useNavigate();

//   const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('https://intex-winter-backend-had2hmbubbgfczd8.eastus-01.azurewebsites.net/logout', {
//         method: 'POST',
//         credentials: 'include', // Ensure cookies are sent
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         navigate('/');
//       } else {
//         console.error('Logout failed:', response.status);
//       }
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <a className="logout" href="#" onClick={handleLogout}>
//       {props.children}
//     </a>
//   );
// }

// export default Logout;

// LogoutButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://intex-winter-backend-had2hmbubbgfczd8.eastus-01.azurewebsites.net/logout',
        {
          method: 'POST',
          credentials: 'include', // Ensures cookies are sent.
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Logout failed:', response.status);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        padding: '10px 20px',
        backgroundColor: '#007bff', // Blue background
        color: '#fff',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        zIndex: 1000, // Ensure it's on top
        transition: 'background-color 0.3s ease',
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          '#0056b3';
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          '#007bff';
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
