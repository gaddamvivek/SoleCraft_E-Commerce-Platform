// generateSecret.js

const crypto = require('crypto');

// Generate a secure random string of 64 bytes, then convert it to a hexadecimal string
const secretKey = crypto.randomBytes(64).toString('hex');

// Log the key to the console so you can copy it
console.log('Generated JWT Secret Key:', secretKey);

