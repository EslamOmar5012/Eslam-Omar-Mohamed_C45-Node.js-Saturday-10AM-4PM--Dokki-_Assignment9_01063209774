import mongoose from "mongoose";
import { dbUrl } from "../../config/config.service.js";

export default async function authenticateDB() {
  try {
    await mongoose.connect(dbUrl);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB error :", error.message);
  }
}
