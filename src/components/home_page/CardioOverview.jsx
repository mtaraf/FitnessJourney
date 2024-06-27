import { Card } from "react-bootstrap";
import styles from "../../css/home_page/cardioOverview.module.css";

export default function CardioOverview({ details }) {
  return (
    <div className={styles.card}>
      <Card>
        <div className={styles.title}>Cardio</div>
        <div>
          {details.map((detail) => (
            <div>{detail}</div>
          ))}
        </div>
      </Card>
    </div>
  );
}
