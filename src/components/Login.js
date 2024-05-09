import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMAGE, USER_ICON } from "../utils/constants";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data
    const nameValue = name.current ? name.current.value : "";
    const emailValue = email.current ? email.current.value : "";
    const passwordValue = password.current ? password.current.value : "";

    const message = checkValidData(
      nameValue,
      emailValue,
      passwordValue,
      !isSignInForm
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic

      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: nameValue,
            photoURL: USER_ICON,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic

      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    // console.log("Toggle...")
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Header />

      <div className="absolute">
        <img
          className="w-full h-full object-cover filter brightness-50"
          src={BG_IMAGE}
          alt="background"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[30%] absolute p-14 bg-black bg-opacity-80 flex flex-col items-start filter rounded-[0.500rem] gap-y-4 text-white"
      >
        <h1 className=" font-bold text-[2rem] mb-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="w-full p-4 bg-[#1f1f1f] bg-opacity-50 text-opacity-100 border border-white rounded-[0.220rem] outline-none "
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="w-full p-4 bg-[#1f1f1f] bg-opacity-50 text-opacity-100 border border-white rounded-[0.220rem] outline-none "
        />

        <div className="relative w-full">
          <input
            ref={password}
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
        <p className="text-red-700 ">{errorMessage}</p>

        <button
          className="text-white bg-[#E50914] p-2 rounded-md font-bold hover:bg-[#e50914e5] w-full"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
