import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRoutes = Router();

userRoutes.get("/", authorize, getUsers);

userRoutes.get("/:id", getUser);

userRoutes.post("/", (req, res) => res.send({ title: "CREATE USER" }));

userRoutes.put("/:id", authorize, updateUser);

userRoutes.delete("/:id", authorize, deleteUser);

export default userRoutes;
