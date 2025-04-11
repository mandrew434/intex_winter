// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import LogoutButton from './Logout'; // adjust the path as needed

// const Header: React.FC = () => {
//   const location = useLocation();

//   // Determine if the logout button should be shown.
//   const showLogoutButton = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register';

//   return (
//     <header className="fixed top-0 left-0 w-full p-4 border-b shadow-sm bg-white z-50">
//       {/* Conditionally render the logout button */}
//       {showLogoutButton && <LogoutButton />}
//       <div className="flex justify-end max-w-screen-xl mx-auto">
//         <button
//           className="RKHeader flex items-center text-sm px-4 py-2 rounded-md hover:bg-gray-100 transition"
//           type="button"
//         >
//           <span className="mr-2">👤</span>
//           Profile
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React from 'react';
import { useLocation } from 'react-router-dom';
import LogoutButton from './Logout'; // Adjust the path as needed

const Header: React.FC = () => {
  const location = useLocation();
  const showLogoutButton = location.pathname !== '/' && location.pathname !== '/login';

  return (
    <header
      className="fixed top-0 left-0 w-full p-4 z-50"
      style={{
        background: 'transparent', // Removes the white background
        borderBottom: 'none',       // Remove the bottom border if desired
        boxShadow: 'none',          // Remove any shadow if desired
      }}
    >
      {showLogoutButton && <LogoutButton />}
    </header>
  );
};

export default Header;
