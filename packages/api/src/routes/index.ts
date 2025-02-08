import { text } from "@/contracts/text.contract";
import { FastifyInstance } from "fastify";

export const router = async (app: FastifyInstance) => {
  app.get("/message", async () => {
    return text.get();
  });

  app.post("/message", async (request) => {
    const { message } = request.body as {
      message: string;
    };

    await text.set(message);

    return message;
  });
};
