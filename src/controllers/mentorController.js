import Mentor from '../../backend/models/mentor.js';

export async function getAllMentors(req, res) {
  const mentors = await Mentor.find().select('-passwordHash');
  res.json(mentors);
}

export async function getMentorById(req, res) {
  const mentor = await Mentor.findById(req.params.id).select('-passwordHash');
  if (!mentor) return res.status(404).json({ message: 'Mentor not found' });
  res.json(mentor);
}

export async function createMentor(req, res) {
  const { name, email, industry, expertise, yearsExperience, bio, profilePicUrl, availability } = req.body;

  if (await Mentor.findOne({ email })) {
    return res.status(409).json({ message: 'Email already used for mentor profile' });
  }

  const mentor = await Mentor.create({
    name,
    email,
    passwordHash: '', // optional, or reuse User’s hashed password
    industry,
    expertise,
    yearsExperience,
    bio,
    profilePicUrl,
    availability
  });

  res.status(201).json(mentor);
}

export async function updateMentor(req, res) {
  const updates = req.body;
  const mentor = await Mentor.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-passwordHash');
  if (!mentor) return res.status(404).json({ message: 'Mentor not found' });
  res.json(mentor);
}