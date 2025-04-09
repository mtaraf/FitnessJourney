import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState("home");
  const [user, setUser] = useState({
    signedIn: false,
    profilePicture: 0,
    username: "",
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

  return (
    <AppContext.Provider
      value={{ state, setState, user, setUser, foodLog, setFoodLog }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
