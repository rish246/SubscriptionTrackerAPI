import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";
import { transporter } from "../config/nodemailer.js";
export const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);
    if (!subscription || subscription.status !== "active") return;
    const renewalDate = dayjs(subscription.renewalDate);
    if (renewalDate.isBefore(dayjs())) {
        return;
    }
    const REMINDER = [7, 5, 2, 1];
    for (let daysBeforeDate of REMINDER) {
        const reminderDate = renewalDate.subtract(daysBeforeDate, "day");
        if (reminderDate.isAfter(dayjs())) {
            console.log(`Reminder ${REMINDER} days before ${renewalDate}`);
            await context.sleepUntil("Sending email", reminderDate.toDate()); // it will keep sleeping now
        }
        await triggerEmail(context, renewalDate.toDate(), subscription);
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run("get sub", async () => {
        return await Subscription.findById(subscriptionId).populate(
            "user",
            "name email"
        );
    });
};

const triggerEmail = async (context, date, subscription) => {
    await context.run("Sending email", async () => {
        await transporter.sendMail({
            to: subscription.user.email,
            html: `<div>Subscription ending: ${date}</div>`,
            subject: "Subscription reminder",
        });
    });
};

// get subscription

// then get its renewal date

// if renewal_date.hasPassed() stop();

// const REMINDER=[7, 5, 2, 1]
/*
    .run(send_notification, () => {
        await sleep();
        await sendNotification();
    })
 */
