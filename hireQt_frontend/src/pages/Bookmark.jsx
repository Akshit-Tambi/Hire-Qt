import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // <-- Import Link here
import NavBar from '../components/NavBar';

const Bookmark = () => {
    const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

    useEffect(() => {
        const savedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs') || '[]');
        setBookmarkedJobs(savedJobs);
    }, []);

    const handleDelete = (jobId) => {
        const updatedJobs = bookmarkedJobs.filter(job => job.id !== jobId);
        setBookmarkedJobs(updatedJobs);
        localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedJobs));
    };

    return (
        <div>
            <NavBar />
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
                            {bookmarkedJobs.map((job, index) => (
                                <tr key={job.id} className="border-b">
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">{job.jobTitle}</td>
                                    <td className="p-4">{job.companyName}</td>
                                    <td className="p-4">
                                        <Link 
                                            to={`/job/${job.id}`} 
                                            className="bg-cyan-500 text-white p-2 rounded inline-block"
                                        >
                                            Apply
                                        </Link>
                                    </td>
                                    <td className="p-4">
                                        <button 
                                            className="bg-red-500 text-white p-2 rounded"
                                            onClick={() => handleDelete(job.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {bookmarkedJobs.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center">
                                        No bookmarked jobs found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Bookmark;
