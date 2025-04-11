import React from 'react'

function SpecificationCard({ label, value }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500 my-3">
    <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">{label}</div>
    <div className="text-gray-800 font-medium truncate">{value || "—"}</div>
  </div>
  )
}

export default SpecificationCard