import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  message: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

export default mongoose.model("Request", RequestSchema);