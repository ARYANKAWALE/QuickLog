import React from "react";
import { useAuth } from "../AuthContext";
import { ChevronRight, Star } from "lucide-react";
import { useState } from "react";

function AccountDetails() {
  const { user } = useAuth();
  const [ email,setEmail] = useState("");
  const [ username,setUsername] = useState("");
  const [ age,setAge] = useState("");
  const [ gender,setGender] = useState("");
  const [ weight,setWeight] = useState("");
  const [ height,setHeight] = useState("");
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:3000/profile",{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        email,
        username,
        age,
        gender,
        weight,
        height
      })
    })
    const data = await res.json()
    console.log(data)
  }


  return (
    <div>
      <div className="bg-surface-container-low w-full rounded-2xl border border-separator">
        <div className="flex flex-row justify-between px-6 md:px-10 mt-5">
          <p className="font-medium text-xl text-on-surface">Your Profile</p>
          <p className="bg-primary py-1 px-2.5 rounded-full text-white text-xs font-bold self-center">
            Pro
          </p>
        </div>

        <div className="p-4 md:p-6 rounded-xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-secondary"
              >
                Full Name
              </label>
              <div className="relative flex items-center">
                <input
                  id="fullName"
                  type="text"
                  className="w-full bg-surface-container-lowest text-on-surface py-3.5 pl-4 pr-10 rounded-2xl shadow-sm border border-separator cursor-pointer outline-none font-medium text-base"
                  value={user?.username || "Username not exist"}
                  readOnly
                />
                <span className="absolute right-4 text-secondary pointer-events-none text-xs">
                  <ChevronRight />
                </span>
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-secondary"
              >
                Email
              </label>
              <div className="relative flex items-center">
                <input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container-lowest text-on-surface py-3.5 pl-4 pr-10 rounded-2xl shadow-sm border border-separator cursor-pointer outline-none font-medium text-base"
                  value={user?.email || "Email not exist"}
                  readOnly
                />
                <span className="absolute right-4 text-secondary pointer-events-none text-xs">
                  <ChevronRight />
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="Age"
                className="text-sm font-medium text-secondary"
              >
                Age
              </label>
              <div className="relative flex items-center">
                <input
                  id="Age"
                  type="text"
                  className="w-full bg-surface-container-lowest text-on-surface py-3.5 pl-4 pr-10 rounded-2xl shadow-sm border border-separator cursor-pointer outline-none font-medium text-base"
                  value={user?.age || "Age not updated"}
                  readOnly
                />
                <span className="absolute right-4 text-secondary pointer-events-none text-xs">
                  <ChevronRight />
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="gender"
                className="text-sm font-medium text-secondary"
              >
                Gender
              </label>
              <div className="relative flex items-center">
                <input
                  id="gender"
                  type="text"
                  className="w-full bg-surface-container-lowest text-on-surface py-3.5 pl-4 pr-10 rounded-2xl shadow-sm border border-separator cursor-pointer outline-none font-medium text-base"
                  value={user?.gender || "gender not updated"}
                  readOnly
                />
                <span className="absolute right-4 text-secondary pointer-events-none text-xs">
                  <ChevronRight />
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="weight"
                className="text-sm font-medium text-secondary"
              >
                Weight
              </label>
              <div className="relative flex items-center">
                <input
                  id="weight"
                  type="text"
                  className="w-full bg-surface-container-lowest text-on-surface py-3.5 pl-4 pr-10 rounded-2xl shadow-sm border border-separator cursor-pointer outline-none font-medium text-base"
                  value={user?.weight || "weight not updated"}
                  readOnly
                />
                <span className="absolute right-4 text-secondary pointer-events-none text-xs">
                  <ChevronRight />
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="height"
                className="text-sm font-medium text-secondary"
              >
                Height
              </label>
              <div className="relative flex items-center">
                <input
                  id="height"
                  type="text"
                  className="w-full bg-surface-container-lowest text-on-surface py-3.5 pl-4 pr-10 rounded-2xl shadow-sm border border-separator cursor-pointer outline-none font-medium text-base"
                  value={user?.height || "height not updated"}
                  readOnly
                />
                <span className="absolute right-4 text-secondary pointer-events-none text-xs">
                  <ChevronRight />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-5 bg-primary-muted border border-primary/20 m-4 md:m-10 rounded-xl text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div>
              <Star className="p-3 h-12 w-12 rounded-full bg-primary text-white" />
            </div>
            <div>
              <p className="font-bold text-primary">Elite Annual Plan</p>
              <p className="text-sm text-primary">renew on 1 june 2026</p>
            </div>
          </div>
          <div>
            <p className="text-primary font-bold cursor-pointer hover:underline text-sm">
              Manage Plans
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
