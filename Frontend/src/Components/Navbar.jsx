import {Dumbbell, House,Apple,TrendingUp,Settings,Zap} from 'lucide-react'
function Hero(){

return(
    <div className="bg-[#FFFFFF] text-black p-4 flex flex-row justify-around font-medium items-center">
        <div className="flex flex-row">
            <Zap size={30} className="text-[#FFFFFF] bg-[#2B7FFF] p-1 rounded-lg" />
            <h1 className="text-2xl font-bold">QuickLog</h1>
        </div>
        <div className="flex flex-row justify-between items-center gap-10">
            <ul className="flex flex-row gap-10 ">
                <li className="flex flex-row gap-1"> <House size={20} className="text-[#00000]" />Home</li>
                <li className="flex flex-row gap-1"> <Dumbbell size={20} className="text-[#00000]" />Workout</li> 
                <li className="flex flex-row gap-1"> <Apple size={20} className="text-[#00000]" />Nutrition</li>
                <li className="flex flex-row gap-1"> <TrendingUp size={20} className="text-[#00000]" />Progress</li>
                <li className="flex flex-row gap-1"> <Settings size={20} className="text-[#00000]" />Setting</li>
            </ul>
        </div>
        <div className="flex justify-between gap-3 px-2">
            <button>Login</button>
            <button className="rounded-lg bg-[#2B7FFF] p-2 text-white">Get Started</button>
        </div>
    </div>
)
}

export default Hero