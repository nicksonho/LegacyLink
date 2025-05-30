import Notification from '../models/notification.js';

// Get notifications for a user
export async function getNotifications(req, res) {
  const notifications = await Notification.find({ userId: req.user.id })
    .sort({ createdAt: -1 });
  res.json(notifications);
}

// Mark one notification as read
export async function markNotificationAsRead(req, res) {
  const { id } = req.params;
  const notification = await Notification.findById(id);

  if (!notification) return res.status(404).json({ message: 'Notification not found' });
  if (notification.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized to update this notification' });
  }

  notification.isRead = true;
  await notification.save();
  res.json({ message: 'Marked as read' });
}