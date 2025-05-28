import '../db.js'; 
import User from '../models/user.js'; 

console.log(" Starting user seed...");

const user = new User({
  name: "Declan",
  email: "declan@smu.edu.sg",
  passwordHash: "hashedPassword123",
  yearOfStudy: 1,
  course: "Information Systems",
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