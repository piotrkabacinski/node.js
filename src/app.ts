import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { middleware } from "express-openapi-validator";

import rootRouter from "./routes/root";
import usersRouter from "./routes/users";

export default () => {
  const app = express();
  const isTest = process.env.NODE_ENV === "test";

  app.use(bodyParser.json()).use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  if (!isTest) {
    app.use(morgan(":method :url :status (:response-time ms)"));
  }

  app.use(
    middleware({
      apiSpec: `${__dirname}/../src/openapi.yaml`,
      validateRequests: true,
      validateResponses: isTest,
    })
  );

  app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    next();
  });

  app.use("/", rootRouter).use("/users", usersRouter);

  app.use((err, _req, res, _next) => {
    console.error(err);

    res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  });

  return app;
};
