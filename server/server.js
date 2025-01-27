import * as Sentry from "@sentry/node";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import "./config/instrument.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

// Initialize express
const app = express();

// Setup Sentry request handler (MUST be before any other middleware)
Sentry.init({
  dsn: process.env.SENTRY_DSN, // Ensure your Sentry DSN is set in the .env file
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API Working"));

app.get("/debug-sentry", (_req, _res) => {
  throw new Error("My first Sentry error!");
});

app.post("/webhooks", clerkWebhooks);

// Port
const PORT = process.env.PORT || 5000;

// Connect to the database BEFORE starting the server
(async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");

    // Start the server AFTER the DB is connected
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process if the database fails to connect
  }
})();

// Sentry Error Handler (MUST be placed after all routes & middlewares)
app.use(Sentry.Handlers.errorHandler());

// General Error Handling Middleware (for other errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
