import dayjs from "dayjs";
import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Email is required"],
        minLength: 2,
        maxLength: 100,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be greater than 0"],
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "INR"],
        default: "USD",
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
        type: String,
        enum: [
            "sports",
            "news",
            "lifestyle",
            "entertainment",
            "technology",
            "finance",
            "politics",
            "others",
        ],
        required: [true, "Category is required"],
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "canceled", "expired"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (date) => date < new Date(),
            message: "Start date must be in the past",
        },
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (date) {
                return date > this.startDate;
            },
            message: "Start date must be in the past",
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
});

SubscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
        const daysForRenewal = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        const startDate = dayjs(this.startDate);
        const renewalDate = startDate.add(
            daysForRenewal[this.frequency],
            "day"
        );
        this.renewalDate = renewalDate.toDate();
    }
    if (dayjs(this.renewalDate).isBefore(dayjs())) {
        this.status = "expired";
    }

    next();
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);
export default Subscription;
