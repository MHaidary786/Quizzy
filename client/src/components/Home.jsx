import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "beercss";
// import "material-dynamic-colors";
import { IoPersonCircle } from "react-icons/io5";
import photo from "./assests/photo2.png";
import photo1 from "./assests/photo1.png";

export default function Home() {
  const [loggedin, setLoggenin] = useState(true);
  const navigate = useNavigate();
  const [names, setNames] = useState(["Music", "Animals", "Art", "Science"]);

  return (
    <div className="container w-full flex justify-center flex-col mx-auto ">
      <Navbar loggedin={loggedin} />

      <div className="container flex flex-col justify-center my-10">
        <div className="flex flex-row gap-10 justify-center">
          <div className="card lg:card-side bg-base-100 max-w-xl shadow-xl text-white">
            <img src={photo} alt="Album" />
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
        </div>
        <p className="text-center text-xl m-12">
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


        <div className="grid grid-cols-2 gap-6">
        {names.map((name, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 text-center flex flex-col justify-center items-center transform transition duration-300 hover:scale-105 w-56 cursor-pointer"
          >
            <div className="flex justify-center items-center bg-gray-100 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 shadow-xl text-white rounded-full overflow-hidden">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt={name}
                className="object-cover h-full w-full"
              />
            </div>
            <p className="mt-4 text-lg md:text-xl font-bold text-center">
              {name}
            </p>
          </div>
        ))}
      </div>




        <div className={loggedin ? "hidden" : "flex flex-row justify-center"}>
          <Link to={"/login"}>
            <button className="btn btn-wide btn-outline btn-accent text-xl">
              Login
            </button>
          </Link>
          <Link to={"/signup"}>
            {" "}
            <button className="btn btn-wide btn-outline btn-accent text-xl">
              Sign up
            </button>
          </Link>
        </div>
      </div>

      {/* <div>
      <Link to={"/signup"}>
        <button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none w-60 m-3">
          Sign Up
        </button>
      </Link>
      <Link to={"/login"}>
        <button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none w-60 m-3">
          Log in
        </button>
      </Link>
      <Link to={"/create"}>
        <button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none w-60 m-3">
          Create
        </button>
      </Link>
      <Link to={"/quizzes"}>
        <button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none w-60 m-3">
          Manage Quizzes
        </button>
      </Link>
      <Link to={"/join"}>
        <button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none w-60 m-3">
          Join
        </button>
      </Link>
      <Link to={"/joinQuizPage"}>
        <button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none w-60 m-3">
        joinQuizPage
        </button>
      </Link>

      <Link to={"/QuizsessionPage"}>
        <button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none w-60 m-3">
        Quizsessionpage
        </button>
      </Link>
      </div> */}
    </div>
  );
}

function Navbar({loggedin}) {
  const navigate = useNavigate();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost text-xl">Quiz App</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/create">Create Quiz</a>
          </li>
          <li>
            <a href="/templates">Select from Template</a>
          </li>
          <li>
            <a href="/join">Join</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
          <li>
            <a href="#">About us</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="flex-none">
          {loggedin ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="flex justify-center rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white"
              >
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <Link to={"/login"}>
                  <div className="w-10 rounded-full">
                    <IoPersonCircle className="text-4xl" />
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
