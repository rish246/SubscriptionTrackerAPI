import { Client as WorkflowClient } from "@upstash/workflow";
import { QSTASH_URL, QSTASH_TOKEN } from "./config.js";

const workflowClient = new WorkflowClient({
    token: QSTASH_TOKEN,
    url: QSTASH_URL,
});

export default workflowClient;
