import crypto from 'crypto';

// Generate a random JWT secret key
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log(jwtSecret);
console.log("JWT_SECRET:", process.env.JWT_SECRET);