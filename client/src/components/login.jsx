import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const notify = (text, type) => {
    toast(text, {
      type,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://quizzy-5dpo.onrender.com:5000/user/login", {
        email: user.email,
        password: user.password,
      });
      const token = response.data.token;
      const decoded = jwtDecode(token);
      console.log(`The user "${decoded.user.userEmail}" logged in successfully`);
      localStorage.setItem("token", token);

      notify("Login successful", "success");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        notify("Invalid Credentials!", "error");
      } else if (error.response) {
        notify(`Error: ${error.response.data.message || "An error occurred. Please try again."}`, "error");
      } else {
        notify("An error occurred. Please try again.", "error");
      }
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="flex flex-col container max-w-xl bg-slate-500 gap-3 text-white p-10 rounded-2xl">
        <p className="mt-2 text-3xl text-center my-10 font-bold tracking-tight text-gray-900 sm:text-4xl">
          Login
        </p>
        <form action="submit" className="flex flex-col gap-3" onSubmit={handleLogin}>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4 opacity-70" fill="white">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              className="grow"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={user.email}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4 opacity-70" fill="white">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="grow"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={user.password}
            />
          </label>
          <div className="space-y-2 flex">
            <input id="RememberPassword" type="checkbox" className="m-3 px-4 py-2 border rounded-md " />
            <label className="text-sm text-gray-700">Remember your password</label>
          </div>
          <p className="text-s">
            Don't have an account, no problem, make one in just a few seconds.{" "}
            <Link className="underline text-cyan-400" to="/signup">
              Sign up
            </Link>
          </p>
          <button className="btn" type="submit">Login</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
