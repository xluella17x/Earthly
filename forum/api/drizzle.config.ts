import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/drizzle/schema.ts", 
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  verbose: true,
  strict: true,
});