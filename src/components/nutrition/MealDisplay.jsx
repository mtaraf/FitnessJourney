import { useEffect, useState } from "react";
import styles from "../../css/nutrition/mealdisplay.module.css";
import { AiOutlinePlusCircle, AiOutlineMinus } from "react-icons/ai";
import { Form, Offcanvas, Modal } from "react-bootstrap";
import CustomButton from "../general/CustomButton";
import { useAppContext } from "../AppContext";
import { updateLogs } from "../../services/logService";

export default function MealDisplay({ title, meals, foods, date }) {
  // Modal states
  const [show, setShow] = useState(false);

  // Log Removal States
  const [isMeal, setIsMeal] = useState(false);
  const [removalEntry, setRemovalEntry] = useState();
  const [removalEntryMeal, setRemovalEntryMeal] = useState("");

  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);

  // Offcanvas states
  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState("");
  const [foodProtein, setFoodProtein] = useState("");
  const [foodCanvas, setFoodCanvas] = useState(false);

  // Validation states
  const [foodErrors, setFoodErrors] = useState({
    name: { value: false, message: "" },
    calories: { value: false, message: "" },
    protein: { value: false, message: "" },
  });

  const { foodLog, setFoodLog, user } = useAppContext();

  useEffect(() => {
    let cal = 0;
    let pro = 0;
    meals?.forEach((meal) => {
      cal += meal.totalCalories;
      pro += meal.totalProtein;
    });

    foods?.forEach((food) => {
      cal += food.calories;
      pro += food.protein;
    });

    setTotalCalories(cal);
    setTotalProtein(pro);
  }, [meals, foods]);

  const ERROR_MESSAGES = {
    NUMBER_TYPE_ERROR: "Please enter a number",
    EMPTY_FORM_VALUE: "Please enter a value",
  };

  const validateAndLogFood = () => {
    let updatedErrors = {
      name: { ...foodErrors.name },
      calories: { ...foodErrors.calories },
      protein: { ...foodErrors.protein },
    };

    let error = false;

    // Validate Calories
    if (!foodCalories.trim()) {
      updatedErrors.calories.message = ERROR_MESSAGES.EMPTY_FORM_VALUE;
      updatedErrors.calories.value = true;
      error = true;
    } else if (isNaN(Number(foodCalories))) {
      updatedErrors.calories.message = ERROR_MESSAGES.NUMBER_TYPE_ERROR;
      updatedErrors.calories.value = true;
      error = true;
    } else {
      updatedErrors.calories.message = "";
      updatedErrors.calories.value = false;
    }

    // Validate Protein
    if (!foodProtein.trim()) {
      updatedErrors.protein.message = ERROR_MESSAGES.EMPTY_FORM_VALUE;
      updatedErrors.protein.value = true;
      error = true;
    } else if (isNaN(Number(foodProtein))) {
      updatedErrors.protein.message = ERROR_MESSAGES.NUMBER_TYPE_ERROR;
      updatedErrors.protein.value = true;
      error = true;
    } else {
      updatedErrors.protein.message = "";
      updatedErrors.protein.value = false;
    }

    // Validate Name
    if (!foodName.trim()) {
      updatedErrors.name.message = ERROR_MESSAGES.EMPTY_FORM_VALUE;
      updatedErrors.name.value = true;
      error = true;
    } else {
      updatedErrors.name.message = "";
      updatedErrors.name.value = false;
    }

    if (error) {
      setFoodErrors(updatedErrors);
      return;
    }

    // Reset Errors
    setFoodErrors({
      name: { value: false, message: "" },
      calories: { value: false, message: "" },
      protein: { value: false, message: "" },
    });

    const newFoodItem = {
      name: foodName,
      protein: Number(foodProtein),
      calories: Number(foodCalories),
    };

    addToLog(newFoodItem, title.toLowerCase());
  };

  const addToLog = (food, entry) => {
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

    setFoodCanvas(false);
    setFoodProtein("");
    setFoodCalories("");
    setFoodName("");
  };

  const removeFromLog = () => {
    // Copy food log
    let updatedFoodLog = [...foodLog];

    // Find and clone entry we want
    let updatedEntryIndex = foodLog.findIndex((log) => log.date === date);

    // Get Log Entry
    let entryToUpdate = { ...updatedFoodLog[updatedEntryIndex] };

    if (isMeal) {
      // Clone meal array to update
      let updatedMealArray = [
        ...(entryToUpdate[removalEntryMeal]?.meals || []),
      ];
      const finalMealArray = updatedMealArray.filter(
        (meal) => meal.title !== removalEntry.title
      );

      // Update entry
      entryToUpdate[removalEntryMeal] = {
        ...entryToUpdate[removalEntryMeal],
        meals: finalMealArray,
      };

      // Replace the entry
      updatedFoodLog[updatedEntryIndex] = entryToUpdate;

      // Update state
      setFoodLog(updatedFoodLog);
    } else {
      // Clone food array to update
      let updatedFoodArray = [
        ...(entryToUpdate[removalEntryMeal]?.foods || []),
      ];
      const finalFoodArray = updatedFoodArray.filter(
        (food) => food.name !== removalEntry.name
      );

      // Update entry
      entryToUpdate[removalEntryMeal] = {
        ...entryToUpdate[removalEntryMeal],
        foods: finalFoodArray,
      };

      // Replace the entry
      updatedFoodLog[updatedEntryIndex] = entryToUpdate;

      // Update state
      setFoodLog(updatedFoodLog);
    }

    console.log("After Removal: ", updatedFoodLog);

    // Send update to food log to backend

    // Update Modal States
    cancelModal();
  };

  const showModal = (isMeal, entry, entryMeal) => {
    setIsMeal(isMeal);
    setRemovalEntry(entry);
    setRemovalEntryMeal(entryMeal);
    setShow(true);
  };

  const cancelModal = () => {
    setIsMeal(false);
    setRemovalEntry({});
    setRemovalEntryMeal("");
    setShow(false);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>{title}</div>
          <div className={styles.addContainer}>
            <div>
              {totalCalories} Cal, {totalProtein}g Pro
            </div>
            <div
              style={{ marginLeft: "10px", cursor: "pointer" }}
              onClick={() => setFoodCanvas(true)}
            >
              <AiOutlinePlusCircle size={25} />
            </div>
          </div>
        </div>
        {meals?.map((meal, index) => (
          <div key={index} className={styles.foodContainer}>
            <AiOutlineMinus
              size={25}
              onClick={() => showModal(true, meal, title.toLowerCase())}
              style={{ cursor: "pointer" }}
            />
            <div>
              <div className={styles.foodTitle}>{meal.title}</div>
              <div className={styles.foodDetails}>
                {meal.totalCalories} Cal, {meal.totalProtein}g Protein
              </div>
            </div>
          </div>
        ))}
        {foods?.map((food, index) => (
          <div key={index} className={styles.foodContainer}>
            <AiOutlineMinus
              size={25}
              onClick={() => showModal(false, food, title.toLowerCase())}
              style={{ cursor: "pointer" }}
            />
            <div>
              <div className={styles.foodTitle}>{food.name}</div>
              <div className={styles.foodDetails}>
                {food.calories} Cal, {food.protein}g Protein
              </div>
            </div>
          </div>
        ))}
      </div>

      <Offcanvas
        show={foodCanvas}
        className={styles.offcanvas}
        onHide={() => setFoodCanvas(false)}
      >
        <Offcanvas.Body>
          <Form>
            <Form.Group className={styles.formGroup}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                className={styles.formControl}
                onChange={(e) => setFoodName(e.target.value)}
                isInvalid={foodErrors.name.value}
              />
              <Form.Control.Feedback type="invalid">
                {foodErrors.name.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label>Calories</Form.Label>
              <Form.Control
                type="text"
                className={styles.formControl}
                onChange={(e) => setFoodCalories(e.target.value)}
                isInvalid={foodErrors.calories.value}
              />
              <Form.Control.Feedback type="invalid">
                {foodErrors.calories.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label>Protein (g)</Form.Label>
              <Form.Control
                type="text"
                className={styles.formControl}
                onChange={(e) => setFoodProtein(e.target.value)}
                isInvalid={foodErrors.protein.value}
              />
              <Form.Control.Feedback type="invalid">
                {foodErrors.protein.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div className={styles.submitButton}>
              <CustomButton
                label={"Submit"}
                onclick={() => validateAndLogFood()}
                width="20%"
              />
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={show} onHide={() => cancelModal()} className={styles.modal}>
        <Modal.Header closeButton className={styles.modalTitle}>
          <Modal.Title>Remove from log?</Modal.Title>
        </Modal.Header>
        <Modal.Footer className={styles.modalFooter}>
          <CustomButton label={"Confirm"} onclick={() => removeFromLog()} />
          <CustomButton label={"Cancel"} onclick={() => cancelModal()} />
        </Modal.Footer>
      </Modal>
    </>
  );
}
