import mongoose from 'mongoose';

const waterLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: () => new mongoose.Types.ObjectId('60d5ec49f83ca32578d61111') // Default static user ID for local mode
    },
    date: {
      type: String, // 'YYYY-MM-DD'
      required: true
    },
    amount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Compound index to ensure uniqueness per user per date
waterLogSchema.index({ userId: 1, date: 1 }, { unique: true });

export const WaterLog = mongoose.model('WaterLog', waterLogSchema);
