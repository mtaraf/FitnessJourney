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
