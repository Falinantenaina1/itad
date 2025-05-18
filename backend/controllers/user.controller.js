import User from "../models/user.model.js";

const handleError = (res, error, status = 500) => {
  console.error(error);
  res
    .status(status)
    .json({ success: false, error: error.message || "Internal Server Error" });
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    handleError(res, error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    const { password, ...updateFields } = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};
