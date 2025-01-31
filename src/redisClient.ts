import { createClient } from "redis";

const getConfig = () => {
  if (process.env.NODE_ENV !== "production") {
    return {
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    };
  }

  const { port, hostname, href } = new URL(process.env.REDIS_URL);

  return {
    no_ready_check: true,
    password: /\/\/:(.*?)@/.exec(href)[1],
    host: hostname,
    port: Number(port),
  };
};

const client = createClient(getConfig());

// For easier mocking, created redis client is wrapped in a function:
export const getRedisClient = () => client;
