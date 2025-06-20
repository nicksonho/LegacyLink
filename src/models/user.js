import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  yearOfStudy: Number,
  course: String,
  interests: [String],
  bio: String,
  profilePicUrl: String,
  role: { type: String, enum: ['student','mentor'], default: 'student' }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);