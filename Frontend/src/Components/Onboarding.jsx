import { useState } from "react";
import { Calendar, Users, Ruler, Scale, ArrowRight } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";


// Shared input class — uses only theme tokens
const inputClass =
  "w-full rounded-xl bg-surface-container-low border border-separator px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition";

function Onboarding() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { token, login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!age || !gender || !height || !weight) {
      setError("Please fill all the fields");
      return;
    }

    setIsSubmitted(true);
    try {
      const res = await fetch("http://localhost:3000/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ age, gender, height, weight }),
      });
      const data = await res.json();

      if (data.success) {
        login(token, { ...user, age,gender,height,weight,isProfileUpdated:true});
        navigate("/home");
      } else {
        setError(data.message || "Something went wrong. Try again.");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Try again.");
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 pb-19">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">
          Build Your Profile
        </h1>
        <p className="text-secondary text-sm max-w-xs mx-auto leading-relaxed">
          Let's tailor your fitness journey with your baseline metrics.
        </p>
      </div>

      {/* ── Card ───────────────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-xl border border-separator p-7">
        {/* ── Input Grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Age */}
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wide">
              <Calendar size={13} />
              Age
            </label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              placeholder="Enter Your Age"
              className={inputClass}
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wide">
              <Users size={13} />
              Gender
            </label>
            <div className="relative">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={`${inputClass} appearance-none cursor-pointer pr-8`}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {/* Custom chevron */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-4 h-4 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Height */}
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wide">
              <Ruler size={13} />
              Height (cm)
            </label>
            <input
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              type="number"
              placeholder="Enter Your Height"
              className={inputClass}
            />
          </div>

          {/* Weight */}
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wide">
              <Scale size={13} />
              Weight (kg)
            </label>
            <input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              type="number"
              placeholder="Enter Your Weight"
              className={inputClass}
            />
          </div>
        </div>

        {/* ── Continue Button ─────────────────────────────────────────────── */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary-container text-on-primary font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] cursor-pointer"
        >
          Continue
          <ArrowRight size={16} />
        </button>
      </div>
      </form>
    </div>
  );
}

export default Onboarding;
