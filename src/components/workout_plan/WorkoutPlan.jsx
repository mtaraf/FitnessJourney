import { useState } from "react";
import {
  Card,
  Form,
  Tab,
  Tabs,
  Modal,
  Button,
  Offcanvas,
  ListGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import styles from "../../css/workout_plan/workoutPlan.module.css";
import WorkoutDetails from "./WorkoutDetails";
import WorkoutForm from "./WorkoutForm";
import WeeklyPlan from "./WeeklyPlan";

export default function WorkoutPlan() {
  const [workoutList, setWorkoutList] = useState([]);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(0);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const displayDetails = (index) => {
    setActive(index);
  };

  return (
    <div className={styles.row}>
      <Card className={styles.workoutsCard}>
        <div className={styles.container}>
          <ListGroup className={styles.list}>
            {/* Displays all workouts created */}
            {workoutList.map((obj, index) => (
              <ListGroup.Item
                action
                className={styles.listItem}
                onClick={() => displayDetails(index)}
                key={obj.title}
              >
                {obj.title}
              </ListGroup.Item>
            ))}

            <ListGroup.Item
              action
              onClick={handleShow}
              className={styles.listItem}
              key="add"
            >
              Add Workout
            </ListGroup.Item>
          </ListGroup>

          {/* Displays workout details for active workout*/}
          <div className={styles.details}>
            {workoutList.length === 0 ? (
              <WorkoutDetails title="Add New Workout" />
            ) : (
              <WorkoutDetails title={workoutList[active].title} />
            )}
          </div>
        </div>
      </Card>

      {/* Add Form to Offcanvas */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop="false"
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Workout</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <WorkoutForm
            workoutList={workoutList}
            setWorkoutList={setWorkoutList}
            setShow={setShow}
            setActive={setActive}
          />
        </Offcanvas.Body>
      </Offcanvas>

      <WeeklyPlan />
    </div>
  );
}
