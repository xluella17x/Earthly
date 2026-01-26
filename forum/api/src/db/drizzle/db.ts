import { env } from "../../data/env";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const client = env.DB_URL

export const db = drizzle(client, { schema });