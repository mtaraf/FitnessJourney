import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserNutrition } from "../services/userNutritionService";
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

  useEffect(() => {
    // Check if user is logged in first
    const fetchData = async () => {
      // User Nutrition Data
      let nutritionDataResponse = await getUserNutrition(user.username);
      if (nutritionDataResponse.status == 200) {
        setUserNutritionData({
          meals: nutritionDataResponse.data[0].meals,
          foods: nutritionDataResponse.data[0].foods,
          favorites: nutritionDataResponse.data[0].favorites,
        });
      }

      // Logs
      let userNutritionLogsResponse = await getLogs(user.username);
      if (userNutritionLogsResponse.status == 200) {
        console.log(userNutritionLogsResponse.data?.log);
        setFoodLog(userNutritionLogsResponse.data?.log);
      }
    };

    fetchData();
    console.log(foodLog);
  }, []);

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
