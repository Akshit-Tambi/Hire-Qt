import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import InputBox from '../components/InputBox';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import BottomWarning from '../components/BottomWarning';
import Button1 from '../components/Button1';
import { signup } from '../services/operations/authApi';


const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

    async function handleClick(event) {
    event.preventDefault();
    const response = await signup(
      formData.firstname,
      formData.lastname,
      formData.email,
      formData.password
    );
    if (response === "User created successfully") {
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
      setShowError(false);
      navigate("/signin");
    } else {
      setShowError(true);
    }
  }  

  return (
    <div className="bg-blue-200 h-screen flex flex-col justify-between">
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

    <div className='flex-grow flex justify-center items-center'>
      <div className="bg-white rounded-lg w-[80%] sm:w-[50%] lg:w-[23%] text-center p-3">
          <div className="flex flex-col">
            <Heading label={"Sign Up"} />
            <SubHeading label={"Enter your information to create an account"} />
            <InputBox
              label={"First Name"}
              placeholder={"Akshit"}
              name={"firstname"}
              value={formData.firstname}
              onChange={changeHandler}
            />
            <InputBox
              label={"Last Name"}
              placeholder={"Tambi"}
              name={"lastname"}
              value={formData.lastname}
              onChange={changeHandler}
            />
            <InputBox
              label={"Email"}
              placeholder={"akstambi@example.com"}
              name={"email"}
              value={formData.email}
              onChange={changeHandler}
            />
            <InputBox
              label={"Password"}
              placeholder={"A@123456"}
              name={"password"}
              value={formData.password}
              onChange={changeHandler}
            />
            <br></br>
            <Button1 text={"Sign up"} onClick={handleClick} className="" />
            <BottomWarning
              label={"Already have an account? "}
              to={"/signin"}
              buttonText={"Sign in"}
            />
            {showError && (
              <div className="font-light text-red-700 text-xs mt-2">
                Signup Failed!
              </div>
            )}
          </div>
        </div>
      </div>  
    </div>
  );
}

export default Signup;