import User from "../models//user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res.status(400).json({ success: false, error: error.message });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (id !== req.user.id && req.user.role !== "admin")
      return res.status(401).json({ success: false, error: "Unauthorized" });
    const updatedUser = await User.findByIdAndUpdate(id, { ...req.body });
    if (!updateUser)
      return res
        .status(401)
        .json({ success: false, error: "Can't update the user" });
    const user = await User.findById(id).select("-password");
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (id !== req.user.id && req.user.role !== "admin")
      return res.status(401).json({ success: false, error: "Unauthorized" });
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return res
        .status(400)
        .json({ success: false, error: "An error occurred" });
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
