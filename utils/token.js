const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    user: {
      id: user.user_id,
      username: user.username,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const extractTokenFromHeader = (authHeader) => {
  if (!authHeader) throw new Error("No authorization header provided");
  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("No token provided");
  return token;
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      throw new Error("Invalid or expired token");
    }
    throw error;
  }
};

module.exports = { generateToken, extractTokenFromHeader, verifyToken };
