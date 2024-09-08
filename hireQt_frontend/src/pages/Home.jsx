import React from "react";
import { useNavigate } from "react-router-dom";
import Flashcard from "../components/FlashCard.jsx";
import Button1 from "../components/Button1.jsx";


const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col">
      <header className="w-full flex justify-between items-center shadow px-4 sm:px-14 py-4 bg-white">
        <div className="text-3xl sm:text-4xl font-bold text-slate-700 ">
          HireQT
        </div>
        <div className="flex justify-between items-center gap-2">
          <Button1
            text="Sign Up"
            onClick={() => navigate("/signup")}
            className="hover:cursor-pointer focus:outline-none"
          >
          </Button1>
          <Button1
            text="Sign In"
            onClick={() => navigate("/signin")}
            className="hover:cursor-pointer focus:outline-none"
          >
          </Button1>
        </div>
      </header>
      <main className="h-full flex bg-blue-200">
        <div className="w-1/2 flex justify-center items-left pt-20">
            <img
            src="/inverted-removebg-preview.png" // Replace with your image URL
            alt="Human"
            className="object-cover  w-auto rounded-lg ml-20"
            />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center p-5">
            <h1 className="text-6xl font-bold text-green-600 mb-4">
                HireQT
            </h1>
            <p className="text-3xl text-black  font-bold mb-4">
                Your Personalized Job Recommendation Platform
            </p>
            <p className="text-lg text-gray-700 mb-4">
                HireQt empowers candidates by offering AI-based job recommendations tailored to their skills,experience, and career goals.In addition to direct messaging, HireQt features built-in resume analysis, ATS scoring, and personalized suggestions to help improve your resume. With our platform, you can seamlessly navigate the entire job search process, from finding the right job to making a lasting impression, all in one place.
            </p>
        </div>
      </main>
      <section className="p-10 bg-blue-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-600 mb-8">
            Key Features
        </h2>
    <p className="text-center text-lg text-gray-700 mb-8">
      Explore more tools and resources to help you land your dream job.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-2">Feature 1</h3>
        <p className="text-gray-600">Description of feature 1.</p>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-2">Feature 2</h3>
        <p className="text-gray-600">Description of feature 2.</p>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-2">Feature 3</h3>
        <p className="text-gray-600">Description of feature 3.</p>
      </div>
    </div>
  </div>
      </section>


      <section className="p-10 bg-blue-200 w-full flex flex-col items-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-green-600 mb-8 pb-4">What Makes Us Different</h2>
          <div className="flex justify-center">
            <img src="/What Makes us Different (1).png" alt="Key Features"className="object-cover w-auto"/>
          </div>
          <h2 className="text-4xl font-bold text-green-600 mb-8 pt-10">Meet The Team</h2>
          <div className="flex justify-center space-x-20">
            
            <Flashcard image={"/tambi-removebg-preview.png"} text={"Software Developer"} name={"Akshit Tambi"}></Flashcard>
            <Flashcard image={"/public/diya-removebg.png"} text={"AI Engineer"} name={"Diya Shah"}></Flashcard>
            <Flashcard image={"/mittal-removebg.png"} text={"Data Scientist"} name={"Aayush Mittal"}></Flashcard>
          </div>
        </div>
      </section>





      <footer className="w-full bg-white py-4 flex justify-center items-center shadow-inner">
        <div className="text-sm text-gray-500">
          © 2024 HireQT App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
