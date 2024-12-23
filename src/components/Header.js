import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
      const { isAuthenticated } = useAuth();
    const navigate = useNavigate()

    const handleNavigate = (path) => {
        navigate(path)
    }
  return (
    <div className="navbar bg-slate-700 text-white px-10">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Logo</a>
      </div>
      <div className="flex-none gap-2">
        {isAuthenticated ? (
          // If logged in, show profile picture and dropdown
          <div className="flex items-center gap-4">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-pink-600 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li onClick={() => handleNavigate("/setting")}>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // If not logged in, show Login and Signup buttons
          <div className="flex items-center gap-4">
            <button className="btn btn-primary" onClick={() =>handleNavigate('/login')}>Login</button>
            <button className="btn btn-secondary"  onClick={() => handleNavigate('/signUp')}>Signup</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
