import React from "react";
import { Moon,BriefcaseMedical} from 'lucide-react'
import { useTheme } from "../ThemeContext";

function Preferences() {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };
  const toggle = theme === "dark";

  return (
    <div>
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
                  <p className="font-medium text-base sm:text-lg text-on-surface">
                    {theme === "dark" ? "Dark" : "Light"} Mode
                  </p>
                  <p className="text-xs sm:text-sm text-secondary">
                    Switch between light theme &amp; dark themes
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
    </div>
  );
}
import { Form } from "react-router-dom";

export default Preferences;
