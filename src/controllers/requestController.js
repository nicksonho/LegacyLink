import Request from '../models/request.js';
import User from '../models/user.js';

// STUDENT: Create a mentorship request
export async function createRequest(req, res) {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Only students can create requests' });
  }

  const { mentorId, message } = req.body;

  try {
    const newRequest = await Request.create({
      studentId: req.user.id,
      mentorId,
      message
    });

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ message: 'Error creating request', error: err.message });
  }
}

// STUDENT: View their own requests
export async function getMyRequests(req, res) {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Only students can view their requests' });
  }

  const requests = await Request.find({ studentId: req.user.id });
  res.json(requests);
}

// MENTOR: Accept or reject a request
export async function updateRequestStatus(req, res) {
  if (req.user.role !== 'mentor') {
    return res.status(403).json({ message: 'Only mentors can update requests' });
  }

  const { status } = req.body;
  const request = await Request.findById(req.params.id);
  if (!request) return res.status(404).json({ message: 'Request not found' });

  if (request.mentorId.toString() !== req.user.id) {
    return res.status(403).json({ message: 'You can only modify your own requests' });
  }

  request.status = status;
  await request.save();
  res.json({ message: `Request ${status}` });
}