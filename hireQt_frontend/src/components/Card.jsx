import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMapPin, FiClock, FiCalendar } from "react-icons/fi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const Card = ({ data, onBookmark, isBookmarked }) => {
    const { id, companyName, companyLogo, jobTitle, minPrice, maxPrice, jobLocation, experienceLevel, postingDate } = data;

    const handleBookmarkClick = (e) => {
        e.preventDefault(); // Prevent Link click event
        onBookmark(data, !isBookmarked);
    };

    return (
        <section className='bg-white p-4 rounded-lg shadow-md mb-4 flex items-center'>
            {/* Left Side - Job Details */}
            <Link to={`/job/${id}`} className='flex gap-4 flex-col sm:flex-row items-start flex-1 pr-4'>
                <img src={companyLogo} alt='' className='w-16 h-16 object-contain' />
                <div>
                    <h4 className='text-primary mb-1'>{companyName}</h4>
                    <h3 className='text-lg font-semibold mb-2'>{jobTitle}</h3>
                    <div className='text-primary/70 text-base flex flex-wrap gap-2 mb-2'>
                        <span className='flex items-center gap-2'><FiMapPin />{jobLocation}</span>
                        <span className='flex items-center gap-2'><FiClock />{experienceLevel}</span>
                        <span className='flex items-center gap-2'><FaMoneyBillTrendUp />{minPrice}-{maxPrice}</span>
                        <span className='flex items-center gap-2'><FiCalendar />{postingDate}</span>
                    </div>
                </div>
            </Link>

            {/* Vertical Divider */}
            <div className="border-l-2 border-gray-300 w-20 h-24 mx-4"></div>

            {/* Right Side - Buttons */}
            <div className="flex flex-col justify-center">
                <button 
                    onClick={handleBookmarkClick}
                    className={`mb-4 px-4 py-2 text-white ${isBookmarked ? 'bg-green-600' : 'bg-cyan-600'} rounded-lg transition-transform transform hover:scale-105`}
                >
                    {isBookmarked ? 'Bookmarked' : 'Interested'}
                </button>
                <Link 
                    to={`/job/${id}`} 
                    className="mb-4 px-4 py-2 text-white bg-cyan-600 rounded-lg transition-transform transform hover:scale-105"
                >
                    View Job
                </Link>
            </div>
        </section>
    );
}

export default Card;