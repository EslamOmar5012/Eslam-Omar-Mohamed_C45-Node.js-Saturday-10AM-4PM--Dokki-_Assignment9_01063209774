export const checkNoteOwner = (userId, noteId) => {
  console.log(userId, noteId);
  if (userId !== noteId) return false;
  return true;
};
