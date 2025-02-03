import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validEmail, validPassword } from "../utils/validation";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import GoogleSignin from "../hooks/GoogleSignin";

function Login() {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const handleSignInOrSignUp = (email, password) => {
    if (isSignInForm) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="flex absolute h-screen w-screen bg-black">
        <img
          className="h-screen w-screen object-fill"
          alt="background logo"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_large.jpg"
        ></img>
      </div>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (validEmail(values.email)) {
            errors.email = "Invalid email address";
          } else if (!values.password) {
            errors.password = "Required";
          } else if (!validPassword(values.password)) {
            errors.password = "Password is not valid";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const { email, password } = values;
          console.log(values);
          setSubmitting(false);
          handleSignInOrSignUp(email, password);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="z-40 w-[400px] absolute bg-black mx-auto right-0 left-0 bg-opacity-80 my-36 rounded-lg p-12">
            <h1 className="text-white py-4 text-2xl font-semibold">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            <Field
              className="bg-transparent border-[0.5px] h-12 p-4 w-full text-white rounded-md"
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
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
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
