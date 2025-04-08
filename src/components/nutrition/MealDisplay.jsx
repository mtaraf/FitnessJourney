import styles from "../../css/nutrition/mealdisplay.module.css";

export default function MealDisplay({ mealTitle }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>{mealTitle}</div>
    </div>
  );
}
