import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import Card from '../components/Card';
import Jobs from './Jobs';
import SideBar from '../sidebar/SideBar';
import PacmanLoader from 'react-spinners/PacmanLoader';


const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState({
        location: "",
        salary: "",
        experience: ""
    });
    const [isLoading , setIsLoading] = useState(true);
    const [currentPage , setCurrentPage]=useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        setIsLoading(true);
        fetch("jobs.json").then(res => res.json()).then(data => {
            setJobs(data);
            setIsLoading(false);
        })
    }, [])

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSelectedCategories(prev => ({
            ...prev,
            [name]: value
        }));
    }
    // filter jobs by title
    const filteredItems = jobs.filter((job) => {
        // Check if the job title matches the query
        const titleMatch = job.jobTitle.toLowerCase().indexOf(query.toLowerCase())!==-1;

        // Check if any of the keywords match the query
        /*const keywordMatch = job.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query.toLowerCase())
        );*/

        // Return true if either the title or any keyword matches the query
        // return titleMatch || keywordMatch;
        return titleMatch; 
      });    

    // Calculate the Index Range 
    const calculatePageRange = () =>{
        const startIndex = (currentPage-1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return {startIndex , endIndex};
    } 

    const nextPage = () =>{
        if(currentPage < Math.ceil(filteredItems.length / itemsPerPage)){
            setCurrentPage(currentPage + 1);
        }
    }

    const prevPage = () =>{
        if(currentPage > 1){
            setCurrentPage(currentPage-1);
        }
    }


    // Main Filter Function
    const filteredData = () => {
        let filteredJobs = jobs;

        // Apply search query filter
        if (query) {
            filteredJobs = filteredJobs.filter(job => 
                job.jobTitle.toLowerCase().includes(query.toLowerCase())
            );
        }

        // Apply location filter
        if (selectedCategories.location) {
            filteredJobs = filteredJobs.filter(job => 
                job.jobLocation.toLowerCase() === selectedCategories.location.toLowerCase()
            );
        }

        // Apply salary filter
        if (selectedCategories.salary) {
            filteredJobs = filteredJobs.filter(job => {
                const salaryRange = selectedCategories.salary.split('-');
                const minSalary = parseInt(salaryRange[0]);
                const maxSalary = parseInt(salaryRange[1]) || Infinity;
                return parseInt(job.maxPrice) >= minSalary && parseInt(job.maxPrice) <= maxSalary;
            });
        }

        // Apply experience filter
        if (selectedCategories.experience) {
            filteredJobs = filteredJobs.filter(job => 
                job.experienceLevel.toLowerCase() === selectedCategories.experience.toLowerCase()
            );
        }

        const {startIndex , endIndex} = calculatePageRange();
        filteredJobs = filteredJobs.slice(startIndex , endIndex);
        return filteredJobs.map((data, i) => <Card key={i} data={data} />);
    }

    const result = filteredData();

    return (
        <div>
            <NavBar />
            <Banner query={query} handleInputChange={handleInputChange} />

            <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
                <div className='bg-white p-4 rounded'>
                    <SideBar handleChange={handleChange} selectedCategories={selectedCategories} />
                </div>
                <div className='col-span-2 bg-white p-4 rounded-sm'>
                    {
                        isLoading ? (<PacmanLoader size={35}/>) : result.length > 0 ? (<Jobs result={result} />) : 
                        <>
                            <h2 className='text-lg font-bold mb-2'>{result.length} Jobs</h2> 
                            <p>No Data Found!</p>
                        </>
                    }
                    {/* Pagination*/}
                    {
                        result.length>0 ? (
                            <div className='flex justify-center mt-4 space-x-8'>
                                <button className='hover:underline'onClick={prevPage} disabled={currentPage===1}>Previous</button>
                                <span className='mx-2'>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)} </span>
                                <button className='hover:underline' onClick={nextPage} disabled = {currentPage === Math.ceil(filteredItems.length/itemsPerPage)}>Next</button>
                            </div>
                        ) : ""
                    }

                </div>
                <div className='bg-white p-4 rounded'>right</div>
            </div>
        </div>
    )
}

export default Dashboard