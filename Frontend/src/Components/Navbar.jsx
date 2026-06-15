import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dumbbell,
  House,
  Apple,
  TrendingUp,
  Settings,
  Zap,
  Menu,
  X,
} from "lucide-react";

function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { to: "/home", label: "Home", icon: <House size={20} /> },
    { to: "/workout", label: "Workout", icon: <Dumbbell size={20} /> },
    { to: "/nutrition", label: "Nutrition", icon: <Apple size={20} /> },
    { to: "/progress", label: "Progress", icon: <TrendingUp size={20} /> },
    { to: "/setting", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="border-b border-gray-200 bg-[#FFFFFF] sticky top-0 z-50">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between font-medium relative">
        
        {/* Brand Logo */}
        <Link to="/home" className="flex flex-row items-center gap-2.5 shrink-0 group">
          <Zap
            size={36}
            className="text-[#FFFFFF] bg-[#2B7FFF] p-1.5 rounded-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">QuickLog</h1>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex flex-row gap-8 items-center text-[#71717B]">
            {navLinks.map((link) => (
              <li key={link.to} className="list-none">
                <Link
                  to={link.to}
                  className="relative flex flex-row items-center gap-2 text-base font-semibold hover:text-[#000000] pb-1.5 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/login" 
            className="px-5 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-semibold"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="rounded-xl bg-[#2B7FFF] px-5 py-2.5 text-white font-bold hover:bg-blue-600 active:scale-[0.98] transition-all duration-200 shadow-md shadow-blue-500/10"
          >
            Get Started
          </Link>
        </div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <div className="flex md:hidden items-center">
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl border border-gray-100 hover:bg-gray-50 text-gray-700 hover:text-gray-900 focus:outline-none transition-colors duration-200 cursor-pointer"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer (Absolute positioned) */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl py-4 flex flex-col md:hidden animate-in fade-in slide-in-from-top-4 duration-200 z-50">
            <nav className="flex flex-col mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-6 py-3.5 text-gray-600 hover:text-black font-semibold text-lg hover:bg-gray-50 border-l-4 border-transparent hover:border-[#2B7FFF] transition-all"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
            
            <div className="border-t border-gray-100 pt-4 px-6 flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 text-gray-700 font-bold transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 bg-[#2B7FFF] text-white rounded-2xl font-bold hover:bg-blue-600 shadow-md shadow-blue-500/10 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}

      </header>
    </div>
  );
}

export default Hero;
