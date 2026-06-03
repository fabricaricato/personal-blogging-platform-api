import { connectDb } from "./config/connectDb";
import express, { Request, Response } from "express"
import cors from "cors"

const server = express()

server.use(cors())      
server.use(express.json()) 

server.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

server.listen(process.env.PORT, async () => {
    try {
        await connectDb()
        console.log(`Server is running on port ${process.env.PORT}`)
    } catch (error) {
        console.error("Failed to start server:", error)
    }
})