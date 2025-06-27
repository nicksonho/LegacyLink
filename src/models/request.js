import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },     // student
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },   // mentor
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  message: String,
}, { timestamps: true });

export default mongoose.models.Request || mongoose.model('Request', requestSchema);