import express from 'express';
import { body } from 'express-validator';
import validate from '../middlewares/validate.js';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post(
  '/register',
  validate([
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 8 })
  ]),
  register
);

//This sets up the /register route, which users call to sign up.
//	validate([...]): checks that:
//	name is provided (notEmpty)
//	email is a real email
//	password is at least 8 characters
//	If all good, it runs register from the controller


router.post(
  '/login',
  validate([
    body('email').isEmail(),
    body('password').exists()
  ]),
  login
);

//This sets up the /login route for when users try to sign in.
//  Validates that:
//  email exists and is valid
//  password exists
// Then runs the login function from the controller


export default router; //makes this set of routes available in my main app , do i need to link it to index.js


