import { env } from "../../data/env";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres"; 

const client = postgres(env.DB_URL, {
  ssl: { rejectUnauthorized: false }, 
  prepare: false,
});

export const db = drizzle(client, { schema });