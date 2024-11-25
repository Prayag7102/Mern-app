import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-800 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4">Sorry, the page you are looking for does not exist.</p>
        <Link
          to="/"
          className="mt-6 text-blue-500 hover:text-blue-700"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  )
}
