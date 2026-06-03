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
    res.send("Hello World!")
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