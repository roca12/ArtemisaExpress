"use strict";
const express = require("express");
const RateLimit = require("express-rate-limit");
const { configMongoose } = require("./config/dbConfig");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");

dotenv.config();

const app = express();
const router = express.Router();

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
    validate:{creationStack:false},
});
app.use(limiter);

const rawOrigins = process.env.CORS || "";
const allowedOrigins = rawOrigins
  .split(",")
  .map((origin) => origin.trim())
  .filter((origin) => origin);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.options("*", cors());
app.use(
  logger(
    `\u001b[36murl:\u001b[0m :url\n` +
      `\u001b[36mmethod:\u001b[0m :method\n` +
      `\u001b[36mstatus_code:\u001b[0m :status\n` +
      `\u001b[36mtime:\u001b[0m :response-time ms\n` +
      `\u001b[36mdate:\u001b[0m :date[iso]\n`,
  ),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const initRouter = () => {
  const controllers = [
    "temario",
    "problema",
    "usuario",
    "link_valioso",
    "calendario",
    "libro",
    "notificacion",
  ];
  controllers.forEach((name) => new (require(`./controller/${name}`))(router));
};
initRouter();
app.use("/.netlify/functions/api", router);
app.use("/", router);
configMongoose.mongoose
  .connect(configMongoose.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Mongo connection error:", err));
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});
module.exports = app;
module.exports.handler = serverless(app);
