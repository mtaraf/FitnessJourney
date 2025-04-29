import { Card } from "react-bootstrap";
import styles from "../../css/home_page/workoutCard.module.css";
import { useState } from "react";

export default function WorkoutCard({ day, title, body }) {
  const [show, setShow] = useState(true);

  function handleClose() {
    setShow(false);
  }

  function handleShow() {
    setShow(true);
  }

  return (
    <div className={styles.card}>
      <Card onClick={() => handleShow()}>
        <div className={styles.title}>{day}</div>
        <div className={styles.subTitle}>{title}</div>
      </Card>
    </div>
  );
}
