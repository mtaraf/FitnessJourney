import { Form, Offcanvas } from "react-bootstrap";
import styles from "../../css/nutrition/addfooddisplay.module.css";
import CustomButton from "../general/CustomButton";
import LogItem from "./LogItem";
import { useEffect, useState } from "react";
import { useAppContext } from "../AppContext";
import {
  createUserNutrition,
  updateUserNutrition,
} from "../../services/userNutritionService";

export default function AddFoodDisplay({ date }) {
  // Modal states
  const [mealCanvas, setMealCanvas] = useState(false);
  const [foodCanvas, setFoodCanvas] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);

  // Validation states
  const [foodErrors, setFoodErrors] = useState({
    name: { value: false, message: "" },
    calories: { value: false, message: "" },
    protein: { value: false, message: "" },
  });
  const [ingredientErrors, setIngredientErrors] = useState({
    name: { value: false, message: "" },
    calories: { value: false, message: "" },
    protein: { value: false, message: "" },
  });
  const [mealNameValidation, setMealNameValidation] = useState(false);

  // Modal states
  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState("");
  const [foodProtein, setFoodProtein] = useState("");
  const [mealName, setMealName] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientCalories, setIngredientCalories] = useState("");
  const [ingredientProtein, setIngredientProtein] = useState("");

  // Search states
  const [foodSearch, setFoodSearch] = useState("");
  const [foodSearchList, setFoodSearchList] = useState([]);
  const [mealSearch, setMealSearch] = useState("");
  const [mealSearchList, setMealSearchList] = useState([]);

  // App context
  const { user, userNutritionData, setUserNutritionData } = useAppContext();

  // update lists to filter
  useEffect(() => {
    setFoodSearchList(userNutritionData.foods);
    setMealSearchList(userNutritionData.meals);
  }, [userNutritionData]);

  // filter food list
  useEffect(() => {
    let filteredList = [];
    if (foodSearch.length > 0) {
      filteredList = userNutritionData.foods.filter((food) =>
        food.name.toLowerCase().startsWith(foodSearch)
      );
    } else {
      filteredList = userNutritionData.foods;
    }
    setFoodSearchList(filteredList);
  }, [foodSearch]);

  // filter meal list
  useEffect(() => {
    let filteredList = [];
    if (mealSearch.length > 0) {
      filteredList = userNutritionData.meals.filter((meal) =>
        meal.title.toLowerCase().startsWith(mealSearch)
      );
    } else {
      filteredList = userNutritionData.meals;
    }
    setMealSearchList(filteredList);
  }, [mealSearch]);

  const ERROR_MESSAGES = {
    NUMBER_TYPE_ERROR: "Please enter a number",
    EMPTY_FORM_VALUE: "Please enter a value",
  };

  const validateAndAddFood = () => {
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

    addFood();
  };

  const addFood = async () => {
    const newFood = {
      name: foodName,
      calories: Number(foodCalories),
      protein: Number(foodProtein),
    };

    let updatedUserNutrition = {};
    let response = {};

    if (userNutritionData.foods === undefined) {
      updatedUserNutrition = {
        meals: [],
        foods: [newFood],
        favorites: [],
      };
      setUserNutritionData(updatedUserNutrition);

      const data = {
        username: user.username,
        meals: updatedUserNutrition.meals,
        foods: updatedUserNutrition.foods,
        favorites: updatedUserNutrition.favorites,
      };

      // API call to create data to user's nutrition information
      response = await createUserNutrition(data);
    } else {
      updatedUserNutrition = {
        ...userNutritionData,
        foods: [...userNutritionData.foods, newFood], // updating one key while copying others
      };

      setUserNutritionData(updatedUserNutrition);

      const data = {
        username: user.username,
        meals: updatedUserNutrition.meals,
        foods: updatedUserNutrition.foods,
        favorites: updatedUserNutrition.favorites,
      };

      // API call to create data to user's nutrition information
      response = await updateUserNutrition(user.username, updatedUserNutrition);
    }

    console.log("Add food api response: ", response);

    if (response.status !== 200) {
      // Add an error modal here eventually
    }

    setFoodName("");
    setFoodCalories("");
    setFoodProtein("");
    setFoodCanvas(false);
  };

  const addMeal = async () => {
    if (!mealName.trim()) {
      setMealNameValidation(true);
      return;
    }

    setMealNameValidation(false);

    let totalCalories = 0;
    let totalProtein = 0;

    ingredientList.forEach((item) => {
      totalCalories += item.calories;
      totalProtein += item.protein;
    });

    const newMeal = {
      title: mealName,
      foods: ingredientList,
      totalCalories: totalCalories,
      totalProtein: totalProtein,
    };

    let updatedUserNutrition = {
      ...userNutritionData,
      meals: [...userNutritionData.meals, newMeal], // updating one key while copying others
    };

    setUserNutritionData(updatedUserNutrition);

    // API call to add data to user's nutrition information
    const response = await updateUserNutrition(
      user.username,
      updatedUserNutrition
    );

    if (response.status !== 200) {
      // Add an error modal here eventually
    }

    setMealName("");
    setIngredientList([]);
    setMealCanvas(false);
  };

  const validateAndAddIngredient = () => {
    let updatedErrors = {
      name: { ...ingredientErrors.name },
      calories: { ...ingredientErrors.calories },
      protein: { ...ingredientErrors.protein },
    };

    let error = false;

    // Validate Calories
    if (!ingredientCalories.trim()) {
      updatedErrors.calories.message = ERROR_MESSAGES.EMPTY_FORM_VALUE;
      updatedErrors.calories.value = true;
      error = true;
    } else if (isNaN(Number(ingredientCalories))) {
      updatedErrors.calories.message = ERROR_MESSAGES.NUMBER_TYPE_ERROR;
      updatedErrors.calories.value = true;
      error = true;
    } else {
      updatedErrors.calories.message = "";
      updatedErrors.calories.value = false;
    }

    // Validate Protein
    if (!ingredientProtein.trim()) {
      updatedErrors.protein.message = ERROR_MESSAGES.EMPTY_FORM_VALUE;
      updatedErrors.protein.value = true;
      error = true;
    } else if (isNaN(Number(ingredientProtein))) {
      updatedErrors.protein.message = ERROR_MESSAGES.NUMBER_TYPE_ERROR;
      updatedErrors.protein.value = true;
      error = true;
    } else {
      updatedErrors.protein.message = "";
      updatedErrors.protein.value = false;
    }

    // Validate Name
    if (!ingredientName.trim()) {
      updatedErrors.name.message = ERROR_MESSAGES.EMPTY_FORM_VALUE;
      updatedErrors.name.value = true;
      error = true;
    } else {
      updatedErrors.name.message = "";
      updatedErrors.name.value = false;
    }

    setIngredientErrors(updatedErrors);

    if (error) {
      return;
    }

    // Reset Errors
    setIngredientErrors({
      name: { value: false, message: "" },
      calories: { value: false, message: "" },
      protein: { value: false, message: "" },
    });

    addIngredient();
  };

  const addIngredient = () => {
    let item = {
      name: ingredientName,
      calories: Number(ingredientCalories),
      protein: Number(ingredientProtein),
    };

    setIngredientName("");
    setIngredientProtein("");
    setIngredientCalories("");
    setIngredientList([...ingredientList, item]);
  };

  const removeIngredient = (name) => {
    const updatedList = ingredientList.filter(
      (ingredient) => ingredient.name !== name
    );
    if (updatedList.length === 0) {
      setIngredientList([]);
    } else {
      setIngredientList(updatedList);
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <div className={styles.subTitleBar}>
            <div className={styles.title}>My Meals</div>
            <div style={{ margin: "5px 0px" }}>
              <CustomButton
                label={"Add Meal"}
                onclick={() => setMealCanvas(true)}
              />
            </div>
          </div>
          <div className={styles.items}>
            <Form.Control
              type="text"
              placeholder="Search meals"
              className={styles.searchControl}
              onChange={(e) => setMealSearch(e.target.value)}
              value={mealSearch}
            />
            {mealSearchList?.map((meal, index) => (
              <LogItem key={index} onClick={() => {}} meal={meal} date={date} />
            ))}
          </div>
        </div>
        <div className={styles.subContainer}>
          <div className={styles.subTitleBar}>
            <div className={styles.title}>My Foods</div>
            <div style={{ margin: "5px 0px" }}>
              <CustomButton
                label={"Add Food"}
                onclick={() => setFoodCanvas(true)}
              />
            </div>
          </div>
          <div className={styles.items}>
            <Form.Control
              type="text"
              placeholder="Search foods"
              className={styles.searchControl}
              onChange={(e) => setFoodSearch(e.target.value)}
              value={foodSearch}
            />
            {foodSearchList?.map((food, index) => (
              <LogItem key={index} onClick={() => {}} food={food} date={date} />
            ))}
          </div>
        </div>
      </div>

      <Offcanvas
        show={mealCanvas}
        className={styles.offcanvas}
        onHide={() => setMealCanvas(false)}
      >
        <Offcanvas.Body>
          <Form>
            <Form.Group className={styles.formGroup}>
              <Form.Label>Meal Name</Form.Label>
              <Form.Control
                type="text"
                className={styles.formControl}
                onChange={(e) => setMealName(e.target.value)}
                isInvalid={mealNameValidation}
              />
              <Form.Control.Feedback type="invalid">
                {ERROR_MESSAGES.EMPTY_FORM_VALUE}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label>Enter Ingredients</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                className={styles.formControl}
                onChange={(e) => setIngredientName(e.target.value)}
                value={ingredientName}
                isInvalid={ingredientErrors.name.value}
              />
              <Form.Control.Feedback type="invalid">
                {ingredientErrors.name.message}
              </Form.Control.Feedback>
              <Form.Control
                type="text"
                placeholder="Calories"
                className={styles.formControl}
                onChange={(e) => setIngredientCalories(e.target.value)}
                value={ingredientCalories}
                isInvalid={ingredientErrors.calories.value}
              />
              <Form.Control.Feedback type="invalid">
                {ingredientErrors.calories.message}
              </Form.Control.Feedback>
              <Form.Control
                type="text"
                placeholder="Protein (g)"
                className={styles.formControl}
                onChange={(e) => setIngredientProtein(e.target.value)}
                value={ingredientProtein}
                isInvalid={ingredientErrors.protein.value}
              />
              <Form.Control.Feedback type="invalid">
                {ingredientErrors.protein.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div className={styles.submitButton}>
              <CustomButton
                label={"Add"}
                onclick={() => validateAndAddIngredient()}
                width="20%"
              />
            </div>
            {ingredientList?.map((ingredient, index) => (
              <LogItem
                key={index}
                onClick={() => removeIngredient(ingredient.name)}
                food={ingredient}
                subtractButton={true}
              />
            ))}
            <div className={styles.submitButton}>
              <CustomButton
                label={"Submit"}
                onclick={() => addMeal()}
                width="20%"
              />
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

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
                onclick={() => validateAndAddFood()}
                width="20%"
              />
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
