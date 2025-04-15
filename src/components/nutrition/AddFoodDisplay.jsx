import {
  Button,
  Col,
  Form,
  InputGroup,
  Offcanvas,
  ProgressBar,
  Row,
} from "react-bootstrap";
import styles from "../../css/nutrition/addfooddisplay.module.css";
import MealDisplay from "./MealDisplay";
import CustomButton from "../general/CustomButton";
import LogItem from "./LogItem";
import { useState } from "react";

export default function AddFoodDisplay({ meals, foods }) {
  const [mealCanvas, setMealCanvas] = useState(false);
  const [foodCanvas, setFoodCanvas] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);

  const addFood = (e) => {
    console.log(e.target.parentElement[0].value);
    console.log(e.target.parentElement[1].value);
    console.log(e.target.parentElement[2].value);
    console.log(e);

    e.target.parentElement[0].value = "";
    setFoodCanvas(false);
  };

  const addMeal = (e) => {
    setMealCanvas(false);
  };

  const addIngredient = (e) => {
    let item = {
      name: e.target.parentElement[1].value,
      calories: e.target.parentElement[2].value,
      protein: e.target.parentElement[3].value,
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
            <LogItem onClick={() => {}} name={"hi"} calories={2} protein={2} />
            <LogItem onClick={() => {}} name={"hi"} calories={2} protein={2} />
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
            <LogItem onClick={() => {}} name={"hi"} calories={2} protein={2} />
            <LogItem onClick={() => {}} name={"hi"} calories={2} protein={2} />
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
            <div style={{ marginTop: "30px" }}>
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
            <CustomButton
              label={"Submit"}
              onclick={(e) => addFood(e)}
              width="20%"
            />
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
