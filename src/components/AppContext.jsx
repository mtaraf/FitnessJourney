import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getUserNutrition,
  updateUserNutrition,
} from "../services/userNutritionService";
import { getLogs } from "../services/logService";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState("home");
  const [user, setUser] = useState({
    signedIn: false,
    information: {},
    goals: {},
    username: "test",
    workouts: [],
    weeklyPlan: [],
  });
  const [foodLog, setFoodLog] = useState([]);
  const [userNutritionData, setUserNutritionData] = useState({
    meals: [],
    foods: [],
    favorites: [],
  });

  const fetchData = async () => {
    // User Nutrition Data
    let nutritionDataResponse = await getUserNutrition(user.username);
    if (nutritionDataResponse.status === 200) {
      if (nutritionDataResponse.data) {
        setUserNutritionData({
          meals: nutritionDataResponse.data.meals,
          foods: nutritionDataResponse.data.foods,
          favorites: nutritionDataResponse.data.favorites,
        });
      } else {
        setUserNutritionData({});
      }
    }
    console.log("User Nutrition Data Response: ", nutritionDataResponse);

    // Logs
    let userNutritionLogsResponse = await getLogs(user.username);
    if (userNutritionLogsResponse.status === 200) {
      console.log("User Nutrition Logs: ", userNutritionLogsResponse.data?.log);
      setFoodLog(userNutritionLogsResponse.data?.log);
    }
  };

  useEffect(() => {
    // Check if user is logged in first
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
    console.log("Queried data for new user: ", user);
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        user,
        setUser,
        foodLog,
        setFoodLog,
        userNutritionData,
        setUserNutritionData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
