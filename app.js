import express from "express";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/users.routes.js";
import subscriptionsRouter from "./routes/subscription.routes.js";
import workflowRouter from "./routes/workflow.routes.js";
import { PORT } from "./config/config.js";
import { connectDb } from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import { arcjetMiddleware } from "./middlewares/arcjet.middleware.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

// if (NODE_ENV === "production") {
// }
// app.use(arcjetMiddleware);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionsRouter);
app.use("/api/v1/workflows", workflowRouter);
app.use(errorMiddleware);
app.get("/", (req, res) => {
    res.json({ message: "Hello world" });
});

app.listen(PORT, async () => {
    console.log("Listening on port: " + PORT);
    await connectDb();
});

export default app;
