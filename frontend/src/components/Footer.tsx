import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full p-4 border-t shadow-inner bg-gray-100 text-center text-sm z-50">
      <Link to="/privacy" className="text-blue-600 hover:underline">
        Privacy Policy
      </Link>
    </footer>
  )
}

export default Footer
