import api from '../../services/api';

export const fetchChatMessagesApi = async (groupId) => {
  const response = await api.get(`/chat/${groupId}/messages`);
  return response.data;
};
