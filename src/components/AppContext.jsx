import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserNutrition } from "../services/userNutritionService";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState("home");
  const [user, setUser] = useState({
    signedIn: false,
    profilePicture: 0,
    username: "test",
    workouts: [],
    weeklyPlan: [],
  });
  const [foodLog, setFoodLog] = useState([
    {
      date: "4/20",
      meals: [
        {
          title: "Breakfast",
          foods: [
            { name: "Sandwich", calories: 400, protein: 54 },
            { name: "Yogurt", calories: 100, protein: 14 },
          ],
        },
        {
          title: "Lunch",
          foods: [],
        },
        {
          title: "Dinner",
          foods: [],
        },
      ],
    },
  ]);
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
    };

    fetchData();
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
