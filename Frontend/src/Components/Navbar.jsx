import {
  Dumbbell,
  House,
  Apple,
  TrendingUp,
  Settings,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="border-b border-gray-200 bg-[#FBF8FF]">
      <header className="bg-[#FFFFFF] text-black p-4 flex flex-row justify-around font-medium items-center">
        <div className="flex flex-row items-center gap-2">
          <Zap
            size={40}
            className="text-[#FFFFFF] bg-[#2B7FFF] p-1 rounded-lg"
          />
          <h1 className="text-2xl font-bold">QuickLog</h1>
        </div>
        <div className="flex flex-row justify-between items-center gap-10">
          <ul className="flex flex-row gap-10 items-center text-[#71717B]">
            <li className="list-none">
              <Link
                to="/home"
                className="relative flex flex-row items-center gap-2 text-xl font-medium hover:text-[#000000] pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-300 after:ease-out hover:after:origin-bottom-left hover:after:scale-x-100"
              >
                <House size={20} />
                <span>Home</span>
              </Link>
            </li>
            <li className="flex flex-row gap-1">
              <Link
                to="/workout"
                className="relative flex flex-row items-center gap-2 text-xl font-medium hover:text-[#000000] pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-300 after:ease-out hover:after:origin-bottom-left hover:after:scale-x-100"
              >
                <Dumbbell size={20} />
                <span>Workout</span>
              </Link>
            </li>
            <li className="flex flex-row gap-1">
              <Link
                to="/nutrition"
                className="relative flex flex-row items-center gap-2 text-xl font-medium hover:text-[#000000] pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-300 after:ease-out hover:after:origin-bottom-left hover:after:scale-x-100"
              >
                <Apple size={20} />
              <span>Nutrition</span>
              </Link>
            </li>
            <li className="flex flex-row gap-1">
              <Link
                to="/progress"
                className="relative flex flex-row items-center gap-2 text-xl font-medium hover:text-[#000000] pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-300 after:ease-out hover:after:origin-bottom-left hover:after:scale-x-100"
              >
                <TrendingUp size={20} />
              <span>Progress</span>
              </Link>
            </li>
            <li className="flex flex-row gap-1">
              <Link
                to="/setting"
                className="relative flex flex-row items-center gap-2 text-xl font-medium hover:text-[#000000] pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-300 after:ease-out hover:after:origin-bottom-left hover:after:scale-x-100"
              ><Settings size={20} />
              Progress</Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-between gap-3 px-2">
          <button className="p-2 px-4 rounded-lg hover:bg-[#9FBDE8]">Login</button>
          <button className="rounded-lg bg-[#2B7FFF] p-2 text-white">
            Get Started
          </button>
        </div>
      </header>
    </div>
  );
}

export default Hero;
