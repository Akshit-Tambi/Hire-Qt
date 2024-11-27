import React, {useState} from 'react'
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button1 from '../components/Button1';
import BottomWarning from '../components/BottomWarning';
import { tokenAtom } from '../store/atom';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { signin } from '../services/operations/authApi';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate=useNavigate();
  const setToken = useSetRecoilState(tokenAtom);
  const [showError, setShowError] = useState(false);

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleClick() {
    const token = await signin(formData.email , formData.password);
    console.log(token);
    if(token){
      setToken(token);
      setFormData({
        email: "",
        password: "",
      })
      console.log(formData);
      setShowError(false);
      navigate("/resume");
    }else{
      setShowError(true);
    }
  }

  return (
    <div className="bg-blue-200 h-screen flex flex-col justify-between">
      <header className="w-full flex justify-between items-center shadow px-4 sm:px-14 py-4 bg-white">
        <div className="text-3xl sm:text-4xl font-bold text-slate-700 hover:cursor-pointer">
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
            <Heading label={"Sign in"} />
            <SubHeading label={"Enter your credentials to access your account"} />
            <InputBox
              label={"Email"}
              placeholder={"akstambi@example.com"}
              onChange={changeHandler}
              name="email"
              value={formData.email}
            />
            <InputBox
              label={"Password"}
              placeholder={"A@123456"}
              onChange={changeHandler}
              name="password"
              value={formData.password}
            />
            <br></br>
            <Button1 text={"Sign in"} onClick={handleClick} />
            <BottomWarning
              label={"Don't have an account? "} 
              to={"/signup"}
              buttonText={"Sign up"}
            />
            {showError && (
              <div className="font-light text-red-700 text-xs mt-2">
                Signin Failed!
              </div>
            )}
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Signin