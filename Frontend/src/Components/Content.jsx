import { Sparkles, MoveRight,Play} from 'lucide-react';
import gym1 from '../assets/gym1.jpg';
import gym2 from '../assets/gym2.jpg';

function Content(){
    return(
    <div className="flex justify-between p-10">
        <div className="flex flex-col gap-5">
            <div className="p-1 bg-[#F4F4F5] w-fit rounded-lg">
                <p className="flex flex-row px-2 py-1"> <Sparkles size={20} className="text-[#3484FF]" />Log a workout in under 10 seconds</p>
            </div>
            <div className="">
                <h1 className="text-6xl font-bold">Track your gym & stay inside your<span className="text-[#2B7FFF]">calorie buffer</span></h1>
                <p className="pt-10 font-normal text-xl text-[#71717B]">QuickLog combines effortless workout logging with a smart calorie buffer system,
                     so you always know how much room you have left to hit your goals.</p>
            </div>
            <div className="flex flex-row gap-5">
                <button className="bg-[#3484FF] h-10 text-xl text-white px-2 py-7 rounded-xl flex flex-row items-center gap-2 hover:gap-4 transition-all duration-300 ease-in-out font-bold cursor-pointer">Start Tracking free  <MoveRight size={20} className="text-[#FFFFFF]"/></button>
                <button className="bg-[#FFFFFF] h-10 text-xl text-black px-2 py-7 rounded-xl flex flex-row items-center gap-2 border border-gray-300 font-medium cursor-pointer"><Play size={20} className="text-[#00000]"/>Watch demo</button>
            </div>
            <div>

            </div>
        </div>
        <div className="flex gap-10">
            <img src={gym1} alt="Gym Activity 1" className="max-w-94 min-h-[600px]  h-auto rounded-4xl shadow-md" />
            <img src={gym2} alt="Gym Activity 2" className="max-w-94 min-h-[600px] h-auto rounded-4xl shadow-md" />
        </div>
    </div>
    )
}

export default Content