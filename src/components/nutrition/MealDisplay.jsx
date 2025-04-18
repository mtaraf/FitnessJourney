import styles from "../../css/nutrition/mealdisplay.module.css";

export default function MealDisplay({ meal }) {
  let totalCalories = 0;
  let totalProtein = 0;
  meal?.foods.forEach((food) => {
    totalCalories += food.calories;
    totalProtein += food.protein;
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>{meal.title}</div>
        <div>
          {totalCalories} Cal, {totalProtein}g Pro
          {/* TO-DO: Maybe add rating to meals here in the future */}
        </div>
      </div>
      {meal?.foods.map((food, index) => (
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
