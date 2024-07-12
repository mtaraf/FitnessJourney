import { Button, Card, ListGroup } from "react-bootstrap";
import styles from "../../css/workout_plan/weeklyPlan.module.css";
import { useEffect, useState } from "react";

export default function WeeklyPlan() {
  const [sunday, setSunday] = useState("");
  const [endOfWeek, setEndOfWeek] = useState("");

  // Get Dates for the week to fill title and list
  useEffect(() => {
    const date = new Date();
    const currentDay = date.getDay();
    const offset = (currentDay + 7) % 7;
    const currentSunday = new Date(date);
    currentSunday.setDate(date.getDate() - offset);
    const endOfWeekDate = new Date(date);
    endOfWeekDate.setDate(currentSunday.getDate() + 6);

    const tempCurrentSunday = currentSunday
      .toLocaleDateString()
      .substring(0, 4);

    const tempEndOfWeek = endOfWeekDate.toLocaleDateString().substring(0, 4);

    // Removes leading / if needed
    tempCurrentSunday.charAt(3) === "/"
      ? setSunday(currentSunday.toLocaleDateString().substring(0, 3))
      : setSunday(tempCurrentSunday);

    tempEndOfWeek.charAt(3) === "/"
      ? setEndOfWeek(endOfWeekDate.toLocaleDateString().substring(0, 3))
      : setEndOfWeek(tempEndOfWeek);
  });

  return (
    <>
      <Card className={styles.card}>
        <div className={styles.title}>
          Week: {sunday} - {endOfWeek}
        </div>

        <div className={styles.content}>
          <ListGroup className={styles.list}>
            <ListGroup.Item action className={styles.listItem}>
              Sunday
            </ListGroup.Item>
            <ListGroup.Item action className={styles.listItem}>
              Monday
            </ListGroup.Item>
            <ListGroup.Item action className={styles.listItem}>
              Tuesday
            </ListGroup.Item>
            <ListGroup.Item action className={styles.listItem}>
              Wednesday
            </ListGroup.Item>
            <ListGroup.Item action className={styles.listItem}>
              Thursday
            </ListGroup.Item>
            <ListGroup.Item action className={styles.listItem}>
              Friday
            </ListGroup.Item>
            <ListGroup.Item action className={styles.listItem}>
              Saturday
            </ListGroup.Item>
          </ListGroup>

          <div className={styles.details}>
            <Button className={styles.button}> Edit </Button>
            <div>Hi</div>
          </div>
        </div>
      </Card>
    </>
  );
}
