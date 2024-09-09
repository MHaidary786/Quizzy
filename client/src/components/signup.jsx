import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    dob: "", // Added dob
  });

  const roles = ["admin", "teacher", "student"];

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

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation checks
    if (user.email !== user.repeatEmail) {
      notify("Emails do not match!", "error");
      return;
    }

    if (user.password !== user.repeatPassword) {
      notify("Passwords do not match!", "error");
      return;
    }

    if (!user.role) {
      notify("Please select a role!", "error");
      return;
    }

    try {
      console.log(user)
      // Sending user data to the server
      await axios.post(
        "http://quizzy-5dpo.onrender.com:5000/user/add", 
        {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          role: user.role,
          dob: user.dob
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      notify("User registered successfully! Check your email for OTP.", "success");

      // Navigate to OTP verification page after success
      setTimeout(() => {
        navigate("/verifyotp", { state: { email: user.email } }); // Passing email to the next page
      }, 3000);
    } catch (error) {
      notify("Error registering user!", "error");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setUser({ ...user, role: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="flex flex-col container max-w-md bg-slate-500 gap-3 text-white p-14 rounded-2xl">
        <p className="mt-2 text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl">
          Sign Up
        </p>
        <p className="text-center text-white">Create your account</p>
        <form className="flex flex-col gap-3" onSubmit={handleSignUp}>
          {/* Form fields */}
          <label className="input input-bordered flex items-center gap-2">
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
            <input
              name="repeatEmail"
              type="email"
              placeholder="Repeat Email"
              onChange={handleChange}
              value={user.repeatEmail}
              className="grow"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
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
            <input
              name="repeatPassword"
              type="password"
              placeholder="Repeat Password"
              onChange={handleChange}
              value={user.repeatPassword}
              className="grow"
            />
          </label>
          {/* Role selection */}
          <select
            name="role"
            value={user.role}
            onChange={handleRoleChange}
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Select your Role
            </option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {/* Date of Birth */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              name="dob"
              type="date"
              onChange={handleChange}
              value={user.dob}
              className="grow"
              placeholder="Date of Birth"
            />
          </label>
          <p className="text-sm">
            Already have an account?{" "}
            <Link className="underline text-cyan-400" to={"/login"}>
              Login
            </Link>
          </p>
          <button className="btn" type="submit">
            Sign up
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUpForm;
