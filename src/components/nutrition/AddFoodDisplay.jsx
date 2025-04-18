import { Form, Offcanvas } from "react-bootstrap";
import styles from "../../css/nutrition/addfooddisplay.module.css";
import CustomButton from "../general/CustomButton";
import LogItem from "./LogItem";
import { useState } from "react";
import { useAppContext } from "../AppContext";
import { getUser } from "../../services/userService";

export default function AddFoodDisplay({ meals, foods }) {
  // Modal states
  const [mealCanvas, setMealCanvas] = useState(false);
  const [foodCanvas, setFoodCanvas] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);

  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState("");
  const [foodProtein, setFoodProtein] = useState("");

  const [mealName, setMealName] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientCalories, setIngredientCalories] = useState("");
  const [ingredientProtein, setIngredientProtein] = useState("");

  const {
    state,
    setState,
    user,
    setUser,
    foodLog,
    setFoodLog,
    userNutritionData,
    setUserNutritionData,
  } = useAppContext();

  const addFood = () => {
    const newFood = {
      name: foodName,
      calories: Number(foodCalories),
      protein: Number(foodProtein),
    };

    let updatedUserNutrition = userNutritionData;

    updatedUserNutrition.foods = [...updatedUserNutrition.foods, newFood];

    // Update database here

    setFoodName("");
    setFoodCalories("");
    setFoodProtein("");
    setFoodCanvas(false);
  };

  const addMeal = () => {
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

    let updatedUserNutrition = userNutritionData;

    updatedUserNutrition.meals = [...updatedUserNutrition.meals, newMeal];

    setUserNutritionData(updatedUserNutrition);

    // update database here

    setMealName("");
    setIngredientList([]);
    setMealCanvas(false);
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
            {userNutritionData.meals?.map((meal, index) => (
              <LogItem
                key={index}
                onClick={() => {}}
                name={meal.title}
                calories={meal.totalCalories}
                protein={meal.totalProtein}
              />
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
            {userNutritionData.foods?.map((food, index) => (
              <LogItem
                key={index}
                onClick={() => {}}
                name={food.name}
                calories={food.calories}
                protein={food.protein}
              />
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
              />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label>Enter Ingredients</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                className={styles.formControl}
                onChange={(e) => setIngredientName(e.target.value)}
                value={ingredientName}
              />
              <Form.Control
                type="text"
                placeholder="Calories"
                className={styles.formControl}
                onChange={(e) => setIngredientCalories(e.target.value)}
                value={ingredientCalories}
              />
              <Form.Control
                type="text"
                placeholder="Protein"
                className={styles.formControl}
                onChange={(e) => setIngredientProtein(e.target.value)}
                value={ingredientProtein}
              />
            </Form.Group>
            <div className={styles.submitButton}>
              <CustomButton
                label={"Add"}
                onclick={() => addIngredient()}
                width="20%"
              />
            </div>
            {ingredientList?.map((ingredient, index) => (
              <LogItem
                key={index}
                onClick={() => removeIngredient(ingredient.name)}
                name={ingredient.name}
                calories={ingredient.calories}
                protein={ingredient.protein}
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
              />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label>Calories</Form.Label>
              <Form.Control
                type="text"
                className={styles.formControl}
                onChange={(e) => setFoodCalories(e.target.value)}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label>Protein</Form.Label>
              <Form.Control
                type="text"
                className={styles.formControl}
                onChange={(e) => setFoodProtein(e.target.value)}
              />
            </Form.Group>
            <div className={styles.submitButton}>
              <CustomButton
                label={"Submit"}
                onclick={() => addFood()}
                width="20%"
              />
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
