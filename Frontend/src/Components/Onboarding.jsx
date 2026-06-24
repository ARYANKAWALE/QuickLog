import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

// ── Conversion helpers ────────────────────────────────────────────────────────
const kgToLbs  = (kg)  => Math.round(kg * 2.20462 * 10) / 10;
const lbsToKg  = (lbs) => Math.round((lbs / 2.20462) * 10) / 10;
const cmToFtIn = (cm)  => ({ ft: Math.floor(cm / 30.48), inches: Math.round((cm / 2.54) % 12) });
const ftInToCm = (ft, inches) => Math.round(Number(ft) * 30.48 + Number(inches) * 2.54);

const GENDERS = ["Male", "Female", "Other"];

export default function Onboarding() {
  const [gender,     setGender]   = useState("");
  const [age,        setAge]      = useState("");
  const [heightUnit, setHUnit]    = useState("cm");
  const [heightCm,   setHCm]     = useState("");
  const [heightFt,   setHFt]     = useState("");
  const [heightIn,   setHIn]     = useState("");
  const [weightUnit, setWUnit]    = useState("kg");
  const [weightKg,   setWKg]     = useState("");
  const [weightLbs,  setWLbs]    = useState("");
  const [isSubmitting, setSub]   = useState(false);
  const [error,      setError]   = useState("");

  const { token, login, user } = useAuth();
  const navigate = useNavigate();

  // ── unit toggles ──────────────────────────────────────────────────────────
  const toggleH = (u) => {
    if (u === heightUnit) return;
    if (u === "ft" && heightCm) { const { ft, inches } = cmToFtIn(Number(heightCm)); setHFt(String(ft)); setHIn(String(inches)); }
    else if (u === "cm" && heightFt) setHCm(String(ftInToCm(heightFt, heightIn || 0)));
    setHUnit(u);
  };

  const toggleW = (u) => {
    if (u === weightUnit) return;
    if (u === "lbs" && weightKg)  setWLbs(String(kgToLbs(Number(weightKg))));
    else if (u === "kg" && weightLbs) setWKg(String(lbsToKg(Number(weightLbs))));
    setWUnit(u);
  };

  // ── submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const heightFilled = heightUnit === "cm" ? !!heightCm : !!heightFt;
    const weightFilled = weightUnit === "kg" ? !!weightKg : !!weightLbs;

    if (!gender || !age || !heightFilled || !weightFilled) {
      setError("Please fill in all fields.");
      return;
    }
    if (Number(age) < 1 || Number(age) > 120) {
      setError("Enter a valid age (1–120).");
      return;
    }

    const height = heightUnit === "cm" ? Number(heightCm) : ftInToCm(heightFt, heightIn || 0);
    const weight = weightUnit === "kg" ? Number(weightKg) : lbsToKg(Number(weightLbs));

    setSub(true);
    try {
      const res  = await fetch("http://localhost:3000/api/v1/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ age: Number(age), gender, height, weight }),
      });
      const data = await res.json();
      if (data.success) {
        login(token, { ...user, age, gender, height, weight, isProfileUpdated: true });
        navigate("/home");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setSub(false);
    }
  };

  // ── shared styles ─────────────────────────────────────────────────────────
  const input = "w-full rounded-xl border border-separator bg-surface-container-low px-3.5 py-2.5 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary transition";

  const UnitPill = ({ value, options, onChange }) => {
    const idx = options.indexOf(value);
    return (
      <div className="relative flex bg-surface-container border border-separator rounded-lg p-0.5">
        <div className="absolute top-0.5 bottom-0.5 bg-primary rounded-md transition-all duration-200"
          style={{ width: `calc(${100 / options.length}% - 2px)`, left: `calc(${idx * (100 / options.length)}% + 2px)` }} />
        {options.map(o => (
          <button key={o} type="button" onClick={() => onChange(o)}
            className={`relative z-10 px-2.5 py-0.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${value === o ? "text-on-primary" : "text-secondary"}`}>
            {o}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--color-background)" }}>

      <div className="w-full max-w-sm">

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-on-surface">Build Your Profile</h1>
          <p className="text-sm text-secondary mt-1">Tell us a bit about yourself.</p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit}>
          <div className="rounded-2xl border border-separator bg-surface-container-lowest p-5 shadow-sm space-y-4">

            {/* Gender */}
            <div>
              <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Gender</label>
              <div className="flex gap-2">
                {GENDERS.map(g => (
                  <button key={g} type="button" onClick={() => setGender(g)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
                      gender === g
                        ? "bg-primary text-on-primary border-primary"
                        : "bg-surface-container-low text-secondary border-separator hover:border-primary/40"
                    }`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Age</label>
              <input
                type="number" min="1" max="120" placeholder="e.g. 25"
                value={age} onChange={e => setAge(e.target.value)}
                className={input} />
            </div>

            {/* Height */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Height</label>
                <UnitPill value={heightUnit} options={["cm", "ft"]} onChange={toggleH} />
              </div>
              {heightUnit === "cm" ? (
                <input type="number" min="0" max="300" placeholder="e.g. 175 cm"
                  value={heightCm} onChange={e => setHCm(e.target.value)} className={input} />
              ) : (
                <div className="flex gap-2">
                  <input type="number" min="0" max="9" placeholder="ft"
                    value={heightFt} onChange={e => setHFt(e.target.value)} className={input} />
                  <input type="number" min="0" max="11" placeholder="in"
                    value={heightIn} onChange={e => setHIn(e.target.value)} className={input} />
                </div>
              )}
            </div>

            {/* Weight */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Weight</label>
                <UnitPill value={weightUnit} options={["kg", "lbs"]} onChange={toggleW} />
              </div>
              {weightUnit === "kg" ? (
                <input type="number" min="0" placeholder="e.g. 70 kg"
                  value={weightKg} onChange={e => setWKg(e.target.value)} className={input} />
              ) : (
                <input type="number" min="0" placeholder="e.g. 154 lbs"
                  value={weightLbs} onChange={e => setWLbs(e.target.value)} className={input} />
              )}
            </div>

            {/* Error */}
            {error && <p className="text-xs text-error font-medium">{error}</p>}

            {/* Button */}
            <button type="submit" disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-on-primary font-semibold text-sm transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60 cursor-pointer">
              {isSubmitting ? "Saving…" : "Continue"}
              <ArrowRight size={15} />
            </button>

          </div>
        </form>

        <p className="text-center text-xs text-outline mt-4">You can update these anytime in your profile.</p>
      </div>
    </div>
  );
}
