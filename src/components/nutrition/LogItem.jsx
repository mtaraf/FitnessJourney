import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import styles from "../../css/nutrition/logitem.module.css";
import { AiOutlinePlusCircle, AiOutlineMinus } from "react-icons/ai";
import { useAppContext } from "../AppContext";
import { updateLogs } from "../../services/logService";

export default function LogItem({
  onClick,
  food = {},
  meal = {},
  addButton = true,
  subtractButton = false,
  date,
}) {
  const { foodLog, setFoodLog, user } = useAppContext();

  const LOG_ENTRY_NAMES = {
    BREAKFAST: "breakfast",
    LUNCH: "lunch",
    DINNER: "dinner",
    EVERYTHING_ELSE: "everythingElse",
  };

  let calories = 0;
  let protein = 0;
  let name = 0;
  let isMeal = Object.keys(food).length === 0;

  if (isMeal) {
    calories = meal.totalCalories;
    protein = meal.totalProtein;
    name = meal.title;
  } else {
    calories = food.calories;
    protein = food.protein;
    name = food.name;
  }

  const logFood = (food, entry) => {
    // Copy food log
    let updatedFoodLog = [...foodLog];

    // Find and clone entry we want
    let updatedEntryIndex = foodLog.findIndex((log) => log.date === date);

    // If no data for the current date, add new data to log
    if (updatedEntryIndex === -1) {
      // Create new log entry object
      const newlogEntry = {
        date: date,
        breakfast: {
          foods: [],
          meals: [],
        },
        lunch: { foods: [], meals: [] },
        dinner: { foods: [], meals: [] },
        everythingElse: { foods: [], meals: [] },
      };

      // add food to the correcty entry (breakfast, lunch, dinner, or everythingElse)
      newlogEntry[entry].foods.push(food);

      // add entry to updated food log
      updatedFoodLog.push(newlogEntry);

      // update the foodLog context
      setFoodLog(updatedFoodLog);

      // Send update to food log to backend
      const data = {
        username: user.username,
        log: updatedFoodLog,
      };
      const response = updateLogs(user.username, data);

      if (response.status !== 200) {
        // Add error resolution here
      }

      console.log("Created new log entry: ", updatedFoodLog);

      return;
    } else {
      let entryToUpdate = { ...updatedFoodLog[updatedEntryIndex] };

      // Clone food array to update
      let updatedFoodArray = [...(entryToUpdate[entry]?.foods || [])];
      updatedFoodArray.push(food);

      // update entry with new food array
      entryToUpdate[entry] = {
        ...entryToUpdate[entry],
        foods: updatedFoodArray,
      };

      // Replace the entry
      updatedFoodLog[updatedEntryIndex] = entryToUpdate;

      // Update state
      setFoodLog(updatedFoodLog);
      console.log("Updated Food Log: ", foodLog);

      // Send update to food log to backend
      const data = {
        username: user.username,
        log: updatedFoodLog,
      };
      const response = updateLogs(user.username, data);

      if (response.status !== 200) {
        // add error prompt here
      }
    }
  };

  const logMeal = (meal, entry) => {
    // Copy food log
    let updatedFoodLog = [...foodLog];

    // Find and clone entry we want
    //let updatedEntry = foodLog.find((log) => log.date === "04/19/2025");
    let updatedEntryIndex = foodLog.findIndex((log) => log.date === date);

    // If no data for the current date, add new data to log
    if (updatedEntryIndex === -1) {
      // Create new log entry object
      const newlogEntry = {
        date: date,
        breakfast: {
          foods: [],
          meals: [],
        },
        lunch: { foods: [], meals: [] },
        dinner: { foods: [], meals: [] },
        everythingElse: { foods: [], meals: [] },
      };

      // add food to the correcty entry (breakfast, lunch, dinner, or everythingElse)
      newlogEntry[entry].meals.push(meal);

      // add entry to updated food log
      updatedFoodLog.push(newlogEntry);

      // update the foodLog context
      setFoodLog(updatedFoodLog);

      // Send update to food log to backend
      const data = {
        username: user.username,
        log: updatedFoodLog,
      };
      const response = updateLogs(user.username, data);

      if (response.status !== 200) {
        // Add error resolution here
      }

      console.log("Created new log entry: ", updatedFoodLog);

      return;
    } else {
      let entryToUpdate = { ...updatedFoodLog[updatedEntryIndex] };

      // Clone food array to update
      let updatedMealArray = [...(entryToUpdate[entry]?.meals || [])];
      updatedMealArray.push(meal);

      // update entry with new food array
      entryToUpdate[entry] = {
        ...entryToUpdate[entry],
        meals: updatedMealArray,
      };

      // Replace the entry
      updatedFoodLog[updatedEntryIndex] = entryToUpdate;

      // Update state
      setFoodLog(updatedFoodLog);
      console.log("Updated Food Log: ", foodLog);

      // Send update to food log to backend
      const data = {
        username: user.username,
        log: updatedFoodLog,
      };
      const response = updateLogs(user.username, data);

      if (response.status !== 200) {
        // add error prompt here
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.information}>
        <div className={styles.title}>{name}</div>
        <div className={styles.detailText}>
          {calories} calories, {protein}g protein
        </div>
      </div>
      <div
        className={styles.addIcon}
        onClick={() => {
          onClick();
        }}
        hidden={!addButton}
      >
        {subtractButton ? (
          <AiOutlineMinus size={25} />
        ) : (
          <Dropdown>
            <Dropdown.Toggle className={styles.dropdownButton}>
              <AiOutlinePlusCircle size={25} />
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.dropdownMenu}>
              <Dropdown.Item
                className={styles.dropdownItem}
                onClick={
                  isMeal
                    ? () => logMeal(meal, LOG_ENTRY_NAMES.BREAKFAST)
                    : () => logFood(food, LOG_ENTRY_NAMES.BREAKFAST)
                }
              >
                Breakfast
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.dropdownItem}
                onClick={
                  isMeal
                    ? () => logMeal(meal, LOG_ENTRY_NAMES.LUNCH)
                    : () => logFood(food, LOG_ENTRY_NAMES.LUNCH)
                }
              >
                Lunch
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.dropdownItem}
                onClick={
                  isMeal
                    ? () => logMeal(meal, LOG_ENTRY_NAMES.DINNER)
                    : () => logFood(food, LOG_ENTRY_NAMES.DINNER)
                }
              >
                Dinner
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.dropdownItem}
                onClick={
                  isMeal
                    ? () => logMeal(meal, LOG_ENTRY_NAMES.EVERYTHING_ELSE)
                    : () => logFood(food, LOG_ENTRY_NAMES.EVERYTHING_ELSE)
                }
              >
                Everything Else
              </Dropdown.Item>
              {/* <Dropdown.Item
                className={styles.dropdownItem}
                onClick={
                  isMeal
                    ? () => addToFavorites(meal)
                    : () => addToFavorites(food)
                }
              >
                Favorites
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
          // <AiOutlinePlusCircle size={25} />
        )}
      </div>
    </div>
  );
}
