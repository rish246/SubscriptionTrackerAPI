import { PORT, SERVER_ADDRESS } from "../config/config.js";
import workflowClient from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const newSubscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_ADDRESS}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: newSubscription._id.toString(),
            },
            headers: {
                "content-type": "application/json",
            },
            retries: 0,
        });
        res.status(201).json({
            success: true,
            data: {
                subscription: newSubscription,
                workflowRunId,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const user = req.user._id;
        const allRequests = await Subscription.find({ user });
        res.status(201).json({ success: true, data: allRequests });
    } catch (err) {
        next(err);
    }
};

export const getSubscriptionWithId = async (req, res, next) => {
    try {
        const user = req.user._id;
        const subscriptionId = req.params.id;
        const subscription = await Subscription.findById(subscriptionId);
        if (subscription.user.toString() !== user.toString()) {
            const error = new Error("Unauthorized access");
            error.statusCode = 403;
            throw error;
        }
        res.status(200).json({ success: true, data: subscription });
    } catch (err) {
        next(err);
    }
};
