import {Plus} from 'lucide-react'

function Nutrition(){
    const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
    return( 
        <div className='px-4'>
            <div className='flex justify-evenly items-center mt-8'>
                <div>
                    <h1 className='text-xl font-bold'>Nutrition</h1>
                    <p className='text-gray-500 text-sm font-medium'>Fueling your performance by {formattedDate}</p>
                </div>
                <div className='w-40'>
                    <button className='flex items-center gap-2 px-4 py-1.5 text-white bg-blue-500 rounded-2xl'><Plus/>Log Meal</button>
                </div>
            </div>
            <div>
                
            </div>
            <div></div>
        </div>
    )
}

export default Nutrition