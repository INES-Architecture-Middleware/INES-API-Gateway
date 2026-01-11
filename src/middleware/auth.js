const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const SECRET_KEY = process.env.JWT_SECRET || "fallback-secret-token-for-dev";

  const token = req.header("Authorization")?.split(" ")[1];

  if (token) {
    jwt.verify(token, SECRET_KEY, async (error, user) => {
      if (!user || error) {
        return res.sendStatus(403);
      }

      req.user = user.id
      next()
    });
  } else {
    res.sendStatus(401);
  }
}

const requestDetails = (req, res, next) => {
  const today = new Date()
  console.log(req.method + ' - ' + req.url + ' - ' + today.toLocaleString())
  next()
}

module.exports = { authenticateJWT, requestDetails }
