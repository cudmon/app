import "dotenv/config";

import { fastify } from "fastify";
import { router } from "@/routes";
import { CORS_ORIGIN, HOST, PORT } from "@/env";

import cors from "@fastify/cors";

const app = fastify();

app.register(cors, {
  origin: CORS_ORIGIN || "*",
});

app.register(router);

app.listen(
  {
    host: HOST,
    port: parseInt(PORT!),
  },
  (err, address) => {
    if (err) {
      process.exit(1);
    }

    console.clear();
    console.log(`Server listening at ${address}`);
  }
);
