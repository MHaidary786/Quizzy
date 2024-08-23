import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import {jwtDecode} from "jwt-decode";
import Navbar from "./Navbar";

const Home = () => {
  const [loggedin, setLoggedin] = useState(true);
  const navigate = useNavigate();
  const [names, setNames] = useState(["Music", "Animals", "Art", "Science"]);

  // Function to check if user is logged in
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds
        setLoggedin(decoded.exp > currentTime); // Token valid
      } catch (error) {
        console.error("Invalid token", error);
        setLoggedin(false); // Invalid token
      }
    } else {
      setLoggedin(false); // No token found
    }
  };

  // Check login status when the component mounts
  useEffect(() => {
    checkLoginStatus();
    const interval = setInterval(checkLoginStatus, 60000); // Check every 60 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar loggedin={loggedin} />

      <main className="flex-grow container mx-auto my-10 px-4">
        <section className="flex flex-col lg:flex-row gap-10 justify-center">
          <div className="card lg:card-side bg-base-100 max-w-xl shadow-xl text-white">
            <img  alt="Album" />
          </div>
          <div className="card lg:card-side bg-base-100 max-w-3xl shadow-xl text-white">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                alt="Album"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">New album is released!</h2>
              <p>Click the button to listen on Spotiwhy app.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Listen</button>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center my-12">
          <p className="text-xl mx-auto max-w-4xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with
            the release of Letraset sheets containing Lorem Ipsum passages, and
            more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </p>
        </section>


        <section className={loggedin ? "hidden" : `flex justify-center `}>
          <Link to="/login">
            <button className="btn btn-wide btn-outline btn-accent text-xl mx-2">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-wide btn-outline btn-accent text-xl mx-2">
              Sign up
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Home;
