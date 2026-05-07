import api from "../../services/api";


export const fetchMessagesApi = async (groupId) => {
  const response = await api.get(`/messages/ai/${groupId}`);
  return response.data;
}; 