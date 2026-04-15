import api from "../../services/api";

export const fetchNotesApi = async (page = 1, limit = 9) => {
  const response = await api.get("/notes/get", {
    params: { page, limit },
  });
  return response.data;
};

export const createNoteApi = async (noteData) => {
  const response = await api.post("/notes", noteData);
  return response.data;
};

export const summarizeNoteApi = async (noteId) => {
  const response = await api.post(`/notes/${noteId}/summarize`);
  return response.data;
};

export const getMyNotesApi = async () => {
  const response = await api.get("/notes/my-notes");
  return response.data;
};

export const getNoteByIdApi = async (noteId, page = 1, limit = 8) => {
  const response = await api.get(`/notes/get/${noteId}`, {
    params: { page, limit },
  });
  return response.data;
};

export const searchNotesApi = async (query, groupId, page = 1, limit = 9) => {
  const response = await api.get(`/notes/search`, {
    params: { q: query, groupId, page, limit },
  });
  return response.data;
};

export const saveNoteApi = async (payload) => {
  const response = await api.post(`/notes/save-note`, payload);
  return response.data;
};

export const getSavedNotesApi = async (page = 1, limit = 5) => {
  const response = await api.get("/notes/saved-notes", {
    params: { page, limit },
  });
  return response.data;
};
