import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="absolute w-full px-8 py-2 z-50 top-0 left-0 flex justify-between items-center">
      <img
        className="w-40"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      {user && (<div className="flex items-center gap-x-2">
        <img 
          className="w-12" 
          alt="userImage" 
          src={user?.photoURL} 
        />

        <button
          onClick={handleSignOut}
          className="cursor-pointer text-white bg-[#E50914] p-[0.3rem] rounded-md font-bold hover:bg-[#e50914e5] w-full"
        >
          Sign Out
        </button>
      </div>)}
    </div>
  );
};

export default Header;
