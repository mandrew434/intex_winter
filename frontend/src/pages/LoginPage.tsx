// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function LoginPage() {
//   // state variables for email and passwords
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [rememberme, setRememberme] = useState<boolean>(false);
//   // state variable for error messages
//   const [error, setError] = useState<string>('');
//   const navigate = useNavigate();

//   // handle change events for input fields
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, type, checked, value } = e.target;
//     if (type === 'checkbox') {
//       setRememberme(checked);
//     } else if (name === 'email') {
//       setEmail(value);
//     } else if (name === 'password') {
//       setPassword(value);
//     }
//   };

//   const handleRegisterClick = () => {
//     navigate('/register');
//   };

//   // handle submit event for the form
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(''); // Clear any previous errors

//     if (!email || !password) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     const loginUrl = rememberme
//       ? 'https://intex-winter-backend-had2hmbubbgfczd8.eastus-01.azurewebsites.net/login?useCookies=true'
//       : 'https://intex-winter-backend-had2hmbubbgfczd8.eastus-01.azurewebsites.net/login?useSessionCookies=true';

//     try {
//       const response = await fetch(loginUrl, {
//         method: 'POST',
//         credentials: 'include', // ✅ Ensures cookies are sent & received
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       // Ensure we only parse JSON if there is content
//       let data = null;
//       const contentLength = response.headers.get('content-length');
//       if (contentLength && parseInt(contentLength, 10) > 0) {
//         data = await response.json();
//       }

//       if (!response.ok) {
//         throw new Error(data?.message || 'Invalid email or password.');
//       }

//       navigate('/movies');
//     } catch (error: any) {
//       setError(error.message || 'Error logging in.');
//       console.error('Fetch attempt failed:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="card border-0 shadow rounded-3 ">
//           <div className="card-body p-4 p-sm-5">
//             <h5 className="card-title text-center mb-5 fw-light fs-5">
//               Sign In
//             </h5>
//             <form onSubmit={handleSubmit}>
//               <div className="form-floating mb-3">
//                 <input
//                   className="form-control"
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={email}
//                   onChange={handleChange}
//                 />
//                 <label htmlFor="email">Email address</label>
//               </div>
//               <div className="form-floating mb-3">
//                 <input
//                   className="form-control"
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={password}
//                   onChange={handleChange}
//                 />
//                 <label htmlFor="password">Password</label>
//               </div>

//               <div className="form-check mb-3">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   value=""
//                   id="rememberme"
//                   name="rememberme"
//                   checked={rememberme}
//                   onChange={handleChange}
//                 />
//                 <label className="form-check-label" htmlFor="rememberme">
//                   Remember password
//                 </label>
//               </div>
//               <div className="d-grid mb-2">
//                 <button
//                   className="btn btn-primary btn-login text-uppercase fw-bold"
//                   type="submit"
//                 >
//                   Sign in
//                 </button>
//               </div>
//               <div className="d-grid mb-2">
//                 <button
//                   className="btn btn-primary btn-login text-uppercase fw-bold"
//                   onClick={handleRegisterClick}
//                 >
//                   Register
//                 </button>
//               </div>
//             </form>
//             {error && <p className="error">{error}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // export default LoginPage;
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // const SILLY_URL =
// //   'https://intex-winter-backend-had2hmbubbgfczd8.eastus-01.azurewebsites.net';

// const SILLY_URL = 'https://localhost:5000';

// function LoginPage() {
//   // State variables for email, password, and remember-me checkbox.
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [rememberme, setRememberme] = useState<boolean>(false);
//   // State variable for error messages.
//   const [error, setError] = useState<string>('');
//   const navigate = useNavigate();

//   // Handle change events for input fields.
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, type, checked, value } = e.target;
//     if (type === 'checkbox') {
//       setRememberme(checked);
//     } else if (name === 'email') {
//       setEmail(value);
//     } else if (name === 'password') {
//       setPassword(value);
//     }
//   };

//   const handleRegisterClick = () => {
//     navigate('/register');
//   };

//   // Handle submit event for the form.
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(''); // Clear any previous errors.

//     if (!email || !password) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     // Choose the login URL based on the "remember me" option.
//     const loginUrl = rememberme
//       ? `${SILLY_URL}/login?useCookies=true`
//       : `${SILLY_URL}/login?useSessionCookies=true`;

