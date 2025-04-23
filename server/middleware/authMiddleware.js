const admin = require('firebase-admin');

// load firebase account key
const serviceAccount = require("../config/firebase-service-account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const authenticate = async (req, res, next) => {
    // Check if the request has an authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Expecting Bearer <token>

    // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: "Unauthorized – No token provided" });
  }

  try {
    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // attach user info to request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden – Invalid token" });
  }
};

module.exports = authenticate;