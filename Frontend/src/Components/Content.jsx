import { Sparkles, MoveRight, Play,Timer, Gauge,ChartLine } from "lucide-react";
import gym1 from "../assets/gym1.jpg";
import gym2 from "../assets/gym2.jpg";

function Content() {
  return (
    <div className="flex flex-col pb-10 mx-39">
      <div className="flex justify-evenly p-10">
        <div className="flex flex-col gap-5">
          <div className="p-1 bg-[#F4F4F5] w-fit rounded-lg">
            <p className="flex flex-row px-2 py-1 gap-2 items-center">
              {" "}
              <Sparkles size={20} className="text-[#3484FF]" />
              Log a workout in under 10 seconds
            </p>
          </div>
          <div className="">
            <h1 className="text-6xl font-bold">
              Track your gym & stay inside your
              <span className="text-[#2B7FFF]">calorie buffer</span>
            </h1>
            <p className="pt-10 font-normal text-xl text-[#71717B]">
              QuickLog combines effortless workout logging with a <br/> smart calorie
              buffer system, so you always know how <br/> much room you have left to
              hit your goals.
            </p>
          </div>
          <div className="flex flex-row gap-5">
            <button className="bg-[#3484FF] h-10 text-xl text-white px-2 py-7 rounded-xl flex flex-row items-center gap-2 hover:gap-4 transition-all duration-300 ease-in-out font-bold cursor-pointer">
              Start Tracking free{" "}
              <MoveRight size={20} className="text-[#FFFFFF]" />
            </button>
            <button className="bg-[#FFFFFF] h-10 text-xl text-black px-2 py-7 rounded-xl flex flex-row items-center gap-2 border border-gray-300 font-medium cursor-pointer">
              <Play size={20} className="text-[#00000]" />
              Watch demo
            </button>
          </div>
          <div className="flex flex-row p-10 gap-10">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">120k+</h1>
              <p className="text-[#71717B]">Active users</p>
            </div>
            <div class="h-10 w-px bg-gray-300"></div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">4.9</h1>
              <p className="text-[#71717B]">App store rating</p>
            </div>
            <div class="h-10 w-px bg-gray-300"></div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">8M+</h1>
              <p className="text-[#71717B]">Workout logged</p>
            </div>
          </div>
        </div>
        <div className="flex gap-10">
          <img
            src={gym1}
            alt="Gym Activity 1"
            className="max-w-84 min-h-100  h-auto rounded-4xl shadow-md"
          />
          <img
            src={gym2}
            alt="Gym Activity 2"
            className="max-w-84 min-h-100 h-auto rounded-4xl shadow-md"
          />
        </div>
      </div>
      <div className="flex flex-row flex-col gap-10 justify-evenly">
        <div className="border border-gray-300 w-fit h-50 rounded-xl p-6 m-auto">
            <p className="pb-3"><Timer size={50} className="text-[#3484FF] bg-[#DFECFF] p-3 rounded-xl "/></p>
            <h1 className="font-bold text-2xl pb-1">One-Tap Logging</h1>
            <p className="text-[#71717B] font-medium">Save your routines and log entire sessions instantly. No friction, no excuses - just train and tap.</p>
        </div>
        <div className="border border-gray-300 w-fit h-50 rounded-xl p-6">
            <p className="pb-3"><Gauge size={50} className="text-[#3484FF] bg-[#DFECFF] p-3 rounded-xl "/></p>
            <h1 className="font-bold text-2xl pb-1">Smart calorie buffer</h1>
            <p className="text-[#71717B] font-medium">Earn calories back from your workouts and see your real-time buffer so you can eat with confidence.</p>
        </div>
        <div className="border border-gray-300 w-fit h-50 rounded-xl p-6">
            <p className="pb-3"><ChartLine size={50} className="text-[#3484FF] bg-[#DFECFF] p-3 rounded-xl"/></p>
            <h1 className="font-bold text-2xl pb-1">Progress Insights</h1>
            <p className="text-[#71717B] font-medium">Visualize strength gains and calorie trends with clean charts that keep you motivated week after week.</p>
        </div>
      </div>
    </div>
  );
}

export default Content;
