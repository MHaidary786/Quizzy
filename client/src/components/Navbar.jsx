import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";

const Navbar = ({ loggedin }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/" className="btn text-black btn-ghost text-2xl">Quizzy</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu text-black menu-horizontal text-xl px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create Quiz</Link></li>
          <li><Link to="/templates">Select from Template</Link></li>
          <li><Link to="/join">Join</Link></li>
          <li><Link to="#">Help</Link></li>
          <li><Link to="#">About us</Link></li>
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
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  className="w-10 rounded-full"
                />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white"
              >
                <li><a>Profile</a></li>
                <li><a>Settings</a></li>
                <li><a onClick={logout}>Logout</a></li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <div className="btn btn-ghost btn-circle avatar">
                <IoPersonCircle className="text-4xl text-black" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
