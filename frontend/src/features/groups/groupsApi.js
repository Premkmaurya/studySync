import api from "../../services/api";

export const fetchGroupsApi = async (page = 1, limit = 9, field) => {
  const response = await api.get("/groups/all", {
    params: { page, limit, field },
  });
  return response.data;
};

export const searchGroupsApi = async (query, page = 1, limit = 9, field) => {
  const response = await api.get("/groups/search", {
    params: { q: query, page, limit, field },
  });
  return response.data;
};

export const createGroupApi = async (groupData) => {
  const response = await api.post("/groups/create", groupData);
  return response.data;
};

export const joinGroupApi = async (groupId) => {
  const response = await api.post(`/groups/join/${groupId}`);
  return response.data;
};

export const joinedGroupApi = async (page = 1, limit = 6) => {
  const response = await api.get("/groups/joined-groups", {
    params: { page, limit },
  });
  return response.data;
};

export const fetchSuggestedGroupsApi = async (page = 1, limit = 6) => {
  const response = await api.get("/groups/suggested-groups", {
    params: { page, limit },
  });
  return response.data;
};

export const fetchGroupMembersApi = async (groupId, page = 1, limit = 10) => {
  const response = await api.get(`/groups/members`, {
    params: { groupId, page, limit },
  });
  return response.data;
};

export const updateGroupApi = async (groupId, groupData) => {
  const response = await api.patch(`/groups/update/${groupId}`, groupData);
  return response.data;
};

export const deleteGroupApi = async (groupId) => {
  const response = await api.delete(`/groups/delete/${groupId}`);
  return response.data;
};

export const removeMemberApi = async (groupId, userId) => {
  const response = await api.delete(`/groups/remove-member`, {
    data: { groupId, userId },
  });
  return response.data;
};

export const fetchMyEncryptedGroupKeyApi = async (groupId) => (await api.get(`/groups/${groupId}/my-encrypted-key`)).data;
export const rotateGroupKeyApi = async (groupId, encryptedGroupKeys) => (await api.patch(`/groups/${groupId}/rotate-key`, { encryptedGroupKeys })).data;
