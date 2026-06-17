import { useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import gym1 from "../assets/gym1.jpg";
import { useTheme } from "./ThemeContext.jsx";
import {
  ChevronRight,
  Moon,
  Star,
  BriefcaseMedical,
  Laptop,
  EllipsisVertical,
  Share2,
  LogOut,
} from "lucide-react";

const BACKEND_URL = "http://localhost:3000/api/v1/settings";

function Settings() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const { theme, toggleTheme } = useTheme();
  const toggle = theme === "dark";

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <div className="w-full bg-background text-on-surface flex flex-col flex-grow px-4 sm:px-6 lg:px-8">
      {isLoggedIn ? (
        <div className="w-full max-w-[1310px] mx-auto">
          {/* Profile header card */}
          <div className="flex-grow border border-separator flex flex-col md:flex-row items-center pt-6 pb-6 px-6 md:px-gutter-desktop w-full justify-between bg-surface-container-lowest rounded-xl my-6 md:my-10 shadow-sm gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <img
                src={gym1}
                className="w-20 h-20 sm:w-[100px] sm:h-[100px] rounded-full object-cover"
                alt="profile image"
              />
              <div className="flex flex-col">
                <p className="font-bold text-2xl sm:text-3xl text-on-surface">{user?.username}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="px-3 py-2 rounded-lg text-[#026FEF] border border-primary bg-surface-container-lowest flex flex-row gap-2 justify-center items-center">
                <Share2 className="text-primary w-5 h-5" />
                <button className="text-primary font-semibold text-sm">Share stats</button>
              </div>
              <button className="px-5 py-2.5 rounded-lg bg-primary text-white font-bold cursor-pointer hover:opacity-90 text-sm">
                Edit profile
              </button>
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-col lg:flex-row gap-8 justify-between my-6">
              {/* Left sidebar / mobile tabs container */}
              <div className="flex flex-col gap-5 w-full lg:w-[25%] shrink-0">
                <ul className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 text-secondary w-full border-b border-separator lg:border-b-0 scrollbar-none">
                  <li className="p-2 rounded-lg hover:bg-surface-container-low hover:text-on-surface whitespace-nowrap cursor-pointer">
                    <Link>Account details</Link>
                  </li>
                  <li className="p-2 rounded-lg hover:bg-surface-container-low hover:text-on-surface whitespace-nowrap cursor-pointer">
                    Preferences
                  </li>
                  <li className="p-2 rounded-lg hover:bg-surface-container-low hover:text-on-surface whitespace-nowrap cursor-pointer">
                    Privacy & safety
                  </li>
                  <li className="p-2 rounded-lg hover:bg-surface-container-low hover:text-on-surface whitespace-nowrap cursor-pointer">
                    Subscription
                  </li>
                </ul>
                <div className="hidden lg:block bg-separator h-[1px] w-full"></div>
                <div className="rounded-lg px-4 justify-center hover:bg-red-500/10 py-2 text-red-500 cursor-pointer flex flex-row gap-2 items-center w-full lg:w-auto">
                  <LogOut />
                  <button onClick={handleLogout} className="font-semibold text-sm">
                    Logout
                  </button>
                </div>
              </div>

              {/* Right side form panels */}
              <div className="flex flex-col gap-6 w-full lg:w-[70%]">
                {/* Account Details Box */}
                <div className="bg-surface-container-low w-full rounded-2xl border border-separator">
                  <div className="flex flex-row justify-between px-6 md:px-10 mt-5">
                    <p className="font-medium text-xl text-on-surface">Account Details</p>
                    <p className="bg-primary py-1 px-2.5 rounded-full text-white text-xs font-bold self-center">
                      Pro
                    </p>
                  </div>

                  <div className="p-4 md:p-6 rounded-xl w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="fullName"
                          className="text-sm font-medium text-secondary"
                        >
                          Full Name
                        </label>
                        <div className="relative flex items-center">
                          <input
                            id="fullName"
                            type="text"
                            className="w-full bg-surface-container-lowest text-on-surface py-3.5 pl-4 pr-10 rounded-2xl shadow-sm border border-separator cursor-pointer outline-none font-medium text-base"
                            value={user?.username || "Username not exist"}
                            readOnly
                          />
                          <span className="absolute right-4 text-secondary pointer-events-none text-xs">
                            <ChevronRight />
                          </span>
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-secondary"
                        >
                          Email
                        </label>
                        <div className="relative flex items-center">
                          <input
                            id="email"
                            type="email"
                            className="w-full bg-surface-container-lowest text-on-surface py-3.5 pl-4 pr-10 rounded-2xl shadow-sm border border-separator cursor-pointer outline-none font-medium text-base"
                            value={user?.email || "Email not exist"}
                            readOnly
                          />
                          <span className="absolute right-4 text-secondary pointer-events-none text-xs">
                            <ChevronRight />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-5 bg-primary-muted border border-primary/20 m-4 md:m-10 rounded-xl text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div>
                        <Star className="p-3 h-12 w-12 rounded-full bg-primary text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-primary">
                          Elite Annual Plan
                        </p>
                        <p className="text-sm text-primary">
                          renew on 1 june 2026
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-primary font-bold cursor-pointer hover:underline text-sm">Manage Plans</p>
                    </div>
                  </div>
                </div>

                {/* Preferences Box */}
                <div className="bg-surface-container-low w-full rounded-2xl border border-separator">
                  <div className="flex flex-row justify-between px-6 md:px-10 mt-5">
                    <p className="font-medium text-xl text-on-surface">Preferences</p>
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex gap-4 flex-col">
                      <div className="flex flex-row items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-separator/35 gap-4">
                        <div className="flex flex-row items-center gap-3">
                          <Moon className="text-primary shrink-0" />
                          <div>
                            <p className="font-medium text-base sm:text-lg text-on-surface">{theme === "dark" ? "Dark" : "Light"} Mode</p>
                            <p className="text-xs sm:text-sm text-secondary">
                              Switch between light theme & dark themes
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handleToggle}
                          className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 shrink-0 ${
                            toggle ? "bg-primary" : "bg-surface-dim"
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                              toggle ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex flex-row items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-separator/35 gap-4">
                        <div className="flex flex-row items-center gap-3">
                          <BriefcaseMedical className="text-primary shrink-0" />
                          <div>
                            <p className="font-medium text-base sm:text-lg text-on-surface">
                              Health App Integration
                            </p>
                            <p className="text-xs sm:text-sm text-secondary">
                              Sync your metrics with Apple Health or Google Fit
                            </p>
                          </div>
                        </div>
                        <button className="py-1 px-3 rounded-full bg-surface-dim text-on-secondary-fixed-variant text-xs font-semibold shrink-0">
                          Soon
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Box */}
                <div className="bg-surface-container-low w-full rounded-2xl border border-separator mb-10">
                  <div className="flex flex-row justify-between px-6 md:px-10 mt-5">
                    <p className="font-medium text-xl text-on-surface">Security & Sessions</p>
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex flex-row items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-separator/35">
                      <div className="flex flex-row items-center gap-3">
                        <Laptop className="text-primary h-12 w-auto p-2 rounded-full bg-primary-muted shrink-0" />
                        <div>
                          <p className="font-medium text-base sm:text-lg text-on-surface">Your Device</p>
                          <p className="text-xs sm:text-sm text-primary font-semibold">
                            Current Session
                          </p>
                        </div>
                      </div>
                      <EllipsisVertical className="text-secondary shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-secondary">Please login to view settings</p>
        </div>
      )}
    </div>
  );
}

export default Settings;
