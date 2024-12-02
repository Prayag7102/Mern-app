import React from 'react'

const Search = () => {
    return (
        <div className='mt-3'>
            <div className="bg-white rounded-full border-none p-3 mb-4 shadow-md">
                <div className="flex items-center">
                    <i className="px-3 fas fa-search ml-1" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="ml-3 focus:outline-none w-full"
                    />
                </div>
            </div>
        </div>
    )
}

export default Search