import { NutritionGoal, Meal, WaterLog } from '../models/nutrition.models.js';
import mongoose from 'mongoose';

const STATIC_USER_ID = new mongoose.Types.ObjectId('60d5ec49f83ca32578d61111');

// --- Goals & Water Controllers ---

export const getGoals = async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = date || new Date().toISOString().split('T')[0];

    let goal = await NutritionGoal.findOne({ userId: STATIC_USER_ID });
    if (!goal) {
      // Create default goal if not exists
      goal = await NutritionGoal.create({ userId: STATIC_USER_ID });
    }

    // Get date-specific water intake
    const waterLog = await WaterLog.findOne({ userId: STATIC_USER_ID, date: targetDate });
    const currentWaterIntake = waterLog ? waterLog.amount : 0;

    const responseData = {
      ...goal.toObject(),
      waterIntake: currentWaterIntake
    };

    return res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateGoals = async (req, res) => {
  try {
    const { totalGoal, proteinGoal, carbsGoal, fatsGoal, fiberGoal, waterGoal, waterIntake } = req.body;
    const { date } = req.query;
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    let goal = await NutritionGoal.findOne({ userId: STATIC_USER_ID });
    if (!goal) {
      goal = new NutritionGoal({ userId: STATIC_USER_ID });
    }

    if (totalGoal !== undefined) goal.totalGoal = totalGoal;
    if (proteinGoal !== undefined) goal.proteinGoal = proteinGoal;
    if (carbsGoal !== undefined) goal.carbsGoal = carbsGoal;
    if (fatsGoal !== undefined) goal.fatsGoal = fatsGoal;
    if (fiberGoal !== undefined) goal.fiberGoal = fiberGoal;
    if (waterGoal !== undefined) goal.waterGoal = waterGoal;

    await goal.save();

    let currentWaterIntake = 0;
    if (waterIntake !== undefined) {
      const updatedWater = Math.max(0, waterIntake);
      const waterLog = await WaterLog.findOneAndUpdate(
        { userId: STATIC_USER_ID, date: targetDate },
        { amount: updatedWater },
        { upsert: true, new: true }
      );
      currentWaterIntake = waterLog.amount;
    } else {
      const waterLog = await WaterLog.findOne({ userId: STATIC_USER_ID, date: targetDate });
      currentWaterIntake = waterLog ? waterLog.amount : 0;
    }

    const responseData = {
      ...goal.toObject(),
      waterIntake: currentWaterIntake
    };

    return res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// --- Meals Controllers ---

export const getMeals = async (req, res) => {
  try {
    const { date } = req.query;
    const filter = { userId: STATIC_USER_ID };

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      filter.$or = [
        { date: date },
        {
          $and: [
            { date: { $exists: false } },
            { createdAt: { $gte: startOfDay, $lte: endOfDay } }
          ]
        }
      ];
    }

    const meals = await Meal.find(filter).sort({ createdAt: 1 });
    return res.status(200).json({ success: true, data: meals });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addMeal = async (req, res) => {
  try {
    const { name, category, type, time, protein, carbs, fats, fiber, calories, image, date } = req.body;
    
    if (!name) {
      return res.status(400).json({ success: false, message: 'Meal name is required.' });
    }

    const targetDate = date || new Date().toISOString().split('T')[0];

    const meal = await Meal.create({
      userId: STATIC_USER_ID,
      name,
      category,
      type,
      time,
      protein: protein || 0,
      carbs: carbs || 0,
      fats: fats || 0,
      fiber: fiber || 0,
      calories: calories || 0,
      image,
      date: targetDate
    });

    return res.status(201).json({ success: true, data: meal });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Meal.deleteOne({ _id: id, userId: STATIC_USER_ID });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Meal not found.' });
    }

    return res.status(200).json({ success: true, message: 'Meal deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const clearMeals = async (req, res) => {
  try {
    const { date } = req.query;
    const filter = { userId: STATIC_USER_ID };

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      filter.$or = [
        { date: date },
        {
          $and: [
            { date: { $exists: false } },
            { createdAt: { $gte: startOfDay, $lte: endOfDay } }
          ]
        }
      ];
    }

    await Meal.deleteMany(filter);
    return res.status(200).json({ success: true, message: 'Meals cleared successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
