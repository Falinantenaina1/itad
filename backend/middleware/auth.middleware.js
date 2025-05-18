import jwt from "jsonwebtoken";
const authorize = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const { userId, role } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: userId, role };
    next();
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

export default authorize;
