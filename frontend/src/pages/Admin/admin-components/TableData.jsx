import React from 'react'

const TableData = () => {
    return (
        <div>
            <div className="bg-white rounded-lg p-4 shadow-md my-4">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left border-b-2 w-full">
                                <h2 className="text-ml font-bold text-gray-600">Transacciones</h2>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b w-full">
                            <td className="px-4 py-2 text-left align-top w-1/2">
                                <div>
                                    <h2>Comercio</h2>
                                    <p>24/07/2023</p>
                                </div>
                            </td>
                            <td className="px-4 py-2 text-right text-cyan-500 w-1/2">
                                <p>
                                    <span>150$</span>
                                </p>
                            </td>
                        </tr>
                        <tr className="border-b w-full">
                            <td className="px-4 py-2 text-left align-top w-1/2">
                                <div>
                                    <h2>Comercio</h2>
                                    <p>24/06/2023</p>
                                </div>
                            </td>
                            <td className="px-4 py-2 text-right text-cyan-500 w-1/2">
                                <p>
                                    <span>15$</span>
                                </p>
                            </td>
                        </tr>
                        <tr className="border-b w-full">
                            <td className="px-4 py-2 text-left align-top w-1/2">
                                <div>
                                    <h2>Comercio</h2>
                                    <p>02/05/2023</p>
                                </div>
                            </td>
                            <td className="px-4 py-2 text-right text-cyan-500 w-1/2">
                                <p>
                                    <span>50$</span>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default TableData