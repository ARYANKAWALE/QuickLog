import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Zap, 
  Sparkles, 
  Flame, 
  Dumbbell, 
  Activity, 
  CheckCircle2, 
  TrendingUp, 
  Calendar,
  AlertCircle
} from "lucide-react";

const BACKEND_URL = "http://localhost:3000/api/v1/user";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Please enter your username or email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();

      if (json.success && json.data) {
        login(json.data.token, json.data.user);
        setSuccess(true);
        setTimeout(() => {
          navigate("/nutrition");
        }, 800);
      } else {
        setError(json.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Could not connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 font-sans text-on-surface">
      <div className="w-full max-w-5xl bg-surface-container-lowest rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px] border border-separator">
        
        {/* Left Column: Login Form */}
        <div className="md:col-span-6 p-8 sm:p-12 flex flex-col justify-center bg-surface-container-lowest">
          <div className="w-full max-w-md mx-auto">
            
            {/* Mobile Brand Logo */}
            <div className="flex md:hidden items-center gap-2 mb-8 justify-center">
              <Zap size={32} className="text-white bg-[#2B7FFF] p-1.5 rounded-lg shadow-md shadow-blue-500/20" />
              <span className="text-xl font-bold tracking-tight text-on-surface">QuickLog</span>
            </div>

            {/* Header */}
            <div className="text-center md:text-left mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-secondary">
                Track your progress, manage your buffer, and hit your goals.
              </p>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button 
                type="button"
                className="flex items-center justify-center px-4 py-2.5 border border-separator rounded-xl hover:bg-surface-container transition-colors duration-200 cursor-pointer font-medium text-sm text-secondary hover:text-on-surface active:scale-98"
              >
                {/* Google Logo SVG */}
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button 
                type="button"
                className="flex items-center justify-center px-4 py-2.5 border border-separator rounded-xl hover:bg-surface-container transition-colors duration-200 cursor-pointer font-medium text-sm text-secondary hover:text-on-surface active:scale-98"
              >
                {/* Apple Logo SVG */}
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94.1.08.2.12.3.12.87 0 1.96-.54 2.52-1.45z"/>
                </svg>
                Apple
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-separator"></div>
              </div>
              <span className="relative px-3 bg-surface-container-lowest text-xs text-secondary uppercase tracking-wider">
                or sign in with email
              </span>
            </div>

            {/* Simulated success banner */}
            {success && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Success!</h4>
                  <p className="text-xs text-emerald-700 mt-1">
                    You have successfully signed in. Redirecting to your dashboard...
                  </p>
                </div>
              </div>
            )}

            {/* Error banner */}
            {error && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Username/Email Input Group */}
              <div className="flex flex-col gap-1.5 relative group">
                <label className="text-xs font-semibold text-secondary uppercase tracking-wider">
                  Username or email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-secondary group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    disabled={isSubmitting || success}
                    className="block w-full pl-11 pr-4 py-3 border border-separator rounded-2xl bg-surface-container-low hover:bg-surface-container-lowest focus:bg-surface-container-lowest placeholder-secondary focus:border-primary focus:ring-4 focus:ring-blue-100/30 outline-none transition-all duration-200 text-on-surface text-sm font-normal disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password Input Group */}
              <div className="flex flex-col gap-1.5 relative group">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-secondary uppercase tracking-wider">
                    Password
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="text-xs font-semibold text-primary hover:underline hover:text-blue-700 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-secondary group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={isSubmitting || success}
                    className="block w-full pl-11 pr-11 py-3 border border-separator rounded-2xl bg-surface-container-low hover:bg-surface-container-lowest focus:bg-surface-container-lowest placeholder-secondary focus:border-primary focus:ring-4 focus:ring-blue-100/30 outline-none transition-all duration-200 text-on-surface text-sm font-normal disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting || success}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-secondary hover:text-on-surface transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isSubmitting || success}
                  className="h-4 w-4 text-primary focus:ring-blue-500 border-separator rounded cursor-pointer"
                />
                <label 
                  htmlFor="remember-me" 
                  className="ml-2 block text-sm text-secondary font-medium cursor-pointer select-none"
                >
                  Remember this device
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || success}
                className="w-full bg-[#2B7FFF] text-white py-3.5 px-4 rounded-2xl font-bold text-base hover:bg-blue-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-500/20 disabled:opacity-75 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Login to QuickLog"
                )}
              </button>
            </form>

            {/* Register Footer */}
            <p className="mt-8 text-center text-sm text-secondary">
              Don't have an account yet?{" "}
              <Link 
                to="/register" 
                className="font-bold text-primary hover:underline hover:text-blue-700 transition-colors"
              >
                Sign up free
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column: Premium Visual Showcase */}
        <div className="hidden md:col-span-6 md:flex bg-gradient-to-tr from-slate-950 via-[#1e1b4b] to-[#1e3a8a] p-12 text-white flex-col justify-between relative overflow-hidden">
          
          {/* Background Ambient Glows */}
          <div className="absolute top-[-20%] left-[-20%] w-[90%] h-[90%] rounded-full bg-blue-500/15 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-[#2B7FFF]/10 blur-[90px] pointer-events-none" />

          {/* Desktop Brand Logo */}
          <div className="relative z-10 flex items-center gap-2.5">
            <Zap size={36} className="text-white bg-[#2B7FFF] p-1.5 rounded-xl shadow-lg shadow-blue-500/30" />
            <span className="text-2xl font-bold tracking-tight text-white">QuickLog</span>
            <span className="bg-white/10 text-white/80 border border-white/10 text-xs px-2 py-0.5 rounded-full font-medium ml-2 select-none">
              v2.0
            </span>
          </div>

          {/* Core Feature Showcase Widgets */}
          <div className="relative z-10 flex flex-col gap-6 my-auto max-w-[85%] mx-auto w-full">
            
            {/* Calorie Buffer Widget */}
            <div className="backdrop-blur-md bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 shadow-2xl relative group hover:border-white/20 transition-colors duration-300">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-emerald-400" />
                  <span className="text-sm font-semibold tracking-wide text-gray-300">Calorie Buffer</span>
                </div>
                <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-xs px-2 py-0.5 rounded-full font-bold">
                  Balanced
                </span>
              </div>
              
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-3xl font-extrabold tracking-tight text-white">+420 <span className="text-xs text-gray-400 font-medium">kcal</span></span>
                <span className="text-xs text-gray-400">Target: 2,400 kcal</span>
              </div>
              
              {/* Custom Progress Bar */}
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: "76%" }}
                />
              </div>
            </div>

            {/* Streak & Top Rank Widget */}
            <div className="flex gap-4">
              <div className="flex-1 backdrop-blur-md bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 shadow-2xl hover:border-white/20 transition-colors duration-300 flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl">
                  <Flame size={20} className="text-white fill-current animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400">Weekly Streak</h4>
                  <p className="text-lg font-bold text-white mt-0.5">5 Days</p>
                </div>
              </div>

              <div className="flex-1 backdrop-blur-md bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 shadow-2xl hover:border-white/20 transition-colors duration-300 flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-[#2B7FFF] to-indigo-600 rounded-xl">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400">Global Rank</h4>
                  <p className="text-lg font-bold text-white mt-0.5">Top 8%</p>
                </div>
              </div>
            </div>

            {/* Recent Workout Widget */}
            <div className="backdrop-blur-md bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 shadow-xl hover:border-white/10 transition-colors duration-300">
              <div className="flex justify-between items-center mb-3 text-xs font-semibold text-gray-400">
                <span className="flex items-center gap-1.5"><Calendar size={14} /> Today's Session</span>
                <span className="text-[#2B7FFF] flex items-center gap-1"><Sparkles size={12} /> Logged in 8s</span>
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] p-2.5 rounded-xl transition-all duration-200">
                  <div className="flex items-center gap-2.5">
                    <Dumbbell size={16} className="text-blue-400 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-white">Barbell Squat</p>
                      <p className="text-[11px] text-gray-400">4 sets x 10 reps @ 100kg</p>
                    </div>
                  </div>
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                </div>

                <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] p-2.5 rounded-xl transition-all duration-200">
                  <div className="flex items-center gap-2.5">
                    <Dumbbell size={16} className="text-blue-400 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-white">Incline Bench Press</p>
                      <p className="text-[11px] text-gray-400">3 sets x 12 reps @ 65kg</p>
                    </div>
                  </div>
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                </div>
              </div>
            </div>

          </div>

          {/* Showcase Testimonial / Footnote */}
          <div className="relative z-10 text-gray-400 text-xs mt-auto">
            <p className="font-medium">
              Join <span className="text-white font-bold">120,000+</span> athletes tracking their workouts and caloric budgets on QuickLog.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;