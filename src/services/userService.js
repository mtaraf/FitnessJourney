import axios from "axios";

export const getUser = async (username) => {
  try {
    console.log("Service: ", username);
    const response = await axios.get("/api/users/", {
      params: {
        username: username,
      },
    });
  } catch (error) {
    throw error.response?.data?.message || "Error fetching user";
  }
};
