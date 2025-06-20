import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "fallback-secret-token-for-dev";

export function authenticateJWT(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (token) {
    console.log(token);
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
