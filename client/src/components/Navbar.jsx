import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = ({ loggedin }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 drop-shadow-2xl text-white transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="text-2xl font-bold">Quizzy</span>
          <button onClick={toggleSidebar} className="text-2xl">
            <AiOutlineClose />
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-2">
          <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
          <li><Link to="/create" onClick={toggleSidebar}>Create Quiz</Link></li>
          <li><Link to="/templates" onClick={toggleSidebar}>Select from Template</Link></li>
          <li><Link to="/join" onClick={toggleSidebar}>Join</Link></li>
          <li><Link to="#" onClick={toggleSidebar}>Help</Link></li>
          <li><Link to="#" onClick={toggleSidebar}>About us</Link></li>
          {loggedin ? (
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          ) : (
            <li><Link to="/login" onClick={toggleSidebar}>Login</Link></li>
          )}
        </ul>
      </div>

      {/* Desktop Navbar */}
      <nav className="hidden lg:flex bg-gray-800 text-white items-center drop-shadow-xl justify-between px-4 py-2">
        <Link to="/" className=" text-2xl font-bold">Quizzy</Link>
        <ul className="menu menu-horizontal text-xl px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create Quiz</Link></li>
          <li><Link to="/templates">Select from Template</Link></li>
          <li><Link to="/join">Join</Link></li>
          <li><Link to="#">Help</Link></li>
          <li><Link to="#">About us</Link></li>
        </ul>
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
                <IoPersonCircle className="text-4xl text-white" />
              </div>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu Button */}
      {!isSidebarOpen && (
        <div className="lg:hidden fixed top-0 right-0 p-4">
          <button onClick={toggleSidebar} className="text-2xl">
            <HiMenu />
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