//     try {
//       // Attempt the login POST request.
//       const response = await fetch(loginUrl, {
//         method: 'POST',
//         credentials: 'include', // Ensures cookies are sent & received.
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       // Optionally parse JSON only if content exists.
//       let data = null;
//       const contentLength = response.headers.get('content-length');
//       if (contentLength && parseInt(contentLength, 10) > 0) {
//         data = await response.json();
//       }

//       if (!response.ok) {
//         throw new Error(data?.message || 'Invalid email or password.');
//       }

//       // After a successful login, call the API controller to get the user ID.
//       const encodedEmail = encodeURIComponent(email.trim());
//       const getUserIdUrl = `${SILLY_URL}/api/Movie/user-id/${encodedEmail}`;
//       const userIdResponse = await fetch(getUserIdUrl, { method: 'GET' });
//       if (!userIdResponse.ok) {
//         throw new Error('Failed to retrieve user ID.');
//       }
//       const userId = await userIdResponse.json();
//       console.log('User ID:', userId);
//       // Optionally, store the user ID using a context or localStorage:
//       // localStorage.setItem('userId', userId.toString());

//       navigate('/movies');
//     } catch (error: any) {
//       setError(error.message || 'Error logging in.');
//       console.error('Fetch attempt failed:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="card border-0 shadow rounded-3">
//           <div className="card-body p-4 p-sm-5">
//             <h5 className="card-title text-center mb-5 fw-light fs-5">
//               Sign In
//             </h5>
//             <form onSubmit={handleSubmit}>
//               <div className="form-floating mb-3">
//                 <input
//                   className="form-control"
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={email}
//                   onChange={handleChange}
//                   required
//                 />
//                 <label htmlFor="email">Email address</label>
//               </div>
//               <div className="form-floating mb-3">
//                 <input
//                   className="form-control"
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={password}
//                   onChange={handleChange}
//                   required
//                 />
//                 <label htmlFor="password">Password</label>
//               </div>
//               <div className="form-check mb-3">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   id="rememberme"
//                   name="rememberme"
//                   checked={rememberme}
//                   onChange={handleChange}
//                 />
//                 <label className="form-check-label" htmlFor="rememberme">
//                   Remember password
//                 </label>
//               </div>
//               <div className="d-grid mb-2">
//                 <button
//                   className="btn btn-primary btn-login text-uppercase fw-bold"
//                   type="submit"
//                 >
//                   Sign in
//                 </button>
//               </div>
//               <div className="d-grid mb-2">
//                 <button
//                   className="btn btn-primary btn-login text-uppercase fw-bold"
//                   onClick={handleRegisterClick}
//                   type="button"
//                 >
//                   Register
//                 </button>
//               </div>
//             </form>
//             {error && <p className="error">{error}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './../contexts/UserContext';

// const SILLY_URL =
//   'https://intex-winter-backend-had2hmbubbgfczd8.eastus-01.azurewebsites.net';

const SILLY_URL = 'https://localhost:5000';

function LoginPage() {
  // State variables for email, password, and remember-me checkbox.
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);
  // State variable for error messages.
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  // Get setUserId from our user context.
  const { setUserId } = useUserContext();

  // Handle change events for input fields.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === 'checkbox') {
      setRememberme(checked);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  // Handle submit event for the form.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear any previous errors.

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Choose the login URL based on the "remember me" option.
    const loginUrl = rememberme
      ? `${SILLY_URL}/login?useCookies=true`
      : `${SILLY_URL}/login?useSessionCookies=true`;

    try {
      // Attempt the login POST request.
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include', // Ensures cookies are sent & received.
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Optionally parse JSON only if content exists.
      let data = null;
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      // After a successful login, retrieve the user ID using the email.
      const encodedEmail = encodeURIComponent(email.trim());
      const getUserIdUrl = `${SILLY_URL}/user-id/${encodedEmail}`;
      const userIdResponse = await fetch(getUserIdUrl, { method: 'GET' });
      if (!userIdResponse.ok) {
        throw new Error('Failed to retrieve user ID.');
      }
      const retrievedUserId = await userIdResponse.json();
      console.log('User ID:', retrievedUserId);

      // Set the user ID in context so it can be accessed on other pages.
      setUserId(retrievedUserId);

      navigate('/movies');
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
      console.error('Fetch attempt failed:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card border-0 shadow rounded-3">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              Sign In
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberme"
                  name="rememberme"
                  checked={rememberme}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="rememberme">
                  Remember password
                </label>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  onClick={handleRegisterClick}
                  type="button"
                >
                  Register
                </button>
              </div>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
