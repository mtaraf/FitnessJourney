import { Col, Form, Offcanvas, ProgressBar, Row } from "react-bootstrap";
import styles from "../../css/nutrition/addfooddisplay.module.css";
import MealDisplay from "./MealDisplay";
import CustomButton from "../general/CustomButton";
import LogItem from "./LogItem";
import { useState } from "react";

export default function AddFoodDisplay({ meals, foods }) {
  const [mealCanvas, setMealCanvas] = useState(false);
  const [foodCanvas, setFoodCanvas] = useState(false);

  const addFood = (e) => {
    console.log(e.target.parentElement[0].value);
    console.log(e.target.parentElement[1].value);
    console.log(e.target.parentElement[2].value);
    console.log(e);
    setFoodCanvas(false);
  };

  const addMeal = (e) => {
    setMealCanvas(false);
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
            <LogItem addItem={() => {}} name={"hi"} calories={2} protein={2} />
            <LogItem addItem={() => {}} name={"hi"} calories={2} protein={2} />
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
            <LogItem addItem={() => {}} name={"hi"} calories={2} protein={2} />
            <LogItem addItem={() => {}} name={"hi"} calories={2} protein={2} />
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
              onclick={(e) => addMeal(e)}
              width="20%"
            />
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
