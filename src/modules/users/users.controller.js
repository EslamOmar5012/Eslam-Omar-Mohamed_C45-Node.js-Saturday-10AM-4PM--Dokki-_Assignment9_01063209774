import { Router } from "express";
import {
  deleteUser,
  editUser,
  getUserData,
  loginUser,
  signupUser,
} from "./users.service.js";

const router = Router();

//1- Signup
router.post("/signup", signupUser);

//2- login
router.post("/login", loginUser);

//3- edit
router.patch("/", editUser);

//4- delete
router.delete("/", deleteUser);

//5- getUserData
router.get("/", getUserData);

export default router;
