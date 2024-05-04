import { useState } from "react";
import Header from "./Header";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [isSignInForm, setIsSignInForm] = useState(true)

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
    // console.log("Toggle...")
  }
  
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Header />

      <div className="absolute">
        <img
          className="w-full h-full object-cover filter brightness-50"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/4d7bb476-6d8b-4c49-a8c3-7739fddd135c/deecf71d-7a47-4739-9e1a-31b6b0d55be7/IN-en-20240429-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="background"
        />
      </div>

      <form className="w-[30%] absolute p-14 bg-black bg-opacity-80 flex flex-col items-start filter rounded-[0.500rem] gap-y-4 text-white">
        <h1 className=" font-bold text-[2rem] mb-2">
          {isSignInForm ? ("Sign In") : ("Sign Up")}
        </h1>

        {!isSignInForm && <input
          type="text"
          placeholder="Full Name"
          className="w-full p-4 bg-[#1f1f1f] bg-opacity-50 text-opacity-100 border border-white rounded-[0.220rem] outline-none "
        />}

        <input
          type="text"
          placeholder="Email Address"
          className="w-full p-4 bg-[#1f1f1f] bg-opacity-50 text-opacity-100 border border-white rounded-[0.220rem] outline-none "
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-4 bg-[#1f1f1f] bg-opacity-50 border border-white rounded-[0.220rem] outline-none text-opacity-100 "
          />

          <span
            className="absolute right-0 flex inset-y-0 items-center pr-3  cursor-pointer"
            // onClick={() => setShowPassword((prev) => !prev)}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </span>
        </div>

        <button className="text-white bg-[#E50914] p-2 rounded-md font-bold hover:bg-[#e50914e5] w-full">
          {isSignInForm ? ("Sign In") : ("Sign Up")}
        </button>

        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}
        </p>
        
      </form>
    </div>
  );
};

export default Login;
