import { Card, Row, Col, Container, ProgressBar } from "react-bootstrap";
import styles from "../../css/home_page/workoutOverview.module.css";

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
            <Col sm={3}>
              <div className={styles.currentWorkout}>
                <div className={styles.title}>Weight Lifting</div>
                <div className={styles.subTitle}>{workoutTitle}</div>
                <div>
                  {workoutDetails.map((detail) => (
                    <div className={styles.details} key={detail}>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col sm={9}>
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
