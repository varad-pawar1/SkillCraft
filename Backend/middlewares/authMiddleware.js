import jwt from "jsonwebtoken";

const jwtPassword = process.env.JWT_LOGIN;

export const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    console.error("Token not provided");
    return res.status(401).json({
      msg: "Unauthorized access",
    });
  }

  try {
    const decoded = jwt.verify(token, jwtPassword);  // Correctly using the environment variable
    res.locals = decoded;
    console.log(res.locals);
    next();
  } catch (e) {
    console.error("Wrong token", e);
    res.status(401).json({
      msg: "Unauthorized access",
    });
  }
};
