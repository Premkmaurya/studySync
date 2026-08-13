// Secure Key Store utility stub for local storage fallback

export const getSecret = async (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const setSecret = async (key, value) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};
