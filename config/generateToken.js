import jwt from "jsonwebtoken";
export const generateToken = async (userId, role, res) => {
  const token = jwt.sign(
    { userId: userId, role: role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
};
