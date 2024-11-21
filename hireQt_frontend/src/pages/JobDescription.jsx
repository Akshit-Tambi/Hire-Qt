import {useState ,  useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import NavBar from '../components/NavBar';
import Button1 from '../components/Button1';

const JobDescription = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const[jobData , setJobData] = useState(null);
    const[isLoading , setIsLoading] = useState(true);

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
      
      const handleClick = ()=>{
        window.open('/','_blank');
        
      }



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
                  <h2 className="text-xl font-semibold text-gray-900">UI designer</h2>
                  <p className="text-gray-600">Equiconsulting Services</p>
                  <div className="flex items-center text-gray-600 mt-2">
                    <i className="fas fa-briefcase mr-2"></i>
                    <span>1 - 4 years</span>
                    <span className="mx-2">|</span>
                    <i className="fas fa-rupee-sign mr-2"></i>
                    <span>Not Disclosed</span>
                  </div>
                  <div className="flex items-center text-gray-600 mt-2">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    <span>Remote</span>
                  </div>
                  <div className="flex items-center text-gray-600 mt-2">
                    <i className="fas fa-map-pin mr-2"></i>
                    <span>Hiring office located in Remote</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Posted: 1 day ago</span>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button className="border border-blue-500 text-blue-500 font-bold rounded-full flex items-center gap-3 hover:bg-gray-100 transition duration-200 px-4 py-2 mr-2">
                      BookMark
                    </button>
                    <Button1 text="Apply on company site" onClick={()=>navigate(`/`)}></Button1>
                  </div>
                </div>
              </div>
    
              {/* Second card - 7 columns */}
              <div className="col-span-12 md:col-span-8">
                <div className="bg-white p-6 rounded-lg shadow-md h-full">
                  <h2 className="text-xl font-semibold text-gray-900">About The Job</h2>
                  <p className="text-gray-600">"About the CompanyCome join the \"QuickBooks Online Product Development team (Small Business and Self Employed Group)\" as a \"Senior Software Engineer\". QuickBooks is the flagship accounting software from Intuit that fuels millions of small business owners and accountants across multiple countries globally. QuickBooks is truly the operating system behind small business accounting and comes in multiple flavours \u2013 QuickBooks Online, QuickBooks Desktop as well as the mobile edition. The Small Business Group provides multiple offerings of QuickBooks features such as Core Accounting, Payments, Payroll, Point of Sale (POS). Built on cutting edge technologies by world class engineers based on Global Engineering Principles, the SBG product development team fosters innovation, provide the best in class experience to our small business owners, accountants and through Design for Delight, Rapid Prototyping, Fail Fast and Agile processes.https://quickbooks.intuit.com/smallbusiness/ResponsibilitiesGathering functional requirements, developing technical specifications, and project & test planningDesigning/developing web, software, mobile apps, prototypes, or proofs of concepts (POC\u2019s)Act in a technical leadership capacity: Mentoring junior engineers, new team members, and applying technical expertise to challenging programming and design problemsands-on codingResolve defects/bugs during QA testing, pre-production, production, and post-release patchesWork cross-functionally with various Intuit teams: product management, QA/QE, various product lines, or business units to drive forward resultsContribute to the design and architecture of the projectExperience with Agile Development, SCRUM, or Extreme Programming methodologiesScope & Impact: Responsible for complex features or multiple simple features. Works within the team and collaboration across partners/consumers. xecutes proficiently within a generally established architecture through technical solution design and delivery.Leverages their deep understanding of customers' product usage to make design, coding and/or solution choices.Owns the end-to-end quality, design, maintenance and support of their feature.Qualifications2+ years experience developing web, software, or mobile applications.Foundation skills: Coding, Design & Architecture, Operational Excellence,BS/MS in computer science or equivalent work experience. Proficient in programming in Java/J2EE technologies, design patterns, data structures, algorithms, troubleshooting, data handling.Writes reusable and self-serve code with coaching from seniors.Experience with the entire Software Development Life Cycle (SDLC).Experience with web services (consuming or creating) with REST or SOAP.Solid communication skills: Demonstrated ability to explain complex technical issues to both technical and non-technical audiences.Strong understanding of the Software design/architecture process.Experience with unit testing & Test Driven Development (TDD)."</p>
                </div>
              </div>
            </div>
          </div>
          <footer className="w-full bg-white py-4 flex justify-center items-center shadow-inner">
        <div className="text-sm text-gray-500">
        <span className='text-lg font-bold'>Disclaimer:</span> HireQT is an independent platform dedicated to providing information about job openings. We are not affiliated with, nor do we represent, any company, agency, <br/>or agent mentioned in the job listings. Please refer to our Terms of Services for further details.
        </div>
      </footer>
        </div>
      );
}

export default JobDescription

// tags ko sahi karvana hai 