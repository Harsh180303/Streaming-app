import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-full px-8 py-2 z-50 top-0 left-0 flex justify-between items-center">
      <img
        className="w-40"
        src={LOGO}
        alt="logo"
      />
      {user && (<div className="flex items-center gap-x-2">
        <img 
          className="w-12 rounded-full border border-black p-[1.5px]" 
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
