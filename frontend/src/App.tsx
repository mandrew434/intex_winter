import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import MoviesPage from './pages/MoviesPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen pt-20 pb-20 bg-[#2e1e1c] text-white">
      <Router>
        <Header />

        <main className="max-w-screen-xl mx-auto px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/movies" element={<MoviesPage />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
