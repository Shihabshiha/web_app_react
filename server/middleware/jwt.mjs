import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

// Generate a secure secret key
const secretKey = randomBytes(32).toString('hex');

// Middleware function to verify JWT token
export const verifyJwt = (req, res, next) => {
  const token = req.headers.authorization;
  console.log('tokeennnnn',token);
  if (!token) {
    console.log('no token provided');
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      }
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

// Function to generate JWT access token
export const generateAccessToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
    return token;
  } catch (err) {
    console.error('Error generating access token:', err);
    throw new Error('Error generating access token');
  }
};

export default secretKey;
