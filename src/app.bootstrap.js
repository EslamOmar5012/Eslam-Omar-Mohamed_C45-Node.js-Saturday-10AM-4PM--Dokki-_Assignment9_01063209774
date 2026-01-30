import express from "express";
import { authenticateDB, NoteModel, UserModel } from "./db/index.js";
import { errorRes, wrongRouteRes } from "./common/index.js";
import { port } from "../config/index.js";
import morgan from "morgan";
import { usersRouter, notesRouter } from "./modules/index.js";
import cookieParser from "cookie-parser";

export default async function bootstrap() {
  const app = express();

  //DB connection
  await authenticateDB();

  //DB syncIndexes
  await UserModel.syncIndexes();
  await NoteModel.syncIndexes();

  //middleWares
  app.use(morgan("combined"));
  app.use(cookieParser());
  app.use(express.json());

  //route handler
  app.use("/users", usersRouter);

  app.use("/notes", notesRouter);

  //wrong route handler
  app.use("/{*dummy}", wrongRouteRes);

  //error handler
  app.use(errorRes);

  //create server
  app.listen(port, (error) => {
    if (error) return console.log("Server Error :", error.message);

    console.log(`Server is running on port ${port} 🚀`);
  });
}
