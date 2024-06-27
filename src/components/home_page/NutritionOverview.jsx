import { Card } from "react-bootstrap";
import styles from "../../css/home_page/nutritionOverview.module.css";

export default function NutritionOverview() {
  return (
    <div className={styles.card}>
      <Card>
        <div className={styles.title}>Nutrition</div>
      </Card>
    </div>
  );
}
