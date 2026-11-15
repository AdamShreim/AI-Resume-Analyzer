const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: "No token" });
  }

  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch(error) {
    res.status(401).json({ error: "Invalid token" });
    console.error("JWT Error:", error.message);
  }
};

module.exports = authMiddleware;
