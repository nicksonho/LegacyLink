import '../db.js'; 
import User from '../../src/models/user.js'; 

console.log("🌐 Using DB URI:", process.env.MONGODB_URI);
console.log("🚀 Starting user seed...");

const user = new User({
  name: "Glenn",
  email: "Glenn@nus.edu.sg",
  passwordHash: "hashedPassword123",
  yearOfStudy: 1,
  course: "Machine Learning",
  interests: ["startups", "tech", "AI"],
  bio: "Curious and passionate about innovation.",
  profilePicUrl: "https://link.to/pic.jpg"
});

user.save()
  .then(() => {
    console.log("✅ User saved");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error saving user:", err);
    process.exit(1);
  });