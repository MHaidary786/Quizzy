import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// import "beercss";
// import "material-dynamic-colors";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    repeatEmail: "",
    password: "",
    repeatPassword: "",
    role: "",
    dob: "",
  });

  const roles = ["admin", "teacher", "student"];

  const [message, setMessage] = useState("Hello World!");
  const [showMessage, setShowMessage] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (user.email !== user.repeatEmail) {
      console.log("Emails do not match!");
      return;
    }

    if (user.password !== user.repeatPassword) {
      console.log("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:4000/user/add", {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        role: user.role,
        dob: user.dob,
      });
      console.log("User added successfully");
      setMessage("User registered successfully");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate("/verifyotp");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center  justify-center min-h-screen bg-gray-800">
      <div className="flex flex-col container max-w-md bg-slate-500 gap-3 text-white p-14 rounded-2xl">
        <p class="mt-2 text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl">
          Sign Up
        </p>
        <p className="text-center text-white-600">Create your account</p>
        <form className="flex flex-col gap-3" onSubmit={handleSignUp}>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              name="name"
              type="text"
              onChange={handleChange}
              value={user.name}
              className="grow"
              placeholder="Name"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              name="lastname"
              type="text"
              onChange={handleChange}
              value={user.lastname}
              className="grow"
              placeholder="Last Name"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              value={user.email}
              className="grow"
              placeholder="Email"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              name="repeatEmail"
              type="email"
              placeholder="Repeat email"
              onChange={handleChange}
              value={user.repeatEmail}
              className="grow"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              value={user.password}
              className="grow"
              placeholder="Password"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              name="repeatPassword"
              type="password"
              placeholder="Repeat password"
              onChange={handleChange}
              value={user.repeatPassword}
              className="grow"
            />
          </label>
          <select className="select select-bordered w-full">
            <option disabled selected>
              Select your Role
            </option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <p className="text-s">
            Already have an account? {" "}
            <Link className="underline text-cyan-400" to={"/login"}>
              Login
            </Link>
          </p>
          <button type="submit">Sign up</button>
        </form>
      </div>

      {showMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 border border-red-200 rounded z-50">
          {message}
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
