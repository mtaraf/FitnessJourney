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
      date: "",
      meals: [
        {
          title: "Sandwich",
          calories: 900,
          protein: 90,
        },
      ],
      calories: 0,
      protein: 0,
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
