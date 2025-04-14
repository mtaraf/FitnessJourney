import { Col, ProgressBar, Row } from "react-bootstrap";
import styles from "../../css/nutrition/logdisplay.module.css";
import MealDisplay from "./MealDisplay";

export default function LogDisplay({ log }) {
  const changeDate = (date) => {
    console.log(date);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Food Log</div>
      </div>
      <Row>
        <Col>
          {log.meals?.map((meal, index) => (
            <MealDisplay key={index} meal={meal} />
          ))}
        </Col>
        <Col>
          <div className={styles.barContainer}>
            <div>Calories</div>
            <ProgressBar
              className={styles.bar}
              now={(15 / 100) * 100}
              label="15/100"
            />
          </div>
          <div className={styles.barContainer}>
            <div>Protein</div>
            <ProgressBar
              className={styles.bar}
              now={(15 / 100) * 100}
              label="15/100"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
