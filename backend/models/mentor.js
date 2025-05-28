import mongoose from 'mongoose';

const MentorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  industry: String,
  expertise: [String],
  yearsExperience: Number,
  bio: String,
  profilePicUrl: String,
  availability: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Mentor", MentorSchema);