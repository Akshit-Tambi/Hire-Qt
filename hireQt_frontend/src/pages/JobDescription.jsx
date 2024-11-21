import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Button1 from '../components/Button1';
import ReactMarkdown from 'react-markdown'; 

const JobDescription = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [jobData, setJobData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch('/jobs.json');
                const allJobs = await response.json(); 
                const jobDetails = allJobs.find(job => job.id === Number(id));

                if (jobDetails) {
                    setJobData(jobDetails);
                } else {
                    console.error("Job not found");
                }
                
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching job details:", error);
                setIsLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (!jobData) {
        return <div>No job found</div>;
    }

    return (
        <div>
            <NavBar />
            <div className="container mx-auto px-4 py-8 bg-[#F6F8FC] min-h-screen">
                <div className="grid grid-cols-12 gap-6">
                    {/* First card - 5 columns */}
                    <div className="col-span-12 md:col-span-4">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-gray-900">{jobData.jobTitle}</h2>
                            <p className="text-gray-600">{jobData.companyName}</p>
                            <div className="flex items-center text-gray-600 mt-2">
                                <i className="fas fa-briefcase mr-2"></i>
                                <span>{jobData.experience}</span>
                                <span className="mx-2">|</span>
                                <i className="fas fa-rupee-sign mr-2"></i>
                                <span>{jobData.salary}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mt-2">
                                <i className="fas fa-map-marker-alt mr-2"></i>
                                <span>{jobData.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mt-2">
                                <i className="fas fa-map-pin mr-2"></i>
                                <span>Hiring office located in {jobData.hiringOffice}</span>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between items-center text-gray-600">
                                <span>Posted: {jobData.postedDate}</span>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button className="border border-blue-500 text-blue-500 font-bold rounded-full flex items-center gap-3 hover:bg-gray-100 transition duration-200 px-4 py-2 mr-2">
                                    BookMark
                                </button>
                                <Button1 text="Apply on company site" onClick={() => window.open(jobData.jobURL, '_blank')} />
                            </div>
                        </div>
                    </div>

                    {/* Second card - 7 columns */}
                    <div className="col-span-12 md:col-span-8">
                        <div className="bg-white p-6 rounded-lg shadow-md h-full">
                            <h2 className="text-xl font-semibold text-gray-900">About The Job</h2>
                            <ReactMarkdown className="text-gray-600">{jobData.description}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="w-full bg-white py-4 flex justify-center items-center shadow-inner">
                <div className="text-sm text-gray-500">
                    <span className='text-lg font-bold'>Disclaimer:</span> HireQT is an independent platform dedicated to providing information about job openings. We are not affiliated with, nor do we represent, any company, agency, <br /> or agent mentioned in the job listings. Please refer to our Terms of Services for further details.
                </div>
            </footer>
        </div>
    );
}

export default JobDescription;