import React from 'react'
import NavBar from '../components/NavBar';

const Bookmark = () => {
    return (
        <div>
            <NavBar/>
            <div className="container mx-auto p-4 bg-[#F6F7FC] min-h-screen">
                <h1 className="text-center text-xl font-bold mb-4">Bookmarked Jobs</h1>
                <div className="bg-white shadow-md rounded-xl">
                    <h2 className="text-lg font-bold p-4 border-b">All Jobs</h2>
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="p-4 text-left">NO.</th>
                                <th className="p-4 text-left">TITLE</th>
                                <th className="p-4 text-left">COMPANY NAME</th>
                                <th className="p-4 text-left">APPLY</th>
                                <th className="p-4 text-left">DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-4">1</td>
                                <td className="p-4">UI/UX Designer</td>
                                <td className="p-4">Raycast corp</td>
                                <td className="p-4">
                                    <button className="bg-cyan-500 text-white p-2 rounded">Apply</button>
                                </td>
                                <td className="p-4">
                                    <button className="bg-red-500 text-white p-2 rounded">Delete</button>
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4">2</td>
                                <td className="p-4">DevOps Engineer</td>
                                <td className="p-4">Trainline group</td>
                                <td className="p-4">
                                    <button className="bg-cyan-500 text-white p-2 rounded">Apply</button>
                                </td>
                                <td className="p-4">
                                    <button className="bg-red-500 text-white p-2 rounded">Delete</button>
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4">3</td>
                                <td className="p-4">Software Developer</td>
                                <td className="p-4">Linear company</td>
                                <td className="p-4">
                                    <button className="bg-cyan-500 text-white p-2 rounded">Apply</button>
                                </td>
                                <td className="p-4">
                                    <button className="bg-red-500 text-white p-2 rounded">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    );
}

export default Bookmark