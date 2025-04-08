import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full p-4 border-b shadow-sm bg-white z-50">
      <div className="flex justify-end max-w-screen-xl mx-auto">
        <button
          className="flex items-center text-sm px-4 py-2 rounded-md hover:bg-gray-100 transition"
          type="button"
        >
          <span className="mr-2">👤</span>
          Profile
        </button>
      </div>
    </header>
  )
}

export default Header
