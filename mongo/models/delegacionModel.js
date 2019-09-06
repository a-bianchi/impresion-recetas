import mongoose from 'mongoose';

const { Schema } = mongoose;

const delegacionSchema = new Schema({
  region: {
    type: Number,
    index: true,
    unique: true,
    required: true
  },
  delegation: {
    type: Number,
    index: true,
    unique: true,
    required: true
  },
  time: { type: Date, default: Date.now, required: true }
});

export default mongoose.model('Delegacion', delegacionSchema);
