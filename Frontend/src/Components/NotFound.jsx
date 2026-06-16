import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FBF8FF] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8 text-center bg-white/80 backdrop-blur-md p-10 rounded-3xl border border-gray-150 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col items-center">
          {/* Animated 404 Icon Container */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-red-100 rounded-full blur-xl opacity-70 animate-pulse"></div>
            <div className="relative bg-red-50 p-6 rounded-3xl border border-red-100 text-red-500 animate-bounce">
              <AlertCircle size={48} className="stroke-[1.5]" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 leading-none tracking-tight">
            404
          </h1>
          <h2 className="mt-4 text-2xl font-extrabold text-gray-900 tracking-tight">
            This page does not exist
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#71717B] font-medium max-w-xs mx-auto leading-relaxed">
          This page not exist
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            to="/home"
            className="flex items-center justify-center gap-2 bg-[#2B7FFF] text-white px-5 py-3.5 rounded-2xl font-bold cursor-pointer active:scale-98 transition-all hover:bg-blue-600 shadow-md shadow-blue-500/10 text-base"
          >
            <Home size={18} />
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-white text-gray-700 px-5 py-3.5 rounded-2xl font-semibold border border-gray-200 cursor-pointer hover:bg-gray-50 active:scale-98 transition-all text-base"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
