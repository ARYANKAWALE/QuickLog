import { useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import gym1 from "../assets/gym1.jpg";
import { useTheme } from "./ThemeContext.jsx";
import {
  Share2,
  LogOut,
} from "lucide-react";
import AccountDetails from "./Cards/AccountDetails.jsx";
import Preferences from "./Cards/Preferences.jsx";
import SafetySecurity from "./Cards/SafetySecurity.jsx";
import Subscription from "./Cards/Subscription.jsx";

const BACKEND_URL = "http://localhost:3000/api/v1/settings";

const TABS = ["Account details", "Preferences", "Privacy & safety", "Subscription"];

function Settings() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Account details");

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
                  {TABS.map((tab) => (
                    <li
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`p-2 rounded-lg whitespace-nowrap cursor-pointer transition-colors duration-150 font-medium text-sm ${
                        activeTab === tab
                          ? "bg-surface-container text-on-surface font-semibold"
                          : "hover:bg-surface-container-low hover:text-on-surface"
                      }`}
                    >
                      {tab}
                    </li>
                  ))}
                </ul>
                <div className="hidden lg:block bg-separator h-[1px] w-full"></div>
                <div className="rounded-lg px-4 justify-center hover:bg-red-500/10 py-2 text-red-500 cursor-pointer flex flex-row gap-2 items-center w-full lg:w-auto">
                  <LogOut size={18} />
                  <button onClick={handleLogout} className="font-semibold text-sm">
                    Logout
                  </button>
                </div>
              </div>

              {/* Right side content panels */}
              <div className="flex flex-col gap-6 w-full lg:w-[70%] mb-10">

                {/* Account Details Tab */}
                {activeTab === "Account details" && <AccountDetails />}

                {/* Preferences Tab */}
                {activeTab === "Preferences" && <Preferences/>}

                {/* Privacy & Safety Tab */}
                {activeTab === "Privacy & safety" && <SafetySecurity/>}

                {/* Subscription Tab */}
                {activeTab === "Subscription" && <Subscription/>}

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
