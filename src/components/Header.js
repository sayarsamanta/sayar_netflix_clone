import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { addUser, removeUser } from "../redux/slice/UserSlice";
import { IoIosArrowUp } from "react-icons/io";
import { profileImage } from "../utils/helper";
function Header() {
  const user = useSelector((store) => store?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const storedData = JSON.parse(localStorage.getItem("data"));
  useEffect(() => {
    if (storedData?.user_id) {
      navigate("/browse");
      return;
    }
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ...
        console.log(auth.currentUser, user);
        const { email, displayName, photoURL } = auth.currentUser;
        console.log(displayName, photoURL);
        dispatch(addUser({ email, displayName, photoURL }));
        localStorage.setItem(
          "data",
          JSON.stringify({ email, displayName, photoURL })
        );
        navigate("/browse");
      } else {
        // User is signed out
        // ...
        localStorage.removeItem("data");
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => listener();
  }, []);

  const signOutUser = () => {
    if (user?.user_id || storedData?.user_id) {
      localStorage.removeItem("data");
      dispatch(removeUser());
      navigate("/");
      return;
    }
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUser);
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="flex absolute z-50 w-screen bg-gradient-to-b from-black justify-between px-5 items-center">
      <img
        alt="logo"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        className="bg-cover bg-no-repeat w-40"
      ></img>
      {(user || storedData?.photoURL) && (
        <div
          className="group"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <img
            className="h-10 rounded-md"
            referrerPolicy="no-referrer"
            alt="profilelogo"
            src={user?.photoURL || storedData?.photoURL || profileImage}
          ></img>
          {showMenu && (
            <div className="w-32 h-10 flex bg-black text-white rounded-md absolute right-4 top-20 z-30 justify-center items-center">
              <IoIosArrowUp className="absolute -top-4 right-4 " fill="black" />
              <p
                className="cursor-pointer"
                onClick={() => {
                  signOutUser();
                }}
              >
                Log out
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
