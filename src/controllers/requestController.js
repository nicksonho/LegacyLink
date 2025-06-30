import Request from '../models/request.js';

// student swipes right (sends request)
export async function sendRequest(req, res) {
  const { receiverId, message } = req.body;
  const existing = await Request.findOne({ sender: req.user._id, receiver: receiverId });
  if (existing) return res.status(409).json({ error: 'Request already sent' });

  const newRequest = await Request.create({
    sender: req.user._id,
    receiver: receiverId,
    message,
  });

  res.status(201).json(newRequest);
}

// mentor views incoming requests
export async function getIncomingRequests(req, res) {
  const requests = await Request.find({ receiver: req.user._id })
    .populate('sender', 'name bio profilePicUrl course yearOfStudy');
  res.json(requests);
}

// mentor accepts or rejects
export async function respondToRequest(req, res) {
  const { id } = req.params;
  const { action } = req.body; // 'accepted' or 'rejected'

  const request = await Request.findById(id);
  if (!request || request.receiver.toString() !== req.user._id.toString()) {
    return res.status(404).json({ error: 'Request not found or unauthorized' });
  }

  request.status = action;
  await request.save();
  res.json(request);
}