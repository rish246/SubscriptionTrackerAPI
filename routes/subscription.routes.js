import { Router } from "express";
import {
    createSubscription,
    getAllSubscriptions,
    getSubscriptionWithId,
} from "../controllers/subscription.controller.js";
import { authorize } from "../middlewares/authorization.middleware.js";
const router = Router();

// Based on a table: Subscription
// All the subscriptions of the logged in user
router.get("/", authorize, getAllSubscriptions);

router.get("/:id/", authorize, getSubscriptionWithId);

router.post("/", authorize, createSubscription);

router.put("/:id", (req, res) =>
    res.json({ message: "UPDATE subscription with id" })
);

router.delete("/:id", (req, res) =>
    res.json({ message: "DELETE subscription with id" })
);

router.get("/user/:id", (req, res) =>
    res.json({ message: "GET Subscriptions of user with id" })
);

router.put("/:id/cancel", (req, res) =>
    res.json({ message: "CANCEL subscription" })
);

router.get("/upcoming-renewals", (req, res) =>
    res.json({ message: "GET all upcoming renewals" })
);

export default router;
