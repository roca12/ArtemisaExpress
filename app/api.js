"use strict";
const express = require("express");
const RateLimit = require("express-rate-limit");
const { configMongoose } = require("./config/dbConfig");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const MFAService = require("./service/MFAService");
const EmailStrategy = require("./service/notificacion/EmailStrategy");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const router = express.Router();

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  validate: { creationStack: false, ip: false },
  keyGenerator: (req) =>
    req.ip || req.headers["x-forwarded-for"] || "anonymous",
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
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.options("*", cors());
app.use(
  logger(
    "\u001b[36murl:\u001b[0m :url\n" +
      "\u001b[36mmethod:\u001b[0m :method\n" +
      "\u001b[36mstatus_code:\u001b[0m :status\n" +
      "\u001b[36mtime:\u001b[0m :response-time ms\n" +
      "\u001b[36mdate:\u001b[0m :date[iso]\n",
  ),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ArtemisaExpress API",
      version: "1.0.0",
      description: "API de la plataforma de aprendizaje Artemisa Express",
    },
    servers: [
      {
        url: "http://localhost:9000/.netlify/functions/api",
        description: "Local (netlify-lambda)",
      },
    ],
  },
  apis: ["./app/controller/*.js"],
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
  "/.netlify/functions/api/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec),
);

/**
 * Inicializa y registra todos los controladores de rutas en el router de Express.
 */
const initRouter = () => {
  const emailStrategy = new EmailStrategy();
  const mfaService = new MFAService(emailStrategy);
  const controllers = [
    ["temario"],
    ["problema"],
    ["link_valioso"],
    ["calendario"],
    ["libro"],
    ["notificacion"],
    ["usuario", mfaService],
  ];

  controllers.forEach(
    ([name, ...args]) => new (require(`./controller/${name}`))(router, ...args),
  );
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

/**
 * Middleware de manejo de errores (4 argumentos).
 *
 * Captura los errores que se lanzan en middlewares previos al handler
 * (por ejemplo `multer`/Cloudinary durante la subida de archivos), que de otro
 * modo llegarían al handler por defecto de Express y devolverían un 500 con
 * HTML. Traduce los casos conocidos a respuestas JSON con el código adecuado.
 */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err && err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(413)
        .json({ ok: false, message: "El archivo supera el límite de 10 MB" });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        ok: false,
        message: `Campo de archivo inesperado: "${err.field}". Usa "archivoPdf" o "imagen"`,
      });
    }
    return res.status(400).json({ ok: false, message: err.message });
  }

  if (err && (err.type === "entity.too.large" || err.status === 413)) {
    return res
      .status(413)
      .json({ ok: false, message: "La petición excede el tamaño permitido" });
  }

  const status = err.statusCode || err.http_code || 500;
  const message =
    (err.error && err.error.message) || err.message || "Error interno";
  console.error("Error no controlado:", err);
  return res.status(status).json({ ok: false, message });
});

module.exports = app;
module.exports.handler = serverless(app);
