import {
  ApiError,
  checkNoteOwner,
  checkRequestBody,
  getToken,
  successRes,
} from "../../common/index.js";
import { NoteModel } from "../../db/index.js";

//createNote
export const createNote = async (req, res, next) => {
  //get user id
  const userId = getToken(req);

  //get body fields
  const { title, content } = req.body;

  //createNote
  const result = await NoteModel.insertOne({ title, content, userId });

  return successRes(res, 201, "Note created successfully");
};

//-------------------------------------------------------------------------------------------------------------------------------------

//updateNote
export const updateNote = async (req, res, next) => {
  //get use id from token
  const userId = getToken(req);
  const { noteId } = req.params;
  const { title, content } = req.body;

  //check that all params are there
  await checkRequestBody(["title", title], ["content", content]);

  //get note based on userId
  const note = await NoteModel.findOneAndUpdate(
    { _id: noteId, userId },
    { $set: { title, content }, $inc: { __v: 1 } },
    { new: true },
  );

  if (!note) {
    throw new ApiError(
      "user don't have this note or there is no notes for this user",
      401,
    );
  }

  return successRes(res, 200, "note updated successfully", { note });
};

//-------------------------------------------------------------------------------------------------------------------------------------

//replace note
export const replaceNote = async (req, res, next) => {
  //get userId from token
  const userId = getToken(req);

  //get noteId from params
  const { noteId } = req.params;

  //get data from body
  const { title, content } = req.body;

  console.log(userId);

  //check that all params are there
  await checkRequestBody(["title", title], ["content", content]);

  //replace note based on userId
  const note = await NoteModel.findOneAndReplace(
    {
      _id: noteId,
      userId,
    },
    { title, content, userId },
    { new: true },
  );

  if (!note) {
    throw new ApiError(
      "user don't have this note or there is no notes for this user",
      401,
    );
  }

  return successRes(res, 200, "note replaced successfully", { note });
};

//-------------------------------------------------------------------------------------------------------------------------------------

//updateAllNotesTitle
export const updateTitle = async (req, res, next) => {
  //get userId from token
  const userId = getToken(req);

  //get fields from body
  const { title } = req.body;

  //check that all properties exist
  await checkRequestBody(["title", title]);

  //update all notes
  const result = await NoteModel.updateMany(
    { userId },
    { $set: { title }, $inc: { __v: 1 } },
  );

  if (!result.modifiedCount)
    throw new ApiError("there is no notes for this user", 404);

  return successRes(res, 200, "notes title updated successfully");
};

//-------------------------------------------------------------------------------------------------------------------------------------

//delete a single user
export const deleteNote = async (req, res, next) => {
  //get userId from token
  const userId = getToken(req);

  const { noteId } = req.params;
  const note = await NoteModel.findOneAndDelete({ _id: noteId, userId });

  if (!note) throw new ApiError("this user don't have this note", 404);

  return successRes(res, 200, "note has been deleted successfully");
};

//-------------------------------------------------------------------------------------------------------------------------------------

//retriveNotes
export const retriveNotes = async (req, res, next) => {
  //get userId from token
  const userId = getToken(req);

  //get query parameters
  const { page = 0, limit = 2 } = req.query;

  const notes = await NoteModel.find({ userId })
    .sort({ createdAt: -1 })
    .skip(page * limit)
    .limit(limit);

  res.header("token", req.cookies.jwt);

  if (!notes.length)
    return successRes(res, 200, "user don't have notes within this limit");

  return successRes(res, 200, "user notes retrieved successfully", { notes });
};

//-------------------------------------------------------------------------------------------------------------------------------------

//getNote
export const getNote = async (req, res, next) => {
  //get userId from token
  const userId = getToken(req);

  //get noteId from params
  const { noteId } = req.params;

  //get note
  const note = await NoteModel.findOne({ _id: noteId, userId });

  if (!note) throw new ApiError("user don't have this note", 404);

  return successRes(res, 200, "note data retrieved successfully", { note });
};

//-------------------------------------------------------------------------------------------------------------------------------------

//getNoteByItsContent;
export const getNoteByContent = async (req, res, next) => {
  //get userId from token
  const userId = getToken(req);

  //get content from query
  const { content } = req.query;

  //get note
  const note = await NoteModel.findOne({ userId, content });

  if (!note) throw new ApiError("note not found", 404);

  return successRes(res, 200, "noteData retrieved successfully", { note });
};

//-------------------------------------------------------------------------------------------------------------------------------------

//get note and itsUser data
export const getNoteAndUserData = async (req, res, next) => {
  //get userId
  const userId = getToken(req);

  //get notes
  const notes = await NoteModel.find({ userId }).populate({
    path: "userId",
    select: "email -_id",
  });

  if (!notes.length) throw new ApiError("notes not found", 404);

  return successRes(res, 200, "notes data retrived successfully", { notes });
};

//-------------------------------------------------------------------------------------------------------------------------------------

//getnotes with title and userData

export const aggregate = async (req, res, next) => {
  //get userId
  const userId = getToken(req);

  //get title fron query params
  const { title } = req.query;

  //get notes
  const notes = await NoteModel.find({ title }).populate({
    path: "userData",
    select: "name email -_id",
  });

  if (!notes.length) throw new ApiError("notes not found", 404);

  return successRes(res, 200, "notes data retrived successfully", { notes });
};

//-------------------------------------------------------------------------------------------------------------------------------------

//deleteNotes
export const deleteNotes = async (req, res, next) => {
  //get userId
  const userId = getToken(req);

  //delete All Notes
  const notes = await NoteModel.deleteMany({ userId });

  if (!notes.deletedCount)
    throw new ApiError("there is no notes to delete it", 404);

  return successRes(res, 200, "notes have been deleted successfully", {
    notesDeleted: notes.deletedCount,
  });
};
