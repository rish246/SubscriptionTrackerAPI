import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import { authorize } from "../middlewares/authorization.middleware.js";
const router = Router();

router.get("/", getUsers);

router.get("/:id", authorize, getUser);

router.put("/:id", (req, res) => res.json({ message: "UPDATE user with id" }));

router.delete("/:id", (req, res) =>
    res.json({ message: "DELETE user with id" })
);

router.post("/", (req, res) => res.json({ message: "CREATE a new user" }));

export default router;
