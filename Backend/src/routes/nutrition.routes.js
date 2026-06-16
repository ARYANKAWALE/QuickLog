import { Router } from 'express';
import {
  getGoals,
  updateGoals,
  getMeals,
  addMeal,
  deleteMeal,
  clearMeals
} from '../controllers/nutrition.controllers.js';

const router = Router();

router.route('/goals')
  .get(getGoals)
  .post(updateGoals);

router.route('/meals')
  .get(getMeals)
  .post(addMeal)
  .delete(clearMeals);

router.route('/meals/:id')
  .delete(deleteMeal);

export default router;
