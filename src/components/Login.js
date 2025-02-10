import React, { useState } from "react";
import Header from "./Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validEmail, validPassword } from "../utils/validation";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import GoogleSignin from "../hooks/GoogleSignin";
import { profileImage } from "../utils/constants";
import { LuLoader } from "react-icons/lu";
import BackgroundImage from "./BackgroundImage";
function Login() {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [error, setError] = useState();
  const [loader, setLoader] = useState(false);
  const handleSignInOrSignUp = (name, email, password) => {
    setLoader(true);
    if (isSignInForm) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // ...
          if (user) {
            const userObj = {
              displayName: name,
              photoURL: profileImage,
            };
            updateProfile(auth.currentUser, userObj)
              .then((response) => {
                // Profile updated!
                // ...
                setLoader(false);
              })
              .catch((error) => {
                // An error occurred
                // ...
                setLoader(false);
              });
          }
        })
        .catch((error) => {
          //console.log(error);
          setError("Error occured while signing in");
          setLoader(false);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          if (user) {
            const userObj = {
              displayName: name,
              photoUrl: profileImage,
            };
            updateProfile(auth.currentUser, userObj)
              .then((response) => {
                // Profile updated!
                // ...
                setLoader(false);
              })
              .catch((error) => {
                // An error occurred
                // ...
                setLoader(false);
              });
          }
        })
        .catch((error) => {
          setError("Error occured while creating profile");
          setLoader(false);
          // ..
        });
    }
  };
  return (
    <div className="bg-black">
      <Header />
      <BackgroundImage />
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!isSignInForm && !values.name) {
            errors.name = "Required";
          } else if (!values.email) {
            errors.email = "Required";
          } else if (!validEmail(values.email)) {
            errors.email = "Invalid email address";
          } else if (!values.password) {
            errors.password = "Required";
          } else if (!validPassword(values.password)) {
            errors.password = "Password is not valid";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const { email, password, name } = values;
          //console.log(values);
          setSubmitting(false);
          handleSignInOrSignUp(name, email, password);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="z-40 w-[400px] absolute bg-black mx-auto right-0 left-0 bg-opacity-80 my-36 rounded-lg p-12">
            <h1 className="text-white py-4 text-2xl font-semibold">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && (
              <>
                <Field
                  className="bg-transparent border-[0.5px] h-12 p-4 w-full text-white rounded-md"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs py-1"
                />
              </>
            )}
            <Field
              className="bg-transparent border-[0.5px] h-12 p-4 w-full text-white rounded-md mt-3"
              type="email"
              name="email"
              placeholder="Email or mobile number"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs py-1"
            />
            <Field
              className="bg-transparent border-[0.5px] h-12 p-4 text-white rounded-md mt-3 w-full"
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs py-1"
            />

            <button
              className="flex p-4 my-6 h-12 justify-center items-center bg-red-700 w-full rounded-lg text-white"
              type="submit"
              disabled={isSubmitting}
            >
              {loader ? (
                <LuLoader className="animate-spin " />
              ) : isSignInForm ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
              {/* {!loader && isSignInForm ? "Sign In" : "Sign Up"}
              {loader && <LuLoader className="animate-spin " />} */}
            </button>
            {error && <span className="text-red-600 text-sm">{error}</span>}

            <p className="text-gray-400 text-sm">
              {isSignInForm ? "New User " : "Already have an account? "}
              <strong
                className="text-sm text-white cursor-pointer"
                onClick={() => {
                  setIsSignInForm(!isSignInForm);
                }}
              >
                {isSignInForm ? "Sign Up" : "Sign In"}
              </strong>{" "}
              here
            </p>

            <div className="flex justify-center mt-6"></div>
            <GoogleSignin />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
