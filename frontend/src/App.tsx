import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import MoviesPage from './pages/MoviesPage'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/movies" element={<MoviesPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
