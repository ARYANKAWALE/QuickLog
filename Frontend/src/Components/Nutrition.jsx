import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

const BACKEND_URL = "http://localhost:3000/api/v1/nutrition";

// --- Toast Notification System ---
const TOAST_THEMES = {
  success: {
    accent: "#16a34a",
    accentLight: "rgba(22, 163, 74, 0.08)",
    accentBorder: "rgba(22, 163, 74, 0.18)",
    icon: "check_circle",
  },
  error: {
    accent: "#dc2626",
    accentLight: "rgba(220, 38, 38, 0.08)",
    accentBorder: "rgba(220, 38, 38, 0.18)",
    icon: "error",
  },
  warning: {
    accent: "#d97706",
    accentLight: "rgba(217, 119, 6, 0.08)",
    accentBorder: "rgba(217, 119, 6, 0.18)",
    icon: "warning",
  },
  info: {
    accent: "#0057bf",
    accentLight: "rgba(0, 87, 191, 0.08)",
    accentBorder: "rgba(0, 87, 191, 0.18)",
    icon: "info",
  },
};

function ToastContainer({ toasts, removeToast }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "400px",
        width: "100%",
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => {
        const theme = TOAST_THEMES[toast.type] || TOAST_THEMES.info;
        return (
          <div
            key={toast.id}
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: "16px 18px",
              borderRadius: "16px",
              background: "var(--color-surface-container-lowest, #ffffff)",
              border: `1.5px solid ${theme.accentBorder}`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 0 0 0.5px rgba(255,255,255,0.6)`,
              fontFamily: "'Inter', sans-serif",
              animation: toast.exiting
                ? "toast-out 0.35s ease-in forwards"
                : "toast-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            {/* Icon with accent pill */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: theme.accentLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "20px",
                  color: theme.accent,
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                {theme.icon}
              </span>
            </div>

            {/* Content */}
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              {toast.title && (
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--color-on-surface, #1a1b23)",
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  {toast.title}
                </p>
              )}
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "var(--color-secondary, #5f5e60)",
                  lineHeight: 1.4,
                  margin: toast.title ? "3px 0 0" : 0,
                }}
              >
                {toast.message}
              </p>
              {/* Progress countdown */}
              <div
                style={{
                  marginTop: "10px",
                  height: "3px",
                  width: "100%",
                  background: "var(--color-surface-dim, #dad9e4)",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: theme.accent,
                    borderRadius: "999px",
                    opacity: 0.6,
                    animation: `toast-progress ${toast.duration || 3500}ms linear forwards`,
                  }}
                />
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                flexShrink: 0,
                background: "none",
                border: "none",
                padding: "2px",
                cursor: "pointer",
                color: "var(--color-outline, #727786)",
                opacity: 0.5,
                transition: "opacity 0.2s",
                marginTop: "2px",
                lineHeight: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.5)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                close
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

// --- Confirmation Modal ---
function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmLabel = "Confirm" }) {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 90,
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "var(--color-surface-container-lowest, #ffffff)",
          borderRadius: "24px",
          padding: "32px",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
          border: "1px solid var(--color-separator, #e4e4e7)",
          fontFamily: "'Inter', sans-serif",
          animation: "confirm-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Header with icon */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(186, 26, 26, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "24px",
                color: "var(--color-error, #ba1a1a)",
                fontVariationSettings: "'FILL' 1",
              }}
            >
              delete_forever
            </span>
          </div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "var(--color-on-surface, #1a1b23)",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>
        </div>

        {/* Message */}
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-secondary, #5f5e60)",
            lineHeight: 1.6,
            margin: "0 0 28px 58px",
          }}
        >
          {message}
        </p>

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "10px 22px",
              borderRadius: "999px",
              border: "1px solid var(--color-separator, #e4e4e7)",
              background: "transparent",
              color: "var(--color-secondary, #5f5e60)",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-surface-container-high, #e8e7f2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "10px 22px",
              borderRadius: "999px",
              border: "none",
              background: "var(--color-error, #ba1a1a)",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "'Inter', sans-serif",
              boxShadow: "0 2px 8px rgba(186, 26, 26, 0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function Nutrition() {
  // --- State Declarations ---
  const todayStr = (() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  })();

  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [meals, setMeals] = useState([]);
  const [totalGoal, setTotalGoal] = useState(2600);
  const [proteinGoal, setProteinGoal] = useState(180);
  const [carbsGoal, setCarbsGoal] = useState(320);
  const [fatsGoal, setFatsGoal] = useState(85);
  const [fiberGoal, setFiberGoal] = useState(30);
  const [waterIntake, setWaterIntake] = useState(0);
  const [waterGoal, setWaterGoal] = useState(2500);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const changeDate = (days) => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + days);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const targetDateStr = `${year}-${month}-${day}`;
    if (targetDateStr <= todayStr) {
      setSelectedDate(targetDateStr);
    }
  };

  const getFriendlyDateString = (dateStr) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    
    const todayObj = new Date();
    const todayStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, '0')}-${String(todayObj.getDate()).padStart(2, '0')}`;
    
    const yesterdayObj = new Date();
    yesterdayObj.setDate(yesterdayObj.getDate() - 1);
    const yesterdayStr = `${yesterdayObj.getFullYear()}-${String(yesterdayObj.getMonth() + 1).padStart(2, '0')}-${String(yesterdayObj.getDate()).padStart(2, '0')}`;

    if (dateStr === todayStr) {
      return `Today, ${dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
    } else if (dateStr === yesterdayStr) {
      return `Yesterday, ${dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
    } else {
      return dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
  };

  // Modals state
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

  // Toast state
  const [toasts, setToasts] = useState([]);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: "", message: "", onConfirm: null });

  // Form input states
  const [mealName, setMealName] = useState("");
  const [mealCategory, setMealCategory] = useState("");
  const [mealType, setMealType] = useState("Lunch");
  const [caloriesInput, setCaloriesInput] = useState("");
  const [proteinInput, setProteinInput] = useState("");
  const [carbsInput, setCarbsInput] = useState("");
  const [fatsInput, setFatsInput] = useState("");
  const [fiberInput, setFiberInput] = useState("");

  // --- Toast Helpers ---
  const addToast = useCallback((type, message, title = "", duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message, title, duration, exiting: false }]);
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 400);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 400);
  }, []);

  // --- Fetch Data when selectedDate changes ---
  useEffect(() => {
    const loadData = async () => {
      try {
        if (isInitialLoad) {
          setIsLoading(true);
        }
        // Fetch Goals
        const goalsRes = await fetch(`${BACKEND_URL}/goals?date=${selectedDate}`);
        const goalsJson = await goalsRes.json();
        if (goalsJson.success && goalsJson.data) {
          const { totalGoal, proteinGoal, carbsGoal, fatsGoal, fiberGoal, waterGoal, waterIntake } = goalsJson.data;
          setTotalGoal(totalGoal);
          setProteinGoal(proteinGoal);
          setCarbsGoal(carbsGoal);
          setFatsGoal(fatsGoal);
          setFiberGoal(fiberGoal);
          setWaterGoal(waterGoal);
          setWaterIntake(waterIntake);
        }

        // Fetch Meals
        const mealsRes = await fetch(`${BACKEND_URL}/meals?date=${selectedDate}`);
        const mealsJson = await mealsRes.json();
        if (mealsJson.success && mealsJson.data) {
          setMeals(mealsJson.data);
        }
      } catch (error) {
        console.error("Error loading nutrition data:", error);
        addToast("error", "Failed to load your nutrition data. Please refresh.", "Connection Error");
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    };

    loadData();
  }, [selectedDate, addToast]);

  // --- Derived Calculations ---
  const consumed = meals.reduce((sum, m) => sum + m.calories, 0);
  const proteinConsumed = meals.reduce((sum, m) => sum + m.protein, 0);
  const carbsConsumed = meals.reduce((sum, m) => sum + m.carbs, 0);
  const fatsConsumed = meals.reduce((sum, m) => sum + m.fats, 0);
  const fiberConsumed = meals.reduce((sum, m) => sum + m.fiber, 0);

  const kcalLeft = totalGoal - consumed;
  const percentage = totalGoal > 0 ? Math.min((consumed / totalGoal) * 100, 100) : 0;

  // SVG Circular Progress Ring calculations
  const radius = 42;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius; // ~263.89
  const strokeDashoffset = totalGoal > 0 ? circumference - (percentage / 100) * circumference : circumference;

  // Macro progress bar percentages
  const proteinPercentage = proteinGoal > 0 ? Math.min((proteinConsumed / proteinGoal) * 100, 100) : 0;
  const carbsPercentage = carbsGoal > 0 ? Math.min((carbsConsumed / carbsGoal) * 100, 100) : 0;
  const fatsPercentage = fatsGoal > 0 ? Math.min((fatsConsumed / fatsGoal) * 100, 100) : 0;

  // Water intake percentage
  const waterPercentage = waterGoal > 0 ? Math.round((waterIntake / waterGoal) * 100) : 0;

  // --- Event Handlers ---
  const handleLogMeal = async (e) => {
    e.preventDefault();
    const cals = parseInt(caloriesInput) || 0;
    const p = parseInt(proteinInput) || 0;
    const c = parseInt(carbsInput) || 0;
    const f = parseInt(fatsInput) || 0;
    const fib = parseInt(fiberInput) || 0;

    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    const mealData = {
      name: mealName.trim() || "Quick Meal",
      category: mealCategory.trim() || "Generic",
      type: mealType,
      time: currentTime,
      protein: p,
      carbs: c,
      fats: f,
      fiber: fib,
      calories: cals,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=60",
      date: selectedDate
    };

    try {
      const res = await fetch(`${BACKEND_URL}/meals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mealData)
      });
      const json = await res.json();
      if (json.success && json.data) {
        setMeals([...meals, json.data]);
        addToast("success", `${mealData.name} — ${cals} kcal added to your log.`, "Meal Logged 🍽️");
      } else {
        addToast("error", "The server could not save your meal. Please try again.", "Log Failed");
      }
    } catch (error) {
      console.error("Error logging meal:", error);
      addToast("error", "Could not connect to the server. Check your connection.", "Network Error");
    }

    // Reset Form & Close Modal
    setMealName("");
    setMealCategory("");
    setMealType("Lunch");
    setCaloriesInput("");
    setProteinInput("");
    setCarbsInput("");
    setFatsInput("");
    setFiberInput("");
    setIsLogModalOpen(false);
  };

  const handleDeleteMeal = async (id) => {
    const mealToDelete = meals.find((m) => m._id === id);
    try {
      const res = await fetch(`${BACKEND_URL}/meals/${id}`, {
        method: "DELETE"
      });
      const json = await res.json();
      if (json.success) {
        setMeals(meals.filter((m) => m._id !== id));
        addToast("success", `${mealToDelete?.name || "Meal"} removed from your log.`, "Meal Deleted");
      } else {
        addToast("error", "Could not delete the meal. Please try again.", "Delete Failed");
      }
    } catch (error) {
      console.error("Error deleting meal:", error);
      addToast("error", "Could not connect to the server.", "Network Error");
    }
  };

  const handleUpdateGoals = async (e) => {
    e.preventDefault();
    const target = e.target.elements;
    const newCal = parseInt(target.calInput.value) || 2600;
    const newP = parseInt(target.pInput.value) || 180;
    const newC = parseInt(target.cInput.value) || 320;
    const newF = parseInt(target.fInput.value) || 85;
    const newFib = parseInt(target.fibInput.value) || 30;
    const newWater = (parseInt(target.waterInput.value) || 25) * 100;

    try {
      const res = await fetch(`${BACKEND_URL}/goals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalGoal: newCal,
          proteinGoal: newP,
          carbsGoal: newC,
          fatsGoal: newF,
          fiberGoal: newFib,
          waterGoal: newWater
        })
      });
      const json = await res.json();
      if (json.success && json.data) {
        setTotalGoal(json.data.totalGoal);
        setProteinGoal(json.data.proteinGoal);
        setCarbsGoal(json.data.carbsGoal);
        setFatsGoal(json.data.fatsGoal);
        setFiberGoal(json.data.fiberGoal);
        setWaterGoal(json.data.waterGoal);
        addToast("success", `Target set to ${newCal.toLocaleString()} kcal daily.`, "Goals Updated ✅");
      } else {
        addToast("error", "Could not save your goals. Please try again.", "Update Failed");
      }
    } catch (error) {
      console.error("Error updating goals:", error);
      addToast("error", "Could not connect to the server.", "Network Error");
    }
    setIsGoalModalOpen(false);
  };

  const adjustWater = async (amount) => {
    const newWater = Math.max(0, waterIntake + amount);
    // Optimistic UI update
    setWaterIntake(newWater);

    try {
      await fetch(`${BACKEND_URL}/goals?date=${selectedDate}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ waterIntake: newWater })
      });
    } catch (error) {
      console.error("Error adjusting water:", error);
      addToast("warning", "Water update failed to sync. It will retry next time.", "Sync Issue");
    }
  };

  const handleClearAllHistory = () => {
    setConfirmModal({
      isOpen: true,
      title: "Clear All History",
      message: "This will permanently delete all logged meals for this day. This action cannot be undone.",
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        try {
          const res = await fetch(`${BACKEND_URL}/meals?date=${selectedDate}`, {
            method: "DELETE"
          });
          const json = await res.json();
          if (json.success) {
            setMeals([]);
            addToast("success", "All meal entries have been cleared.", "History Cleared");
          } else {
            addToast("error", "Could not clear history. Please try again.", "Clear Failed");
          }
        } catch (error) {
          console.error("Error clearing meals:", error);
          addToast("error", "Could not connect to the server.", "Network Error");
        }
      },
    });
  };

  // --- Auth Gate ---
  const { isLoggedIn, isLoading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <main className="flex-grow pt-24 pb-section-gap px-gutter-desktop max-w-[1440px] mx-auto w-full flex items-center justify-center min-h-[50vh] bg-white dark:bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="font-label-md text-label-md text-secondary">Checking authentication...</span>
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="flex-grow pt-24 pb-section-gap px-gutter-desktop max-w-[1440px] mx-auto w-full flex items-center justify-center min-h-[60vh]">
        <div
          style={{
            maxWidth: "460px",
            width: "100%",
            textAlign: "center",
            padding: "48px 32px",
            borderRadius: "24px",
            background: "var(--color-surface-container-lowest, #ffffff)",
            border: "1px solid var(--color-separator, #e4e4e7)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.03)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {/* Lock Icon */}
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "20px",
              background: "rgba(0, 87, 191, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "36px",
                color: "var(--color-primary, #0057bf)",
                fontVariationSettings: "'FILL' 1",
              }}
            >
              lock
            </span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "var(--color-on-surface, #1a1b23)",
              margin: "0 0 8px",
              lineHeight: 1.3,
            }}
          >
            Please Login First
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "15px",
              color: "var(--color-secondary, #5f5e60)",
              lineHeight: 1.6,
              margin: "0 0 32px",
            }}
          >
            You need to be logged in to access your nutrition dashboard. Track your calories, macros, and water intake.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link
              to="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 28px",
                borderRadius: "999px",
                background: "var(--color-primary, #0057bf)",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(0, 87, 191, 0.25)",
                transition: "all 0.2s",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>login</span>
              Go to Login
            </Link>
            <Link
              to="/register"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 28px",
                borderRadius: "999px",
                background: "transparent",
                color: "var(--color-primary, #0057bf)",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
                border: "1.5px solid var(--color-separator, #e4e4e7)",
                transition: "all 0.2s",
              }}
            >
              Create Account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex-grow pt-24 pb-section-gap px-gutter-desktop max-w-[1440px] mx-auto w-full flex items-center justify-center min-h-[50vh] bg-white dark:bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="font-label-md text-label-md text-secondary">Loading your nutrition data...</span>
        </div>
      </main>
    );
  }

  return (
    <>
    {/* Toast Notification Container */}
    <ToastContainer toasts={toasts} removeToast={removeToast} />

    {/* Confirm Modal */}
    <ConfirmModal
      isOpen={confirmModal.isOpen}
      title={confirmModal.title}
      message={confirmModal.message}
      onConfirm={confirmModal.onConfirm}
      onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      confirmLabel="Clear All"
    />

    <style>{`
      @keyframes toast-in {
        0% { opacity: 0; transform: translateX(80px) scale(0.95); }
        100% { opacity: 1; transform: translateX(0) scale(1); }
      }
      @keyframes toast-out {
        0% { opacity: 1; transform: translateX(0) scale(1); }
        100% { opacity: 0; transform: translateX(80px) scale(0.95); }
      }
      @keyframes toast-progress {
        0% { width: 100%; }
        100% { width: 0%; }
      }
      @keyframes confirm-in {
        0% { opacity: 0; transform: scale(0.92); }
        100% { opacity: 1; transform: scale(1); }
      }
    `}</style>

    <div className="w-full bg-background text-on-surface flex flex-col flex-grow">
      <main className="flex-grow pt-7 pb-section-gap px-4 md:px-gutter-desktop max-w-[1310px] mx-auto w-full">
        {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-stack-lg">
        <div>
          <h1 className="font-display-lg text-display-lg text-on-surface font-bold text-4xl">Nutrition</h1>
          <div className="flex items-center gap-3 mt-1.5 text-secondary">
            <button
              onClick={() => changeDate(-1)}
              className="p-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-center cursor-pointer text-on-surface border border-separator"
              title="Previous Day"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <span className="font-body-lg text-body-lg font-medium text-on-surface min-w-[170px] text-center">
              {getFriendlyDateString(selectedDate)}
            </span>
            <button
              onClick={() => changeDate(1)}
              disabled={selectedDate === todayStr}
              className={`p-1 rounded-lg bg-surface-container-low transition-colors flex items-center justify-center border border-separator ${selectedDate === todayStr ? 'opacity-40 cursor-not-allowed text-secondary' : 'hover:bg-surface-container-high cursor-pointer text-on-surface'}`}
              title="Next Day"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
            {/* Direct date picker */}
            <div className="relative flex items-center">
              <input
                type="date"
                value={selectedDate}
                max={todayStr}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val && val <= todayStr) {
                    setSelectedDate(val);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button
                className="p-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-center cursor-pointer text-on-surface border border-separator"
                title="Select Date"
              >
                <span className="material-symbols-outlined text-lg">calendar_month</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-label-md flex items-center gap-2 hover:opacity-90 transition-all active:scale-95 cursor-pointer shadow-md shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Log Meal
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Calorie Buffer Section */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-8 glass-card border border-separator rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="relative w-64 h-64 flex-shrink-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle className="text-surface-dim stroke-current" cx="50" cy="50" fill="transparent" r={radius} strokeWidth={strokeWidth}></circle>
              <circle
                className="text-primary stroke-current progress-ring__circle"
                cx="50"
                cy="50"
                fill="transparent"
                r={radius}
                strokeLinecap="round"
                strokeWidth={strokeWidth}
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                }}
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-display-lg text-[32px] text-on-surface leading-none">
                {kcalLeft > 0 ? kcalLeft.toLocaleString() : 0}
              </span>
              <span className="font-caption-sm text-caption-sm text-secondary uppercase tracking-wider mt-1">kcal left</span>
            </div>
          </div>

          <div className="flex-grow space-y-6 w-full">
            <div className="space-y-1">
              <h2 className="font-heading-md text-heading-md text-on-surface">Daily Progress</h2>
              <p className="font-body-base text-body-base text-secondary">You are {Math.round(percentage)}% through your daily goal.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-xl">
                <span className="font-caption-sm text-caption-sm text-secondary block mb-1">Consumed</span>
                <span className="font-stat-lg text-stat-lg text-on-surface">
                  {consumed.toLocaleString()} <small className="text-sm font-normal text-secondary">kcal</small>
                </span>
              </div>
              
              <div
                onClick={() => setIsGoalModalOpen(true)}
                className="bg-surface-container-low hover:bg-surface-container-high p-4 rounded-xl cursor-pointer transition-colors group/card relative"
                title="Click to edit targets"
              >
                <span className="font-caption-sm text-caption-sm text-secondary block mb-1">Daily Goal</span>
                <span className="font-stat-lg text-stat-lg text-on-surface flex items-center gap-1.5">
                  {totalGoal.toLocaleString()} <small className="text-sm font-normal text-secondary">kcal</small>
                  <span className="material-symbols-outlined text-sm text-secondary opacity-0 group-hover/card:opacity-100 transition-opacity">edit</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-primary-muted rounded-xl text-primary">
              <span className="material-symbols-outlined">info</span>
              <p className="font-label-md text-label-md">Based on your activity today, your window for high-carb intake is open for another 2 hours.</p>
            </div>
          </div>
        </div>

        {/* Macro Breakdown Section */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-4 glass-card border border-separator rounded-3xl p-8 flex flex-col gap-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="font-heading-md text-heading-md text-on-surface">Macro Breakdown</h2>
            <button
              onClick={() => setIsGoalModalOpen(true)}
              className="text-primary hover:opacity-85 text-xs font-semibold cursor-pointer"
            >
              Adjust Goals
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Protein */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-label-md text-label-md text-on-surface">Protein</span>
                <span className="font-caption-sm text-caption-sm text-secondary">{proteinConsumed}g / {proteinGoal}g</span>
              </div>
              <div className="h-3 w-full bg-surface-dim rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${proteinPercentage}%` }}></div>
              </div>
            </div>
            
            {/* Carbs */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-label-md text-label-md text-on-surface">Carbs</span>
                <span className="font-caption-sm text-caption-sm text-secondary">{carbsConsumed}g / {carbsGoal}g</span>
              </div>
              <div className="h-3 w-full bg-surface-dim rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full opacity-70 transition-all duration-500" style={{ width: `${carbsPercentage}%` }}></div>
              </div>
            </div>
            
            {/* Fats */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-label-md text-label-md text-on-surface">Fats</span>
                <span className="font-caption-sm text-caption-sm text-secondary">{fatsConsumed}g / {fatsGoal}g</span>
              </div>
              <div className="h-3 w-full bg-surface-dim rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full opacity-50 transition-all duration-500" style={{ width: `${fatsPercentage}%` }}></div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-separator grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Water Intake Card */}
            <div className="bg-[#EAF3FF]/60 dark:bg-blue-950/20 border border-[#D5E8FF] dark:border-blue-900/30 p-4 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="flex justify-between items-center w-full">
                <div className="p-2 rounded-xl bg-[#0057bf]/10 text-[#0057bf] dark:text-blue-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => adjustWater(-100)}
                    disabled={waterIntake <= 0}
                    className="w-8 h-8 rounded-full bg-surface-container-lowest hover:bg-surface-container-high border border-[#D5E8FF] dark:border-blue-900/30 flex items-center justify-center text-[#0057bf] dark:text-blue-400 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-sm"
                    title="Remove 1 glass (100ml)"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">remove</span>
                  </button>
                  <button
                    onClick={() => adjustWater(100)}
                    className="w-8 h-8 rounded-full bg-[#0057bf] hover:opacity-90 flex items-center justify-center text-white cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-sm shadow-[#0057bf]/20"
                    title="Add 1 glass (100ml)"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">add</span>
                  </button>
                </div>
              </div>
              
              <div className="mt-4">
                <span className="block text-[11px] font-semibold text-secondary uppercase tracking-wider">Water Intake</span>
                <span className="block text-2xl text-on-surface font-bold mt-1">
                  {(waterIntake / 100).toFixed(0)} <span className="text-xs font-semibold text-secondary">/ {(waterGoal / 100).toFixed(0)} glasses</span>
                </span>
                <span className="block text-[10px] text-[#0057bf] dark:text-blue-400 font-semibold mt-1">({waterIntake} ml)</span>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-2 w-full bg-[#0057bf]/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#0057bf] rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(waterPercentage, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Fiber Card */}
            <div className="bg-[#FDF5EB]/60 dark:bg-orange-950/20 border border-[#F6E6D2] dark:border-orange-900/30 p-4 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="flex justify-between items-center w-full">
                <div className="p-2 rounded-xl bg-[#E67E22]/10 text-[#E67E22] dark:text-orange-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>grass</span>
                </div>
              </div>
              
              <div className="mt-4">
                <span className="block text-[11px] font-semibold text-secondary uppercase tracking-wider">Dietary Fiber</span>
                <span className="block text-2xl text-on-surface font-bold mt-1">
                  {fiberConsumed}g <span className="text-xs font-semibold text-secondary">/ {fiberGoal}g</span>
                </span>
                <span className="block text-[10px] text-[#E67E22] dark:text-orange-400 font-semibold mt-1">
                  {fiberConsumed >= fiberGoal ? 'Goal achieved!' : `${fiberGoal - fiberConsumed}g left`}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-2 w-full bg-[#E67E22]/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#E67E22] rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min((fiberConsumed / fiberGoal) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Fuel List */}
        <div className="col-span-12 glass-card border border-separator rounded-3xl overflow-hidden shadow-sm">
          <div className="p-8 border-b border-separator flex justify-between items-center">
            <h2 className="font-heading-md text-heading-md text-on-surface">Recent Fuel</h2>
            {meals.length > 0 && (
              <button
                onClick={handleClearAllHistory}
                className="text-error font-label-md text-label-md hover:underline cursor-pointer"
              >
                Clear All History
              </button>
            )}
          </div>
          
          <div>
            {meals.length === 0 ? (
              <div className="p-8 text-center text-secondary font-label-md">
                No food logged for this day. Start fueling your day by clicking "Log Meal".
              </div>
            ) : (
              <>
                {/* Mobile list view */}
                <div className="block md:hidden divide-y divide-separator">
                  {meals.map((meal) => (
                    <div key={meal._id} className="p-5 flex flex-col gap-3 hover:bg-surface-container-lowest transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-surface-dim overflow-hidden flex-shrink-0">
                          <img className="w-full h-full object-cover" alt={meal.name} src={meal.image} />
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="font-body-base text-body-base text-on-surface truncate font-semibold">{meal.name}</p>
                          <p className="font-caption-sm text-caption-sm text-secondary">{meal.time} • {meal.type} • {meal.category}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <div className="text-xs text-secondary">
                          <span className="font-semibold text-on-surface">{meal.protein}g</span> P / <span className="font-semibold text-on-surface">{meal.carbs}g</span> C / <span className="font-semibold text-on-surface">{meal.fats}g</span> F
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-stat-lg text-base text-primary font-bold">
                            {meal.calories} <span className="text-[10px] font-normal text-secondary">kcal</span>
                          </span>
                          <button
                            onClick={() => handleDeleteMeal(meal._id)}
                            className="text-error flex items-center justify-center p-2 rounded-lg bg-red-500/10 cursor-pointer"
                            title="Delete meal"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop table view */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-surface-container-low font-caption-sm text-caption-sm text-secondary">
                        <th className="px-8 py-4">Entry Name</th>
                        <th className="px-8 py-4">Time</th>
                        <th className="px-8 py-4 text-right">Macros (P/C/F)</th>
                        <th className="px-8 py-4 text-right">Energy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-separator">
                      {meals.map((meal) => (
                        <tr key={meal._id} className="hover:bg-surface-container-lowest transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-surface-dim overflow-hidden flex-shrink-0">
                                <img className="w-full h-full object-cover" alt={meal.name} src={meal.image} />
                              </div>
                              <div>
                                <p className="font-body-base text-body-base text-on-surface">{meal.name}</p>
                                <p className="font-caption-sm text-caption-sm text-secondary">{meal.type} • {meal.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 font-label-md text-label-md text-secondary">{meal.time}</td>
                          <td className="px-8 py-6 text-right font-label-md text-label-md text-secondary">
                            {meal.protein}g / {meal.carbs}g / {meal.fats}g
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-4">
                              <span className="font-stat-lg text-heading-md text-primary">
                                {meal.calories} <span className="text-xs font-normal text-secondary">kcal</span>
                              </span>
                              <button
                                onClick={() => handleDeleteMeal(meal._id)}
                                className="text-error hover:text-error/85 cursor-pointer flex items-center justify-center p-1 rounded-lg hover:bg-error-container/20 transition-all opacity-100 md:opacity-0 group-hover:opacity-100"
                                title="Delete meal"
                              >
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Log Meal Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-background rounded-3xl p-8 max-w-md w-full shadow-2xl border border-separator max-h-[90vh] overflow-y-auto transform scale-100 transition-all">
            <h3 className="font-heading-md text-heading-md text-on-surface mb-6">Log Meal Entry</h3>
            <form onSubmit={handleLogMeal} className="flex flex-col gap-4">
              <div>
                <label className="block font-label-md text-label-md text-secondary mb-1">
                  Meal Name
                </label>
                <input
                  type="text"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  placeholder="e.g. Grilled Chicken Quinoa Bowl"
                  className="w-full bg-surface-container-low border border-separator text-on-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-4 py-2.5 text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-md text-label-md text-secondary mb-1">
                    Brand / Source
                  </label>
                  <input
                    type="text"
                    value={mealCategory}
                    onChange={(e) => setMealCategory(e.target.value)}
                    placeholder="e.g. Whole Foods"
                    className="w-full bg-surface-container-low border border-separator text-on-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-secondary mb-1">
                    Meal Type
                  </label>
                  <select
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                    className="w-full bg-surface-container-low border border-separator text-on-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-3 py-2 text-sm"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-secondary mb-1">
                  Energy (kcal)
                </label>
                <input
                  type="number"
                  value={caloriesInput}
                  onChange={(e) => setCaloriesInput(e.target.value)}
                  placeholder="e.g. 520"
                  className="w-full bg-surface-container-low border border-separator text-on-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-4 py-2.5 text-sm"
                  required
                  min="0"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-caption-sm text-caption-sm text-secondary mb-1">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    value={proteinInput}
                    onChange={(e) => setProteinInput(e.target.value)}
                    placeholder="42"
                    className="w-full bg-surface-container-low border border-separator text-on-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-2.5 py-1.5 text-sm"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block font-caption-sm text-caption-sm text-secondary mb-1">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    value={carbsInput}
                    onChange={(e) => setCarbsInput(e.target.value)}
                    placeholder="38"
                    className="w-full bg-surface-container-low border border-separator text-on-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-2.5 py-1.5 text-sm"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block font-caption-sm text-caption-sm text-secondary mb-1">
                    Fats (g)
                  </label>
                  <input
                    type="number"
                    value={fatsInput}
                    onChange={(e) => setFatsInput(e.target.value)}
                    placeholder="12"
                    className="w-full bg-surface-container-low border border-separator text-on-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-2.5 py-1.5 text-sm"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label className="block font-caption-sm text-caption-sm text-secondary mb-1">
                  Fiber (g)
                </label>
                <input
                  type="number"
                  value={fiberInput}
                  onChange={(e) => setFiberInput(e.target.value)}
                  placeholder="6"
                  className="w-full bg-surface-container-low border border-separator text-on-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-3 py-2 text-sm"
                  min="0"
                />
              </div>
              <div className="flex gap-3 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-secondary hover:bg-surface-container-high transition-colors font-semibold text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-on-primary transition-colors font-semibold text-sm cursor-pointer"
                >
                  Log Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Goal Modal */}
      {isGoalModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-background rounded-3xl p-8 max-w-md w-full shadow-2xl border border-separator max-h-[90vh] overflow-y-auto transform scale-100 transition-all">
            <h3 className="font-heading-md text-heading-md text-on-surface mb-6">Update Nutrition Goals</h3>
            <form onSubmit={handleUpdateGoals} className="flex flex-col gap-4">
              <div>
                <label className="block font-label-md text-label-md text-secondary mb-1">
                  Daily Calorie Goal (kcal)
                </label>
                <input
                  type="number"
                  name="calInput"
                  defaultValue={totalGoal}
                  className="w-full bg-surface-container-low border border-separator text-on-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-4 py-2.5 text-sm"
                  required
                  min="500"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-caption-sm text-caption-sm text-secondary mb-1">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    name="pInput"
                    defaultValue={proteinGoal}
                    className="w-full bg-surface-container-low border border-separator text-on-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-3 py-2 text-sm"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block font-caption-sm text-caption-sm text-secondary mb-1">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    name="cInput"
                    defaultValue={carbsGoal}
                    className="w-full bg-surface-container-low border border-separator text-on-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-3 py-2 text-sm"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block font-caption-sm text-caption-sm text-secondary mb-1">
                    Fats (g)
                  </label>
                  <input
                    type="number"
                    name="fInput"
                    defaultValue={fatsGoal}
                    className="w-full bg-surface-container-low border border-separator text-on-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-3 py-2 text-sm"
                    required
                    min="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-caption-sm text-caption-sm text-secondary mb-1">
                    Fiber (g)
                  </label>
                  <input
                    type="number"
                    name="fibInput"
                    defaultValue={fiberGoal}
                    className="w-full bg-surface-container-low border border-separator text-on-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-3 py-2 text-sm"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block font-caption-sm text-caption-sm text-secondary mb-1">
                    Water Goal (glasses)
                  </label>
                  <input
                    type="number"
                    name="waterInput"
                    defaultValue={waterGoal / 100}
                    className="w-full bg-surface-container-low border border-separator text-on-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-3 py-2 text-sm"
                    required
                    min="1"
                  />
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsGoalModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-secondary hover:bg-surface-container-high transition-colors font-semibold text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-on-primary transition-colors font-semibold text-sm cursor-pointer"
                >
                  Save Goals
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
    </div>
    </>
  );
}

export default Nutrition;
