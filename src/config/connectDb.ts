import { config } from "dotenv"
import { connect } from "mongoose"

// Load environment variables from .env file
config()

const URI_DB = process.env.URI_DB as string

// Fail fast at startup if the database URI is not configured
if (!URI_DB) {
  throw new Error("❌ Error: The URI_DB variable is missing in the .env")
}

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * Reads the connection URI from the `URI_DB` environment variable.
 *
 * Logs a success message on connection or an error message if it fails.
 * Errors are caught internally and do not propagate, allowing the server
 * to continue running (e.g. for health-check endpoints).
 */
const connectDb = async () => {
  try {
    await connect(URI_DB)
    console.log("🟢 CONNECTED SUCCESSFULLY 🟢")
  } catch (error) {
    const err = error as Error
    console.log(`🔴 FAILED TO CONNECT DATABASE 🔴 MESSAGE: ${err.message}`)
  }
}

export {connectDb}