import jwt from 'jsonwebtoken';

export function generateToken(id, role) {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}