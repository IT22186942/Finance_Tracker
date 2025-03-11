import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL || "";
export const LOCALHOST_SERVER_PORT = process.env.LOCALHOST_SERVER_PORT ?? 5555;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export const NODE_ENV = process.env.NODE_ENV ?? "development";
