import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  yearOfStudy: Number,
  course: String,
  interests: [String],
  bio: String,
  profilePicUrl: String,
  role: { type: String, default: 'student' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);