import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cron from "node-cron";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Keep-alive endpoint to keep Render awake
  app.get("/keep-alive", (_req, res) => {
    console.log(`[KEEP-ALIVE] Ping received at ${new Date().toISOString()}`);
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.head("/keep-alive", (_req, res) => {
    res.status(200).send();
  });

  // Legacy ping endpoint for compatibility
  app.get("/api/ping", (_req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.head("/api/ping", (_req, res) => {
    res.status(200).send();
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);

    // Schedule self-ping every minute to keep Render awake
    cron.schedule("*/1 * * * *", async () => {
      try {
        const externalUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;
        const response = await fetch(`${externalUrl}/keep-alive`, {
          method: "GET",
        });
        if (response.ok) {
          console.log(`[CRON] Self-ping successful at ${new Date().toISOString()}`);
        } else {
          console.warn(`[CRON] Self-ping failed with status ${response.status}`);
        }
      } catch (error) {
        console.error(`[CRON] Self-ping error:`, error instanceof Error ? error.message : error);
      }
    });

    console.log("[CRON] Keep-alive scheduler started (every 1 minute)");
  });
}

startServer().catch(console.error);
