import { Col, ProgressBar, Row } from "react-bootstrap";
import styles from "../../css/nutrition/addfooddisplay.module.css";
import MealDisplay from "./MealDisplay";
import CustomButton from "../general/CustomButton";

export default function AddFoodDisplay({ meals, foods }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.subTitleBar}>
          <div className={styles.title}>My Meals</div>
          <CustomButton label={"Add Meal"} onclick={() => {}} />
        </div>
      </div>
      <div className={styles.foodContainer}>My meals</div>
    </div>
  );
}
