import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaStar, FaCommentDots, FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState({ name: "", profilePic: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching user data from the backend
    const fetchUserData = async () => {
      const data = await fetch("/api/user").then((res) => res.json());
      setUser(data);
    };

    fetchUserData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="sm:hidden fixed top-4 left-4 z-50 text-[#367896] bg-[#E6FDFF] p-3 rounded-lg shadow-md"
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <nav
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 fixed sm:relative top-0 left-0 w-64 bg-[#E6FDFF] h-screen flex flex-col shadow-lg transition-transform duration-300 z-40 overflow-y-auto`}
      >
        {/* Logo */}
        <div className="text-xl font-bold text-[#367896] italic ml-6 mt-6 mb-8">
          Shared Vibes
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-start mb-6 ml-6">
          <div className="w-20 h-20 bg-[#8AB6B9] rounded-full flex items-center justify-center">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-full h-full rounded-full"
              />
            ) : (
              <div className="text-4xl text-[#7D5AA3]">👤</div>
            )}
          </div>
          <div className="mt-4 text-lg font-medium text-black">
            {user.name || "Name Of User"}
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="w-full mt-2">
          <li>
            <NavLink
              to="/topmatches"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-4 ${
                  isActive ? "bg-[#A9DCE0] rounded-sm text-[#265669]" : "text-black"
                } hover:bg-[#FDF3DD] hover:rounded-lg cursor-pointer`
              }
            >
              <FaStar />
              <span>Top Matches</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-4 ${
                  isActive ? "bg-[#A9DCE0] rounded-sm text-[#265669]" : "text-black"
                } hover:bg-[#FDF3DD] hover:rounded-lg cursor-pointer`
              }
            >
              <FaCommentDots />
              <span>Chat</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-4 ${
                  isActive ? "bg-[#A9DCE0] rounded-sm text-[#265669]" : "text-black"
                } hover:bg-[#FDF3DD] hover:rounded-lg cursor-pointer`
              }
            >
              <FaUser />
              <span>Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-4 ${
                  isActive ? "bg-[#A9DCE0] rounded-sm text-[#265669]" : "text-black"
                } hover:bg-[#FDF3DD] hover:rounded-lg cursor-pointer`
              }
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Backdrop for Small Screens */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-25 sm:hidden"
        />
      )}
    </div>
  );
};

export default Navbar;
