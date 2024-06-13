import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaTelegramPlane } from "react-icons/fa";
import { Telegram, telegramRequestGroup } from "../constant";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#121212] p-4 mb-[1px] overflow-hidden">
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-400 ml-2 md:ml-6  hover:text-white focus:outline-none"
        >
          <FaBars />
        </button>
      </div>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="hidden lg:flex flex-grow justify-center">
          <div className="flex space-x-4">
            <NavLink
              to={telegramRequestGroup}
              className="text-gray-400 hover:bg-[#282828] flex items-center hover:text-white py-2 rounded-md text-sm font-medium"
              activeClassName="bg-gray-700 text-white"
              target="_blank"
            >
              <FaTelegramPlane className="mr-2" /> Movie Request Group
            </NavLink>
            <NavLink
              to={Telegram}
              className="text-gray-400 flex items-center hover:bg-[#282828] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              activeClassName="bg-gray-700 text-white"
              target="_blank"
            >
              <FaTelegramPlane className="mr-2" /> Telegram Channel
            </NavLink>
            <NavLink
              to="/how-to-download"
              className="text-gray-400 hover:bg-[#282828] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              activeClassName="bg-gray-700 text-white"
            >
              How To Download?
            </NavLink>
            <NavLink
              to="/vpn"
              className="text-gray-400 hover:bg-[#282828] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              activeClassName="bg-gray-700 text-white"
            >
              VPN!
            </NavLink>
            <NavLink
              to="/ "
              className="text-gray-400 hover:bg-[#282828] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              activeClassName="bg-gray-700 text-white"
            >
              Contact Us!
            </NavLink>
            <NavLink
              to="/dmca-policy"
              className="text-gray-400 hover:bg-[#282828] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              activeClassName="bg-gray-700 text-white"
            >
              DMCA
            </NavLink>
            <NavLink
              to="/ "
              className="text-gray-400 hover:bg-[#282828] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              activeClassName="bg-gray-700 text-white"
            >
              Disclaimer
            </NavLink>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-[#121212] transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50 lg:hidden`}
      >
        <div className="bg-[#121212] w-64 h-full p-4 space-y-4 relative overflow-hidden">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
          >
            <FaTimes />
          </button>
          <NavLink
            to={telegramRequestGroup}
            className="block text-gray-400 hover:bg-[#282828] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            activeClassName="bg-gray-700 text-white"
            target="_blank"
            onClick={toggleMenu}
          >
            Movie Request Group
          </NavLink>
          <NavLink
            to={Telegram}
            className="block text-gray-400 hover:bg-[#282828] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            activeClassName="bg-gray-700 text-white"
            target="_blank"
            onClick={toggleMenu}
          >
            Telegram Channel
          </NavLink>
          <NavLink
            to="/how-to-download"
            className="block text-gray-400 hover:bg-[#282828] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            activeClassName="bg-gray-700 text-white"
            onClick={toggleMenu}
          >
            How To Download?
          </NavLink>
          <NavLink
            to="/"
            className="block text-gray-400 hover:bg-[#282828] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            activeClassName="bg-gray-700 text-white"
            onClick={toggleMenu}
          >
            VPN!
          </NavLink>
          <NavLink
            to="/"
            className="block text-gray-400 hover:bg-[#282828] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            activeClassName="bg-gray-700 text-white"
            onClick={toggleMenu}
          >
            Contact Us!
          </NavLink>
          <NavLink
            to="/dmca-policy"
            className="block text-gray-400 hover:bg-[#282828] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            activeClassName="bg-gray-700 text-white"
            onClick={toggleMenu}
          >
            DMCA
          </NavLink>
          <NavLink
            to="/"
            className="block text-gray-400 hover:bg-[#282828] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            activeClassName="bg-gray-700 text-white"
            onClick={toggleMenu}
          >
            Disclaimer
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
