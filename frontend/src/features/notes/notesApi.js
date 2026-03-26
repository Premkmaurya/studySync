import api from '../../services/api';

export const fetchNotesApi = async () => {
  const response = await api.get('/notes');
  return response.data;
};

export const createNoteApi = async (noteData) => {
  const response = await api.post('/notes', noteData);
  return response.data;
};

export const summarizeNoteApi = async (noteId) => {
  const response = await api.post(`/notes/${noteId}/summarize`);
  return response.data;
};

export const searchNotesApi = async (query) => {
  const response = await api.get(`/notes/search?q=${query}`);
  return response.data;
};
