import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import google from "../assets/google.png";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slice/UserSlice";
import { useNavigate } from "react-router";
import { LuLoader } from "react-icons/lu";
function GoogleSignin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          //console.log(res.data);
          if (res?.data) {
            const {
              picture: photoURL,
              name: displayName,
              email,
              id: user_id,
            } = res?.data;
            dispatch(addUser({ photoURL, displayName, email, user_id }));
            localStorage.setItem(
              "data",
              JSON.stringify({ email, displayName, photoURL, user_id })
            );
            setLoading(false);
            navigate("/browse");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => {
      setError(error);
    },
  });
  return (
    <div className="flex justify-center">
      <button
        className="flex p-3 my-6 h-12 justify-center items-center bg-gray-300 w-full rounded-lg text-white "
        onClick={() => {
          setLoading(true);
          login();
        }}
      >
        {loading ? (
          <LuLoader />
        ) : (
          <img alt="google" src={google} className="w-9"></img>
        )}
      </button>
      {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default GoogleSignin;
