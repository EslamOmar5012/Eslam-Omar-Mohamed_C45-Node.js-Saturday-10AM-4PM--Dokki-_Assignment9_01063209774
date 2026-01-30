import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve("./config/.env.development") });

export const {
  PORT: port,
  DB_URL: dbUrl,
  SALT_ROUND: saltRound,
  MONGOOSE_ENCRYPTION_SECRET_KEY: mongooseSecretKey,
  JWT_SECRET_KEY: jwtSercetKey,
} = process.env;
