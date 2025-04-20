import { useEffect, useState } from "react";
import styles from "../../css/nutrition/mealdisplay.module.css";

export default function MealDisplay({ title, meals, foods }) {
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);

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

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>{title}</div>
        <div>
          {totalCalories} Cal, {totalProtein}g Pro
        </div>
      </div>
      {meals?.map((meal, index) => (
        <div key={index} className={styles.foodContainer}>
          <div className={styles.foodTitle}>{meal.title}</div>
          <div className={styles.foodDetails}>
            {meal.totalCalories} Cal, {meal.totalProtein}g Protein
          </div>
        </div>
      ))}
      {foods?.map((food, index) => (
        <div key={index} className={styles.foodContainer}>
          <div className={styles.foodTitle}>{food.name}</div>
          <div className={styles.foodDetails}>
            {food.calories} Cal, {food.protein}g Protein
          </div>
        </div>
      ))}
    </div>
  );
}
