import jwt from "jsonwebtoken";

const jwtPassword = process.env.JWT_LOGIN;

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Check if the Authorization header exists
  if (!authHeader) {
    console.error("Authorization header not provided");
    return res.status(401).json({
      msg: "Unauthorized access. No Authorization header provided.",
    });
  }

  // If the key is sent without "Bearer ", directly use it
  const token = authHeader.includes("Bearer")
    ? authHeader.split(" ")[1] // Extract token if 'Bearer <token>' format
    : authHeader; // Directly use if no 'Bearer ' prefix

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, jwtPassword);

    // Attach admin ID to response locals
    res.locals.adminId = decoded.id;
    // console.log("Admin ID:", res.locals.adminId);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Invalid token:", error.message);
    res.status(401).json({
      msg: "Unauthorized access. Invalid token.",
    });
  }
};
