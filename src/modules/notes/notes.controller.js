import { Router } from "express";
import {
  aggregate,
  createNote,
  deleteNote,
  deleteNotes,
  getNote,
  getNoteAndUserData,
  getNoteByContent,
  replaceNote,
  retriveNotes,
  updateNote,
  updateTitle,
} from "./notes.service.js";

const router = Router();

//1-createNote
router.post("/", createNote);

//4-updateTitleInAllNotes
router.patch("/all", updateTitle);

//6-getUserNotes
router.get("/paginate-sort", retriveNotes);

//8-getNoteByContent
router.get("/note-by-content", getNoteByContent);

//9-getNoteWithUser
router.get("/note-with-user", getNoteAndUserData);

//10- aggregation
router.get("/aggregate", aggregate);

//11-delete notes
router.delete("/", deleteNotes);

//7-getUserNote
router.get("/:noteId", getNote);

//2-updateNote
router.patch("/:noteId", updateNote);

//3-replaceNote
router.put("/:noteId", replaceNote);

//5-deleteNote
router.delete("/:noteId", deleteNote);

export default router;
