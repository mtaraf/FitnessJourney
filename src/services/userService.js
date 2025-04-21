import axios from "axios";

export const getUser = async (username) => {
  try {
    const response = await axios.get("/api/users/", {
      params: {
        username: username,
      },
    });

    return response;
  } catch (error) {
    throw error.response?.data?.message || "Error fetching user";
  }
};

export const createUser = async (data) => {
  try {
    const response = await axios.post("/api/users/", data);
    return response;
  } catch (error) {
    throw error.response?.data?.message || "Error posting user";
  }
};

export const updateUser = async (username, data) => {
  try {
    const response = await axios.put(`/api/users/${username}`, data);
    return response;
  } catch (error) {
    throw error.response?.data?.message || "Error updating user";
  }
};
