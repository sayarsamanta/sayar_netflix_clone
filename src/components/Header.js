import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router";
import { addUser, removeUser } from "../redux/slice/UserSlice";
import { IoIosArrowUp } from "react-icons/io";
import { profileImage } from "../utils/constants";
import { FaSearch } from "react-icons/fa";
import { setShowSearch } from "../redux/slice/SearchSlice";
import { MdFavoriteBorder } from "react-icons/md";
import netflix from "../assets/netflix.png";
function Header() {
  const { user } = useSelector((store) => store?.user);
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
        const { email, displayName, photoURL } = auth.currentUser;
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
        localStorage.removeItem("data");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="flex absolute w-screen bg-transparent justify-between px-5 py-3 sm:py-3 md:py-0 lg:py-0 xl:py-0 items-center ">
      <img
        alt="logo"
        onClick={() => {
          dispatch(setShowSearch());
          navigate("/");
        }}
        src={netflix}
        className="w-[15%] cursor-pointer"
      ></img>
      {(user?.user_id || storedData?.photoURL) && (
        <div className="group">
          <div className="flex justify-center items-center">
            <Link className="" to={"favorites"}>
              <MdFavoriteBorder
                fill="white"
                size={25}
                className="mr-5 cursor-pointer"
                // onClick={(e) => {
                //   navigate("favorites");
                // }}
              />
            </Link>

            <FaSearch
              onClick={(e) => {
                navigate("search");
              }}
              fill="white"
              size={25}
              className="mr-5 cursor-pointer"
            />
            <div className="relative inline-block group">
              <img
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
                className="h-6 sm:h-8 md:h-10 lg:h-10 xl:h-10 rounded-md cursor-pointer"
                referrerPolicy="no-referrer"
                alt="profilelogo"
                src={user?.photoURL || storedData?.photoURL || profileImage}
              ></img>
            </div>
          </div>

          {showMenu && user && (
            <div className="w-32 h-10 flex bg-white text-black rounded-md absolute right-4 top-[50px] sm:top-[60px] md:top-[80px] lg:top-[80px] xl:top-[90px] z-30 justify-center items-center">
              <IoIosArrowUp
                className="absolute -top-4 right-[4px] "
                fill="white"
              />
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
