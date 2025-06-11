import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // Clerk user ID
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    yearOfStudy: { type: Number },
    course: { type: String, trim: true },
    interests: { type: [String], default: [] },
    bio: { type: String, trim: true },
    profilePicUrl: { type: String },
    role: { type: String, enum: ['student', 'mentor', 'admin'], default: 'student' },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Use existing model if already compiled (prevents overwrite errors in dev)
export default mongoose.models.User || mongoose.model('User', UserSchema);