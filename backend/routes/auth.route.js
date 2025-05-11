import { Router } from "express";
import { SignIn, SignOut, SignUp } from "../controllers/auth.controller.js";
import authorize from "../middleware/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/signup", SignUp);

authRoutes.post("/signin", SignIn);

authRoutes.post("/logout", authorize, SignOut);

export default authRoutes;
