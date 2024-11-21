import React, { useState } from "react";
import Button1 from "../components/Button1.jsx";
import { useNavigate } from "react-router-dom";




const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const features = [
    { name: "Personalized Job Postings", path: "/personalized-job-postings" },
    { name: "Resume Parser & ATS Scorer", path: "/resume-parser" },
    { name: "AI Resume & Cover Letter Generator", path: "/resume-generator" },
    { name: "Application Tracking", path: "/application-tracking" },
    { name: "Cold Emailing", path: "/cold-emailing" },
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-100 to-blue-200">
      {/* Header */}
      <header className="w-full flex justify-between items-center shadow-md px-4 sm:px-14 py-4 bg-cyan-50">
        <div className="text-3xl sm:text-4xl font-bold text-slate-700 flex items-center">
          <span className="text-green-600 mr-2">🚀</span> HireQT
        </div>
        <div className="flex justify-between items-center gap-2 relative">
          <Button1
            text="Pricing"
            onClick={() => navigate('/pricing')} // Redirect to Pricing page
            className="hover:cursor-pointer focus:outline-none hover:scale-105 transition-transform"
          />
          <div 
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)} 
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <Button1
            text="Services"
            className="hover:cursor-pointer focus:outline-none hover:scale-105 transition-transform"
          />
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-cyan-50 rounded-lg shadow-lg z-10"> {/* Increased width to 64 */}
              <ul className="py-2">
                {features.map((feature, index) => (
                  <li 
                    key={index} 
                    className="px-4 py-3 text-gray-800 hover:bg-gray-100 cursor-pointer" // Increased padding for better click area
                    onClick={() => {
                      navigate(feature.path);
                      setIsDropdownOpen(false); // Close dropdown after selection
                    }}
                  >
                    {feature.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
          <Button1
            text="Sign Up"
            onClick={() => navigate('/signup')}
            className="hover:cursor-pointer focus:outline-none hover:scale-105 transition-transform"
          />
          <Button1
            text="Sign In"
            onClick={() => navigate('/signin')}
            className="hover:cursor-pointer focus:outline-none hover:scale-105 transition-transform"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="h-full flex bg-cyan-50 justify-center items-center px-4 ">
        <div className="w-1/2 flex justify-center items-center pt-20">
          <img
            src="/HIREQT BOT.png"
            alt="Human"
            className="object-cover rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
            style={{
              width: '50%',
              height: 'auto',
            }}
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center p-5">
          <h1 className="text-6xl font-bold text-green-600 mb-4 text-center">
            HireQT
          </h1>
          <p className="text-3xl text-black font-bold mb-4 text-center">
            Your Personalized Job Recommendation Platform
          </p>
          <p className="text-lg text-gray-700 mb-4 text-center">
            HireQT empowers candidates by offering AI-based job recommendations tailored to your skills, experience, and career goals. Our platform seamlessly navigates your entire job search process.
          </p>
        </div>
      </main>

      {/* Key Features Section */}
      <section className="p-10 bg-cyan-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-600 mb-8">
            Key Features
          </h2>
          <p className="text-center text-lg text-gray-700 mb-8">
            Revolutionize your job search with our cutting-edge AI tools
          </p>
          <div className="flex flex-col space-y-6">
            {/* Feature 1 */}
            <div className="flex items-center w-full p-6 bg-blue-50 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex-1 pr-4">
                <h3 className="text-2xl font-bold text-gray-800">Personalized Job Postings</h3>
                <p className="text-gray-600">AI-driven job matching from multiple platforms, tailored to your unique profile.</p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Intelligent job aggregation</li>
                  <li>• Precise skill matching</li>
                  <li>• Real-time market insights</li>
                </ul>
              </div>
              <div className="border-l-2 border-gray-300 h-24 mx-4"></div>
              <div className="flex justify-center items-center w-1/3">
                <button className="px-6 py-2 text-white bg-black rounded-lg shadow-lg transition-transform transform hover:scale-105" onClick={() => navigate('/dashboard')}>
                  Try It Out
                </button>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center w-full p-6 bg-blue-50 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex-1 pr-4">
                <h3 className="text-2xl font-bold text-gray-800">Resume Parser & ATS Scorer</h3>
                <p className="text-gray-600">Advanced resume analysis to maximize your chances of getting interviewed.</p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Automated parsing</li>
                  <li>• ATS compatibility analysis</li>
                  <li>• Instant improvement suggestions</li>
                </ul>
              </div>
              <div className="border-l-2 border-gray-300 h-24 mx-4"></div>
              <div className="flex justify-center items-center w-1/3">
                <button className="px-6 py-2 text-white bg-green-600 rounded-lg shadow-lg transition-transform transform hover:scale-105" onClick={() => navigate('/resume-parser')}>
                  Try It Out
                </button>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center w-full p-6 bg-blue-50 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex-1 pr-4">
                <h3 className="text-2xl font-bold text-gray-800">AI Resume & Cover Letter Generator</h3>
                <p className="text-gray-600">Generate tailored, industry-specific documents optimized for your target roles.</p>
                <ul className="text-sm text-gray -500 space-y-2">
                  <li>• Job-specific content</li>
                  <li>• AI-powered language optimization</li>
                  <li>• Customized templates</li>
                </ul>
              </div>
              <div className="border-l-2 border-gray-300 h-24 mx-4"></div>
              <div className="flex justify-center items-center w-1/3">
                <button className="px-6 py-2 text-white bg-green-600 rounded-lg shadow-lg transition-transform transform hover:scale-105" onClick={() => navigate('/resume-generator')}>
                  Try It Out
                </button>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center w-full p-6 bg-blue-50 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex-1 pr-4">
                <h3 className="text-2xl font-bold text-gray-800">Application Tracking</h3>
                <p className="text-gray-600">Keep track of your job applications and their statuses in one place.</p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Monitor application progress</li>
                  <li>• Set reminders for follow-ups</li>
                  <li>• Organize job opportunities</li>
                </ul>
              </div>
              <div className="border-l-2 border-gray-300 h-24 mx-4"></div>
              <div className="flex justify-center items-center w-1/3">
                <button className="px-6 py-2 text-white bg-green-600 rounded-lg shadow-lg transition-transform transform hover:scale-105" onClick={() => navigate('/application-tracking')}>
                  Try It Out
                </button>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex items-center w-full p-6 bg-blue-50 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex-1 pr-4">
                <h3 className="text-2xl font-bold text-gray-800">Cold Emailing</h3>
                <p className="text-gray-600">Reach out to potential employers with personalized cold emails that stand out.</p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Customizable email templates</li>
                  <li>• AI-generated subject lines</li>
                  <li>• Follow-up reminders</li>
                </ul>
              </div>
              <div className="border-l-2 border-gray-300 h-24 mx-4"></div>
              <div className="flex justify-center items-center w-1/3">
                <button className="px-6 py-2 text-white bg-green-600 rounded-lg shadow-lg transition-transform transform hover:scale-105" onClick={() => navigate('/cold-emailing')}>
                  Try It Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Team Section */}
      <section className="p-10 bg-cyan-50 w-full flex flex-col items-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-green-600 mb-8">
            Meet The Team
          </h2>
          <div className="flex flex-col space-y-8 items-center">
            {/* Team Member 1 */}
            <div className="flex justify-between items-center w-full max-w-3xl p-6 bg-cyan-50 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl">
              <div className="flex-1 pr-4 text-left">
                <h3 className="text-2xl font-bold text-gray-800">Akshit Tambi</h3>
                <p className="text-gray-600">Software Developer with a passion for creating efficient and scalable applications.</p>
              </div>
              <img 
                src="/tambi-removebg-preview.png" 
                alt="Akshit Tambi" 
                className="w-32 h-40 object-cover rounded-full shadow-lg"
              />
            </div>

            {/* Team Member 2 */}
            <div className="flex justify-between items-center w-full max-w-3xl p-6 bg-cyan-50 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl">
 <div className="flex-1 pr-4 text-left">
                <h3 className="text-2xl font-bold text-gray-800">Diya Shah</h3>
                <p className="text-gray-600">AI Engineer specializing in machine learning and data analytics.</p>
              </div>
              <img 
                src="/public/diya-removebg.png" 
                alt="Diya Shah" 
                className="w-32 h-40 object-cover rounded-full shadow-lg"
              />
            </div>

            {/* Team Member 3 */}
            <div className="flex justify-between items-center w-full max-w-3xl p-6 bg-cyan-50 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl">
              <div className="flex-1 pr-4 text-left">
                <h3 className="text-2xl font-bold text-gray-800">Aayush Mittal</h3>
                <p className="text-gray-600">Data Scientist focused on extracting insights from complex datasets.</p>
              </div>
              <img 
                src="/mittal-removebg.png" 
                alt="Aayush Mittal" 
                className="w-32 h-40 object-cover rounded-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-cyan-50 py-4 flex justify-center items-center shadow-inner">
        <div className="text-sm text-gray-500">
          © 2024 HireQT App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;