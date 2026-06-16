import { useState, useEffect } from "react";
import { Sparkles, MoveRight, Play, Timer, Gauge, ChartLine } from "lucide-react";
import gym1 from "../assets/gym1.jpg";
import gym2 from "../assets/gym2.jpg";

const BACKEND_URL = "http://localhost:3000/api/v1/stats";

// Helper function to format values based on magnitude
const formatStatValue = (val, type) => {
  if (type === "rating") {
    return val.toFixed(1);
  }
  if (val >= 1000000) {
    return `${(val / 1000000).toFixed(1).replace(".0", "")}M+`;
  }
  if (val >= 1000) {
    return `${(val / 1000).toFixed(1).replace(".0", "")}k+`;
  }
  return Math.floor(val).toString();
};

// Premium animated count-up component with easing
function AnimatedCounter({ target, duration = 2000, format }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quad
      const easeOutQuad = progress * (2 - progress);
      setCount(easeOutQuad * target);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, duration]);

  return <span>{format(count)}</span>;
}

function Content() {
  const [stats, setStats] = useState({
    activeUsers: 0,
    appStoreRating: 4.9,
    workoutsLogged: 0,
  });

  useEffect(() => {
    fetch(BACKEND_URL)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setStats(res.data);
        }
      })
      .catch((err) => console.error("Error fetching homepage stats:", err));
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FBF8FF] overflow-x-hidden pb-20">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            
            {/* Sparkle Badge */}
            <div className="inline-flex items-center gap-2 p-1 px-3 bg-[#F4F4F5] w-fit rounded-xl border border-gray-200 mx-auto lg:mx-0 shadow-sm">
              <Sparkles size={18} className="text-[#3484FF]" />
              <span className="text-sm font-semibold text-gray-700">Log a workout in under 10 seconds</span>
            </div>
            
            {/* Main Header */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Track your gym & stay inside your{" "}
              <span className="text-[#2B7FFF]">calorie buffer</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg sm:text-xl text-[#71717B] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              QuickLog combines effortless workout logging with a smart calorie
              buffer system, so you always know how much room you have left to
              hit your goals.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
              <button className="bg-[#2B7FFF] text-white px-6 py-4 rounded-2xl flex items-center justify-center gap-2 hover:gap-3.5 transition-all duration-300 ease-in-out font-bold cursor-pointer active:scale-98 shadow-md shadow-blue-500/10 text-lg">
                Start Tracking free
                <MoveRight size={20} className="text-[#FFFFFF]" />
              </button>
              <button className="bg-[#FFFFFF] text-black px-6 py-4 rounded-2xl flex items-center justify-center gap-2 border border-gray-200 font-semibold cursor-pointer hover:bg-gray-50 active:scale-98 transition-all duration-200 text-lg">
                <Play size={18} className="text-black fill-current" />
                Watch demo
              </button>
            </div>
            
            {/* Stats section */}
            <div className="flex flex-row p-4 gap-6 sm:gap-12 justify-center lg:justify-start mt-6 border-t border-gray-100 pt-8">
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-gray-950">
                  <AnimatedCounter
                    target={stats.activeUsers}
                    format={(val) => formatStatValue(val, "users")}
                  />
                </span>
                <span className="text-sm text-[#71717B] font-medium">Active users</span>
              </div>
              <div className="h-10 w-px bg-gray-200 self-center"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-gray-950">
                  <AnimatedCounter
                    target={stats.appStoreRating}
                    format={(val) => formatStatValue(val, "rating")}
                  />
                </span>
                <span className="text-sm text-[#71717B] font-medium">App store rating</span>
              </div>
              <div className="h-10 w-px bg-gray-200 self-center"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-gray-950">
                  <AnimatedCounter
                    target={stats.workoutsLogged}
                    format={(val) => formatStatValue(val, "workouts")}
                  />
                </span>
                <span className="text-sm text-[#71717B] font-medium">Workouts logged</span>
              </div>
            </div>

          </div>
          
          {/* Hero Images (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-row gap-4 justify-center items-center w-full mt-6 lg:mt-0">
            <img
              src={gym1}
              alt="Gym Activity 1"
              className="w-1/2 max-w-[160px] sm:max-w-[200px] lg:max-w-[220px] aspect-[4/5] object-cover rounded-3xl shadow-lg hover:scale-102 transition-transform duration-300"
            />
            <img
              src={gym2}
              alt="Gym Activity 2"
              className="w-1/2 max-w-[160px] sm:max-w-[200px] lg:max-w-[220px] aspect-[4/5] object-cover rounded-3xl shadow-lg hover:scale-102 transition-transform duration-300 mt-8"
            />
          </div>

        </div>
      </div>
      
      {/* Features Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature Card 1 */}
          <div className="border border-gray-200 rounded-3xl p-8 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
            <div>
              <div className="pb-4">
                <Timer size={48} className="text-[#2B7FFF] bg-blue-50 p-2.5 rounded-2xl" />
              </div>
              <h2 className="font-extrabold text-xl text-gray-950 pb-2">One-Tap Logging</h2>
              <p className="text-[#71717B] font-medium text-sm sm:text-base leading-relaxed">
                Save your routines and log entire sessions instantly. No friction, no excuses - just train and tap.
              </p>
            </div>
          </div>
          
          {/* Feature Card 2 */}
          <div className="border border-gray-200 rounded-3xl p-8 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
            <div>
              <div className="pb-4">
                <Gauge size={48} className="text-[#2B7FFF] bg-blue-50 p-2.5 rounded-2xl" />
              </div>
              <h2 className="font-extrabold text-xl text-gray-950 pb-2">Smart Calorie Buffer</h2>
              <p className="text-[#71717B] font-medium text-sm sm:text-base leading-relaxed">
                Earn calories back from your workouts and see your real-time buffer so you can eat with confidence.
              </p>
            </div>
          </div>
          
          {/* Feature Card 3 */}
          <div className="border border-gray-200 rounded-3xl p-8 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
            <div>
              <div className="pb-4">
                <ChartLine size={48} className="text-[#2B7FFF] bg-blue-50 p-2.5 rounded-2xl" />
              </div>
              <h2 className="font-extrabold text-xl text-gray-950 pb-2">Progress Insights</h2>
              <p className="text-[#71717B] font-medium text-sm sm:text-base leading-relaxed">
                Visualize strength gains and calorie trends with clean charts that keep you motivated week after week.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Content;
