import api from '../../services/api';

export const registerApi = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginApi = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const fetchCurrentApi = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const logoutApi = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const updateProfilePictureApi = async ({ id, profilePicture }) => {
  const response = await api.patch(`/auth/user/${id}/update-profile-pic`, profilePicture);
  return response.data;
};


export const updatePublicKeyApi = async (publicKey) => {
  const response = await api.patch("/auth/user/public-key", { publicKey });
  return response.data;
};
