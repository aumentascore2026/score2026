import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cron from "node-cron";
import http from "http";
import https from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let lastPingTime = new Date();

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
    lastPingTime = new Date();
    console.log(`[KEEP-ALIVE] Ping received at ${lastPingTime.toISOString()}`);
    res.status(200).json({ status: "ok", timestamp: lastPingTime.toISOString() });
  });

  app.head("/keep-alive", (_req, res) => {
    lastPingTime = new Date();
    res.status(200).send();
  });

  // Health check endpoint
  app.get("/health", (_req, res) => {
    res.status(200).json({ 
      status: "healthy", 
      uptime: process.uptime(),
      lastPing: lastPingTime.toISOString()
    });
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
    console.log(`[CRON] Keep-alive scheduler will start (every 1 minute)`);
  });

  // Function to make internal ping
  function makeInternalPing() {
    return new Promise((resolve) => {
      const options = {
        hostname: "localhost",
        port: port,
        path: "/keep-alive",
        method: "GET",
        timeout: 3000,
      };

      const req = http.request(options, (res) => {
        console.log(`[CRON] ✓ Internal ping successful - Status: ${res.statusCode} at ${new Date().toISOString()}`);
        resolve(true);
      });

      req.on("error", (error) => {
        console.error(`[CRON] ✗ Internal ping error:`, error.message);
        resolve(false);
      });

      req.on("timeout", () => {
        console.error(`[CRON] ✗ Internal ping timeout`);
        req.destroy();
        resolve(false);
      });

      req.end();
    });
  }

  // Function to make external ping (if needed)
  async function makeExternalPing() {
    try {
      const externalUrl = process.env.RENDER_EXTERNAL_URL;
      if (!externalUrl) {
        console.log(`[CRON] No RENDER_EXTERNAL_URL set, skipping external ping`);
        return false;
      }

      console.log(`[CRON] Attempting external ping to ${externalUrl}/keep-alive`);
      
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`${externalUrl}/keep-alive`, {
        method: "GET",
        signal: controller.signal,
      });
      
      clearTimeout(timeout);
      
      if (response.ok) {
        console.log(`[CRON] ✓ External ping successful at ${new Date().toISOString()}`);
        return true;
      } else {
        console.warn(`[CRON] ✗ External ping failed with status ${response.status}`);
        return false;
      }
    } catch (error) {
      console.error(`[CRON] ✗ External ping error:`, error instanceof Error ? error.message : String(error));
      return false;
    }
  }

  // Schedule internal self-ping every minute to keep Render awake
  cron.schedule("*/1 * * * *", async () => {
    console.log(`[CRON] Running scheduled task at ${new Date().toISOString()}`);
    
    // Always do internal ping
    await makeInternalPing();
    
    // Also try external ping if URL is available
    await makeExternalPing();
  });

  console.log("[CRON] Cron scheduler initialized");
}

startServer().catch(console.error);
