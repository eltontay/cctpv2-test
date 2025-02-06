import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransferSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  app.post("/api/transfers", async (req, res) => {
    try {
      const transferData = insertTransferSchema.parse(req.body);
      const transfer = await storage.createTransfer(transferData);
      res.json(transfer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/transfers/:id", async (req, res) => {
    const transfer = await storage.getTransfer(parseInt(req.params.id));
    if (!transfer) {
      res.status(404).json({ error: "Transfer not found" });
      return;
    }
    res.json(transfer);
  });

  const httpServer = createServer(app);
  return httpServer;
}
