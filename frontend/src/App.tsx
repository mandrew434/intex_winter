import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import MoviesPage from './pages/MoviesPage';
import Header from './components/Header';
import Footer from './components/Footer';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import AllMoviesPage from './pages/AllMoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import AddMoviePage from './pages/AddMoviePage';
import TopRatedCaro from './components/TopRatedCaro';

import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen pt-20 pb-20 bg-[#2e1e1c] text-white">
        <Router>
          <Header />

          <main className="max-w-screen-xl mx-auto px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/allMovies" element={<AllMoviesPage />} />
              <Route
                path="/moviedetails/:showId"
                element={<MovieDetailsPage />}
              />
              <Route path="/admin/add" element={<AddMoviePage />} />
              <Route path="/contenttest" element={<TopRatedCaro />} />
            </Routes>
          </main>

          <Footer />
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
