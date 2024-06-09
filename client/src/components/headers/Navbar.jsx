import React from "react";
import { useSelector } from "react-redux";
import Logout from "../auth/Logout";

const Navbar = () => {
  const authUser = useSelector(state => state.auth?.authUser?._id)
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/actors">Actors</a>
            </li>
            <li>
              <a href="/movies">Movies</a>
            </li>
            <li>
              <a href="/producers">Producers</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">IMDb</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/actors">Actors</a>
          </li>
          <li>
            <a href="/movies">Movies</a>
          </li>
          <li>
            <a href="/producers">Producers</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-5 mr-4">
        <a href="/watchlist" className="btn  btn-outline text-[#E2B616]">
          Watchlist
        </a>
        {!authUser ?
        <a href="/signup" className="btn  btn-outline text-[#E2B616] ">
          Signup
        </a> : 
        <Logout />}
      </div>
    </div>
  );
};

export default Navbar;
