import { connectDb } from "./config/connectDb";
import express, { Request, Response } from "express"
import cors from "cors"
import {articleRouter} from "./routes/article.routes"
import { config } from "dotenv";

config()
connectDb()

const PORT = process.env.PORT

const server = express()

server.use(cors())
server.use(express.json())

server.get("/", (req: Request, res: Response) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Blog API</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', sans-serif;
      background: #0a0a0f;
      color: #e2e8f0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .bg-glow {
      position: fixed;
      inset: 0;
      background:
        radial-gradient(ellipse 60% 50% at 20% 20%, rgba(99,102,241,0.15) 0%, transparent 60%),
        radial-gradient(ellipse 50% 40% at 80% 80%, rgba(168,85,247,0.12) 0%, transparent 60%);
      pointer-events: none;
    }

    .card {
      position: relative;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 24px;
      padding: 56px 64px;
      max-width: 700px;
      width: 90%;
      backdrop-filter: blur(12px);
      box-shadow: 0 32px 80px rgba(0,0,0,0.5);
      animation: fadeUp 0.6s ease both;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(99,102,241,0.15);
      border: 1px solid rgba(99,102,241,0.3);
      border-radius: 999px;
      padding: 4px 14px;
      font-size: 12px;
      font-weight: 500;
      color: #a5b4fc;
      margin-bottom: 24px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #6ee7b7;
      box-shadow: 0 0 8px #6ee7b7;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.4; }
    }

    h1 {
      font-size: 2.6rem;
      font-weight: 700;
      background: linear-gradient(135deg, #e2e8f0 0%, #a5b4fc 50%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.2;
      margin-bottom: 12px;
    }

    .subtitle {
      color: #64748b;
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: 40px;
      line-height: 1.6;
    }

    .endpoints-title {
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #475569;
      margin-bottom: 14px;
    }

    .endpoints {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .endpoint {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 10px;
      padding: 12px 16px;
      transition: background 0.2s, border-color 0.2s;
    }

    .endpoint:hover {
      background: rgba(255,255,255,0.06);
      border-color: rgba(165,180,252,0.2);
    }

    .method {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      padding: 3px 8px;
      border-radius: 6px;
      min-width: 52px;
      text-align: center;
    }

    .get    { background: rgba(34,197,94,0.15);  color: #4ade80; }
    .post   { background: rgba(59,130,246,0.15); color: #60a5fa; }
    .patch  { background: rgba(234,179,8,0.15);  color: #facc15; }
    .delete { background: rgba(239,68,68,0.15);  color: #f87171; }

    .path {
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      color: #cbd5e1;
    }

    .desc {
      margin-left: auto;
      font-size: 0.78rem;
      color: #475569;
      white-space: nowrap;
    }

    .footer {
      margin-top: 36px;
      padding-top: 24px;
      border-top: 1px solid rgba(255,255,255,0.06);
      font-size: 0.78rem;
      color: #334155;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="bg-glow"></div>
  <div class="card">
    <div class="badge"><span class="dot"></span> Live & Running</div>
    <h1>Blog API</h1>
    <p class="subtitle">A RESTful API for managing blog articles.<br/>Built with Express, TypeScript &amp; MongoDB.</p>

    <p class="endpoints-title">Available Endpoints</p>
    <div class="endpoints">
      <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/api/articles</span>
        <span class="desc">Get all articles</span>
      </div>
      <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/api/articles?tag=:tag</span>
        <span class="desc">Filter by tag</span>
      </div>
      <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/api/articles/:id</span>
        <span class="desc">Get article by ID</span>
      </div>
      <div class="endpoint">
        <span class="method post">POST</span>
        <span class="path">/api/articles</span>
        <span class="desc">Create article</span>
      </div>
      <div class="endpoint">
        <span class="method patch">PATCH</span>
        <span class="path">/api/articles/:id</span>
        <span class="desc">Update article</span>
      </div>
      <div class="endpoint">
        <span class="method delete">DELETE</span>
        <span class="path">/api/articles/:id</span>
        <span class="desc">Delete article</span>
      </div>
    </div>

    <div class="footer">
      <span>v1.0.0</span>
      <span>Personal Blogging Platform API</span>
    </div>
  </div>
</body>
</html>`)
})

server.use('/api/articles', articleRouter)

if (!process.env.VERCEL) {
  server.listen(PORT, () => {
    try {
      console.log(`Server listening on port: ${PORT}`)
    } catch (error) {
      const err = error as Error
      console.log(`Port listening failure, error message: ${err.message}`)
    }
  })
}

export default server