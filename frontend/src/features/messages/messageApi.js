import api from "../../services/api";


export const fetchMessagesApi = async (groupId, id) => {
  const response = await api.get(`/messages/ai/${groupId}/${id}`);
  return response.data;
}; 