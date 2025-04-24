import axios from "axios";

export const getUserNutrition = async (username) => {
  try {
    const response = await axios.get(`/api/userNutrition/${username}`);

    return response;
  } catch (error) {
    throw error.response?.data?.message || "Error fetching user nutrition data";
  }
};

export const createUserNutrition = async (data) => {
  try {
    const response = await axios.post(`/api/userNutrition/`, data);

    return response;
  } catch (error) {
    throw error.response?.data?.message || "Error creating user nutrition data";
  }
};

export const updateUserNutrition = async (username, data) => {
  try {
    const response = await axios.put(`/api/userNutrition/${username}`, data);
    return response;
  } catch (error) {
    throw error.response?.data?.message || "Error updating user nutrition data";
  }
};
