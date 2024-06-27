import { Container, Row, Col } from "react-bootstrap";
import WorkoutOverview from "./WorkoutOverview";
import CardioOverview from "./CardioOverview";
import NutritionOverview from "./NutritionOverview";

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

  const cardioDetails = ["Distance: 4.0 km", "Time: 10:00"];

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
        <CardioOverview details={cardioDetails} />
        <NutritionOverview />
      </Row>
    </Container>
  );
}
