import {
  Card,
  Row,
  Col,
  Container,
  Offcanvas,
  ProgressBar,
} from "react-bootstrap";
import WorkoutCard from "./WorkoutCard";
import styles from "../../css/home_page/workoutOverview.module.css";
import { useState } from "react";

export default function WorkoutOverview({
  workoutTitle,
  workoutDetails,
  weeklyWorkouts,
  weeklyProgress,
}) {
  return (
    <div className={styles.card}>
      <Card>
        <Container fluid>
          <Row>
            <Col sm={3} class="no-gutters">
              <div className={styles.currentWorkout}>
                <div className={styles.title}>Today's Workout</div>
                <div className={styles.subTitle}>{workoutTitle}</div>
                <div>
                  {workoutDetails.map((detail) => (
                    <div className={styles.details}>{detail}</div>
                  ))}
                </div>
              </div>
            </Col>
            <Col sm={9} class="no-gutters">
              <div className={styles.title}>Weekly Progress</div>
              <div>
                <ProgressBar
                  variant="success"
                  now={(weeklyProgress / weeklyWorkouts) * 100}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
}
