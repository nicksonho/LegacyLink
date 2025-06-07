import express from 'express';
import { body } from 'express-validator';
import validate from '../middlewares/validate.js';
import { register, login } from '../controllers/authController.js';
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/clerk-sdk-node';
import User from '../models/user.js';

const router = express.Router();


// Webhook handler for Clerk events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env');
  }

  try {
    const svix_id = req.headers['svix-id'];
    const svix_timestamp = req.headers['svix-timestamp'];
    const svix_signature = req.headers['svix-signature'];

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({ message: 'Missing svix headers' });
    }

    const webhook = new Webhook(WEBHOOK_SECRET);
    const evt = webhook.verify(JSON.stringify(req.body), {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });

    const event = evt.data;

    // Handle different webhook events
    switch (event.type) {
      case 'user.created':
        // Create user in our database
        await User.create({
          clerkId: event.data.id,
          email: event.data.email_addresses[0].email_address,
          name: `${event.data.first_name} ${event.data.last_name}`,
        });
        break;

      case 'user.updated':
        // Update user in our database
        await User.findOneAndUpdate(
          { clerkId: event.data.id },
          {
            email: event.data.email_addresses[0].email_address,
            name: `${event.data.first_name} ${event.data.last_name}`,
          }
        );
        break;

      case 'user.deleted':
        // Delete user from our database
        await User.findOneAndDelete({ clerkId: event.data.id });
        break;
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(400).json({ message: 'Webhook error' });
  }
});

export default router; //makes this set of routes available in my main app , do i need to link it to index.js


