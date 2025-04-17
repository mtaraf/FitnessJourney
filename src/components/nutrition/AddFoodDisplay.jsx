import { Form, Offcanvas } from "react-bootstrap";
import styles from "../../css/nutrition/addfooddisplay.module.css";
import CustomButton from "../general/CustomButton";
import LogItem from "./LogItem";
import { useState } from "react";
import { useAppContext } from "../AppContext";

export default function AddFoodDisplay({ meals, foods }) {
  const [mealCanvas, setMealCanvas] = useState(false);
  const [foodCanvas, setFoodCanvas] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);

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

  const addFood = (e) => {
    const newFood = {
      name: e.target.parentElement[0].value,
      calories: Number(e.target.parentElement[1].value),
      protein: Number(e.target.parentElement[2].value),
    };

    e.target.parentElement[0].value = "";

    let updatedUserNutrition = userNutritionData;

    updatedUserNutrition.foods = [...updatedUserNutrition.foods, newFood];

    // Update database here

    setFoodCanvas(false);
  };

  const addMeal = (e) => {
    let totalCalories = 0;
    let totalProtein = 0;

    ingredientList.forEach((item) => {
      totalCalories += item.calories;
      totalProtein += item.protein;
    });

    const newMeal = {
      title: e.target.parentElement.parentElement[0].value,
      foods: ingredientList,
      totalCalories: totalCalories,
      totalProtein: totalProtein,
    };

    let updatedUserNutrition = userNutritionData;

    updatedUserNutrition.meals = [...updatedUserNutrition.meals, newMeal];

    setUserNutritionData(updatedUserNutrition);

    // update database here

    setIngredientList([]);
    setMealCanvas(false);
  };

  const addIngredient = (e) => {
    let item = {
      name: e.target.parentElement[1].value,
      calories: Number(e.target.parentElement[2].value),
      protein: Number(e.target.parentElement[3].value),
    };
    e.target.parentElement[1].value = "";
    e.target.parentElement[2].value = "";
    e.target.parentElement[3].value = "";
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
            {userNutritionData.meals?.map((meal) => (
              <LogItem
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
            {userNutritionData.foods?.map((food) => (
              <LogItem
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
              <Form.Control type="text" className={styles.formControl} />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label>Enter Ingredients</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                className={styles.formControl}
              />
              <Form.Control
                type="text"
                placeholder="Calories"
                className={styles.formControl}
              />
              <Form.Control
                type="text"
                placeholder="Protein"
                className={styles.formControl}
              />
            </Form.Group>
            <CustomButton
              label={"Add"}
              onclick={(e) => addIngredient(e)}
              width="20%"
            />
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
                onclick={(e) => addMeal(e)}
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
              <Form.Control type="text" className={styles.formControl} />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label>Calories</Form.Label>
              <Form.Control type="text" className={styles.formControl} />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label>Protein</Form.Label>
              <Form.Control type="text" className={styles.formControl} />
            </Form.Group>
            <div className={styles.submitButton}>
              <CustomButton
                label={"Submit"}
                onclick={(e) => addFood(e)}
                width="20%"
              />
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
