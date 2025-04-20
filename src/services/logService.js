import axios from "axios";

export const getLogs = async (username) => {
  try {
    const response = await axios.get(`/api/logs/${username}`);

    return response;
  } catch (error) {
    throw error.response?.data?.message || "Error fetching user log data";
  }
};

export const updateLogs = async (username, data) => {
  try {
    const response = await axios.put(`/api/logs/${username}`, data);
    return response;
  } catch (error) {
    throw error.response?.data?.message || "Error updating user log data";
  }
};
