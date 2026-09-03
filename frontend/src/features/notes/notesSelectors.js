export const selectNotes = (state) => state.notes.notes;
export const selectMyNotes = (state) => state.notes.myNotes;
export const selectSelectedNote = (state) => state.notes.selectedNote;
export const selectSavedNotes = (state) => state.notes.savedNotes;
export const selectNotesLoading = (state) => state.notes.loading;
export const selectSavedNotesLoading = (state) => state.notes.savedNotesLoading;
export const selectNotesError = (state) => state.notes.error;
