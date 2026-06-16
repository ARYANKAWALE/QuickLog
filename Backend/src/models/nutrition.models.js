import mongoose from 'mongoose';

const nutritionGoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: () => new mongoose.Types.ObjectId('60d5ec49f83ca32578d61111') // Default static user ID for local mode
    },
    totalGoal: {
      type: Number,
      default: 2600
    },
    proteinGoal: {
      type: Number,
      default: 180
    },
    carbsGoal: {
      type: Number,
      default: 320
    },
    fatsGoal: {
      type: Number,
      default: 85
    },
    fiberGoal: {
      type: Number,
      default: 30
    },
    waterGoal: {
      type: Number,
      default: 2500
    },
    waterIntake: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const mealSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: () => new mongoose.Types.ObjectId('60d5ec49f83ca32578d61111') // Default static user ID for local mode
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      default: 'Generic',
      trim: true
    },
    type: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
      default: 'Snack'
    },
    time: {
      type: String
    },
    protein: {
      type: Number,
      default: 0
    },
    carbs: {
      type: Number,
      default: 0
    },
    fats: {
      type: Number,
      default: 0
    },
    fiber: {
      type: Number,
      default: 0
    },
    calories: {
      type: Number,
      default: 0
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=60'
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0]
    }
  },
  { timestamps: true }
);

export const NutritionGoal = mongoose.model('NutritionGoal', nutritionGoalSchema);
export const Meal = mongoose.model('Meal', mealSchema);
export { WaterLog } from './waterLog.models.js';

