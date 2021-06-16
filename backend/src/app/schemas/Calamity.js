import mongoose from 'mongoose';

const CalamitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Calamity', CalamitySchema);
