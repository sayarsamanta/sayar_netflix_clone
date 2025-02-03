import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import google from "../assets/google.png";
function GoogleSignin() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);
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
          console.log(res.data);
          setProfile(res.data);
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
          login();
        }}
      >
        <img alt="google" src={google} className="w-9"></img>
      </button>
      {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default GoogleSignin;
