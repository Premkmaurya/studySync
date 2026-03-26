import api from "../../services/api";

export const fetchGroupsApi = async () => {
  const response = await api.get("/groups/all");
  return response.data;
};

export const createGroupApi = async (groupData) => {
  const response = await api.post("/groups/create", groupData);
  return response.data;
};

export const joinGroupApi = async (groupId) => {
  const response = await api.post(`/groups/${groupId}/join`);
  return response.data;
};

export const fetchGroupMembersApi = async (groupId) => {
  const response = await api.get(`/groups/members`, { params: { groupId } });
  return response.data;
};

export const fetchGroupDetailsApi = async (groupId) => {
  const response = await api.get(`/groups/${groupId}`);
  return response.data;
};
