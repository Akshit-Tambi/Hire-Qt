import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import Card from '../components/Card';
import Jobs from './Jobs';
import SideBar from '../components/SideBar';

const Dashboard = () => {
    const[selectedCategory,setSelectedCategory] = useState(null);
    const[jobs,setJobs]=useState([]);
    
    useEffect(()=>{
        fetch("jobs.json").then(res=>res.json()).then(data=>{
            setJobs(data);
        })
    },[])

    const[query,setQuery]=useState("");
    const handleInputChange=(event)=>{
        setQuery(event.target.value);
        
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
      
      // -------------Radio Based Filtering ------------

      const handleChange = (event)=>{
        setSelectedCategory(event.target.value);
      }

      const filteredData=(jobs , selected , query)=>{
        let filteredJobs=jobs;
        /*if(query){
            filteredJobs=filteredItems;
        }*/
        if (query) {
            filteredJobs = filteredJobs.filter((job) =>
                job.jobTitle.toLowerCase().includes(query.toLowerCase())
            );
        }   
        if(selected){
            filteredJobs=filteredJobs.filter(({jobLocation , maxPrice , experienceLevel ,})=>{
                jobLocation.toLowerCase() === selected.toLowerCase() ||
                parseInt(maxPrice) <= parseInt(selected) ||
                experienceLevel.toLowerCase() === selected.toLowerCase()
                //keywords.toLowerCase() === selected.toLowerCase()
            })
            console.log(filteredJobs);
        }
        return filteredJobs.map((data,i)=><Card key={i} data={data}></Card>)
      }

      const result = filteredData(jobs , selectedCategory , query);

  return (
    <div>
        <NavBar></NavBar>
        <Banner query={query} handleInputChange={handleInputChange}></Banner>

        <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
            <div className='bg-white p-4 rounded'>
                <SideBar handleChange={handleChange} />
            </div>
            <div className='col-span-2 bg-white p-4 rounded-sm'><Jobs result={result}></Jobs></div>
            <div className='bg-white p-4 rounded'>right</div>
        </div>
    </div>
  )
}

export default Dashboard