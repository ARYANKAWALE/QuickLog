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
    <div className="w-full bg-background text-on-surface flex flex-col flex-grow">
      {isLoggedIn ? (
        <div>
          {/* Left side */}
          <div className="flex-grow border border-separator items-center flex flex-row pt-7 pb-section-gap px-gutter-desktop max-w-[1310px] mx-auto w-full justify-between bg-surface-container-lowest rounded-xl my-10 shadow-sm">
            <div className="flex w-[320px] justify-around gap-5">
              <div className="flex">
                <img
                  src={gym1}
                  className="w-[100px] h-[100px] rounded-full"
                  alt="profile image"
                />
              </div>
              <div className="w-fit flex flex-col items-center justify-around">
                <p className="font-bold text-3xl">{user?.username}</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="px-3 py-2 rounded-lg text-[#026FEF] border border-primary bg-surface-container-lowest flex flex-row gap-2">
                <Share2 className="text-primary" />
                <button className="text-primary">Share stats</button>
              </div>
              <button className="px-5 py-2 rounded-lg bg-primary text-white font-bold cursor-pointer hover:opacity-90">
                Edit profile
              </button>
            </div>
          </div>
          <div>
            <div className="flex flex-row justify-evenly">
              <div className="flex flex-col gap-5">
                <ul className="text-secondary">
                  <li className="p-2 rounded-lg hover:bg-surface-container-low hover:text-on-surface">
                    <Link>Account details</Link>
                  </li>
                  <li className="p-2 rounded-lg hover:bg-surface-container-low hover:text-on-surface">
                    Preferences
                  </li>
                  <li className="p-2 rounded-lg hover:bg-surface-container-low hover:text-on-surface">
                    Privacy & safety
                  </li>
                  <li className="p-2 rounded-lg hover:bg-surface-container-low hover:text-on-surface">
                    Subscription
                  </li>
                </ul>
                <div className="bg-separator h-[1px] w-full"></div>
                <div className="rounded-lg px-4 justify-center hover:bg-red-500/10 py-2 text-red-500 cursor-pointer flex flex-row gap-2 items-center">
                  <LogOut />
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>

              {/* Right side */}
              <div className="flex flex-col gap-6 w-[50%]">
                <div className="bg-surface-container-low w-full rounded-2xl border border-separator">
                  <div className="flex flex-row justify-between px-10 mt-5">
                    <p className="font-medium text-xl text-on-surface">Account Details</p>
                    <p className="bg-primary py-1 px-2 rounded-full text-white">
                      Pro
                    </p>
                  </div>

                  <div className="p-6 rounded-xl w-full">
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

                  <div className="flex flex-row items-center justify-between gap-40 p-5 bg-primary-muted border border-primary/20 m-10 rounded-xl">
                    <div className="flex flex-row items-center gap-2">
                      <div>
                        <Star className="p-1 h-14 w-auto rounded-full bg-primary text-white" />
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
                      <p className="text-primary font-semibold">Manage Plans</p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low w-full rounded-2xl border border-separator">
                  <div className="flex flex-row justify-between px-10 mt-5">
                    <p className="font-medium text-xl text-on-surface">Preferences</p>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-5 flex-col">
                      <div className="flex flex-row items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-separator/35">
                        <div className="flex flex-row items-center gap-3">
                          <Moon className="text-primary" />
                          <div>
                            <p className="font-medium text-lg text-on-surface">{theme === "dark" ? "Dark" : "Light"} Mode</p>
                            <p className="text-sm text-secondary">
                              Switch between light theme & dark themes
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handleToggle}
                          className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
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
                      <div className="flex flex-row items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-separator/35">
                        <div className="flex flex-row items-center gap-3">
                          <BriefcaseMedical className="text-primary" />
                          <div>
                            <p className="font-medium text-lg text-on-surface">
                              Health App Integration
                            </p>
                            <p className="text-sm text-secondary">
                              Sync your metrics with Apple Health or Google Fit
                            </p>
                          </div>
                        </div>
                        <button className="py-1 px-2 rounded-full bg-surface-dim text-on-secondary-fixed-variant text-sm font-semibold">
                          Soon
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-low w-full rounded-2xl border border-separator mb-10">
                  <div className="flex flex-row justify-between px-10 mt-5">
                    <p className="font-medium text-xl text-on-surface">Security & Sessions</p>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-row items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-separator/35">
                      <div className="flex flex-row items-center gap-3">
                        <Laptop className="text-primary h-12 w-auto p-2 rounded-full bg-primary-muted" />
                        <div>
                          <p className="font-medium text-lg text-on-surface">Your Device</p>
                          <p className="text-sm text-primary font-semibold">
                            Current Session
                          </p>
                        </div>
                      </div>
                      <EllipsisVertical className="text-secondary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Please login to view settings</p>
        </div>
      )}
    </div>
  );
}

export default Settings;
