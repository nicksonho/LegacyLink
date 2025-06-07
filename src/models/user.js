import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // Clerk user ID
  name: String,
  email: { type: String, unique: true },
  yearOfStudy: Number,
  course: String,
  interests: [String],
  bio: String,
  profilePicUrl: String,
  role: { type: String, default: 'student' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);