import User from '../models/user.js';
import { getEmbedding, cosineSimilarity } from '../utils/matchHelpers.js';

export async function getMatches(req, res) {
  try {
    console.log('🔍 Matching triggered');

    const user = await User.findById(req.user._id);
    console.log('✅ Requesting user found:', {
      name: user?.name,
      role: user?.role,
      bio: user?.bio,
      interests: user?.interests,
    });

    if (!user || user.role !== 'student') {
      console.log('🚫 User not authorized for matching.');
      return res.status(403).json({ error: 'Only students can view mentor matches.' });
    }

    const menteeText = `${user.bio || ''} ${(user.interests || []).join(' ')}`;
    const menteeVec = await getEmbedding(menteeText);
    console.log('✅ Mentee embedding sample:', menteeVec?.slice(0, 5));

    const mentors = await User.find({ role: 'mentor' });
    console.log(`✅ Found ${mentors.length} mentors`);

    const results = [];

    for (const mentor of mentors) {
      const mentorText = `${mentor.bio || ''} ${(mentor.interests || []).join(' ')}`;
      const mentorVec = await getEmbedding(mentorText);
      console.log(`🔹 Mentor: ${mentor.name} embedding sample:`, mentorVec?.slice(0, 5));

      const score = cosineSimilarity(menteeVec, mentorVec);
      console.log(`🔸 Similarity score with ${mentor.name}:`, score);

      results.push({
        _id: mentor._id,
        name: mentor.name,
        bio: mentor.bio,
        interests: mentor.interests,
        profilePicUrl: mentor.profilePicUrl,
        score,
      });
    }

    console.log('✅ Final results prepared:', results);

    res.json(results.sort((a, b) => b.score - a.score).slice(0, 10)); // top 10

  } catch (err) {
    console.error('❌ getMatches error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}