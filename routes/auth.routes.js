import { Router } from "express";
import { login, signOut, signUp } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signUp);

router.post("/login", login);

router.post("/signout", signOut);

export default router;
