import { User } from '../models/user.models.js';
import { Meal } from '../models/nutrition.models.js';
import { Item } from '../models/items.models.js';

export const getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments({});
    const mealCount = await Meal.countDocuments({});
    
    let itemCount = 0;
    try {
      itemCount = await Item.countDocuments({});
    } catch (e) {
      console.warn("Failed to count items:", e);
    }

    res.status(200).json({
      success: true,
      data: {
        activeUsers: userCount,
        workoutsLogged: mealCount + itemCount,
        appStoreRating: 4.9
      }
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics.'
    });
  }
};
