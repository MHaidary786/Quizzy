import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OTPVerify() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/user/verifyotp",
        {
          email,
          otp,
        }
      );
      console.log(response.data);
      setMessage("Verification successful.");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setMessage("User not found.");
      } else if (error.response && error.response.status === 400) {
        setMessage("Invalid or expired OTP.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="flex flex-col container max-w-xl bg-slate-500 gap-3 text-white p-10 rounded-2xl">
        <p class="mt-2 text-3xl text-center my-10 font-bold tracking-tight text-gray-900 sm:text-4xl">
          Verify OTP Code
        </p>
        <form
          action="submit"
          className="flex flex-col gap-3"
          onSubmit={handleVerify}
        >
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="h-4 w-4 opacity-70 "
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              className="grow"
              name="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="h-4 w-4 opacity-70 "
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="grow"
              name="otp"
              type="text"
              placeholder="OTP"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              required
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>

      {showMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 border border-red-200 rounded z-50">
          {message}
        </div>
      )}
    </div>
  );
}
