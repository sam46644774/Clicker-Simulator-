import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("game.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS saves (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/save/:id", (req, res) => {
    const row = db.prepare("SELECT data FROM saves WHERE id = ?").get(req.params.id) as { data: string } | undefined;
    if (row) {
      res.json(JSON.parse(row.data));
    } else {
      res.status(404).json({ error: "Save not found" });
    }
  });

  app.post("/api/save", (req, res) => {
    const { id, data } = req.body;
    db.prepare("INSERT OR REPLACE INTO saves (id, data, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)").run(id, JSON.stringify(data));
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
