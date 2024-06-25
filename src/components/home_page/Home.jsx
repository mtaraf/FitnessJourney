import { Container, Row, Col } from "react-bootstrap";
import WorkoutOverview from "./WorkoutOverview";

export default function Home() {
  const details = [
    "Chest Press: 4 x 6-10",
    "Bench Press: 4 x 6-10",
    "Chest Press: 4 x 6-10",
    "Bench Press: 4 x 6-10",
    "Bench Press: 4 x 6-10",
    "Chest Press: 4 x 6-10",
    "Bench Press: 4 x 6-10",
  ];

  return (
    <Container fluid>
      <Row>
        <WorkoutOverview
          workoutTitle={"Chest"}
          workoutDetails={details}
          weeklyProgress={2}
          weeklyWorkouts={5}
        />
      </Row>
      <Row>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
