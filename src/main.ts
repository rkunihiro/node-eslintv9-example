import { randomUUID } from "node:crypto";

import { fastify } from "fastify";
import { pino } from "pino";

export const logger = pino({
    formatters: {
        level(label) {
            return { level: label };
        },
        bindings(): object {
            return {};
        },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    messageKey: "message",
});

const server = fastify({
    loggerInstance: logger,
    genReqId() {
        return randomUUID();
    },
});
server.get("/", {}, async (_request, reply) => {
    reply.send({ message: "Hello, world!" });
});

await server.listen({
    host: "0.0.0.0",
    port: 3000,
});
const signal = await new Promise<void>((resolve) => {
    process.on("SIGINT", resolve);
    process.on("SIGTERM", resolve);
});
logger.info(`server stop by ${signal}`);

await server.close();
logger.info("server closed");
