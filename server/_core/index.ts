import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import http from "http";
import https from "https";
import cron from "node-cron";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

// Keep-alive statistics
const keepAliveStats = {
  startTime: new Date(),
  lastPing: new Date(),
  totalPings: 0,
  recentPings: [] as Date[],
};

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  
  // Keep-alive endpoints
  app.get("/health", (req, res) => {
    res.json({
      status: "ok",
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  });

  app.get("/keep-alive", (req, res) => {
    keepAliveStats.lastPing = new Date();
    keepAliveStats.totalPings++;
    keepAliveStats.recentPings.push(new Date());
    
    // Keep only last 100 pings
    if (keepAliveStats.recentPings.length > 100) {
      keepAliveStats.recentPings = keepAliveStats.recentPings.slice(-100);
    }
    
    res.json({
      status: "alive",
      message: "Server is awake",
      uptime: Math.floor(process.uptime()),
      stats: {
        startTime: keepAliveStats.startTime.toISOString(),
        lastPing: keepAliveStats.lastPing.toISOString(),
        totalPings: keepAliveStats.totalPings,
        recentPings: keepAliveStats.recentPings.length,
      },
    });
  });

  app.get("/api/stats", (req, res) => {
    res.json({
      startTime: keepAliveStats.startTime.toISOString(),
      lastPing: keepAliveStats.lastPing.toISOString(),
      totalPings: keepAliveStats.totalPings,
      recentPings: keepAliveStats.recentPings.map(d => d.toISOString()),
      uptime: Math.floor(process.uptime()),
    });
  });
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    
    // Setup self-pinging cron job (every 1 minute)
    const renderUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;
    console.log(`[CRON] Self-pinging agendado para executar a cada 1 minuto`);
    console.log(`[CRON] URL alvo: ${renderUrl}/keep-alive`);

    cron.schedule('*/1 * * * *', () => {
      const now = new Date().toISOString();
      console.log(`[CRON] Self-ping iniciado em ${now}`);

      const isHttps = renderUrl.startsWith('https');
      const httpModule = isHttps ? https : http;

      httpModule.get(`${renderUrl}/keep-alive`, (res) => {
        console.log(`[CRON] ✓ Self-ping bem-sucedido (${res.statusCode})`);
      }).on('error', (err) => {
        console.error(`[CRON] ✗ Erro no self-ping:`, err.message);
      });
    });
  });
}

startServer().catch(console.error);
