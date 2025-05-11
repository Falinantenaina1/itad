import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", (req, res) => res.send({ title: "GET ALL USERS" }));

userRoutes.get("/:id", (req, res) => res.send({ title: "GET USER DETAIL" }));

userRoutes.post("/", (req, res) => res.send({ title: "CREATE USER" }));

userRoutes.put("/:id", (req, res) => res.send({ title: "UPDATE USER" }));

userRoutes.delete("/:id", (req, res) => res.send({ title: "DELETE USER" }));

export default userRoutes;
