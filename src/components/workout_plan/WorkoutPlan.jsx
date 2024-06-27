import { useState } from "react";
import {
  Card,
  Form,
  Tab,
  Tabs,
  Modal,
  Button,
  Offcanvas,
} from "react-bootstrap";
import styles from "../../css/workout_plan/workoutPlan.module.css";

export default function WorkoutPlan() {
  const [workout, setWorkout] = useState({ name: "", sets: 0, reps: "" });

  let workouts = [];

  function addWorkout(e) {
    e.preventDefault();
    console.log(e.target.form[3].value);
    setWorkout({
      name: e.target.form[1].value,
      sets: e.target.form[2].value,
      reps: e.target.form[3].value,
    });
    workouts.push(workout);
    console.log(workouts);
  }

  return (
    <>
      <Card>
        <Tabs
          defaultActiveKey="+"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="chest" title="Chest"></Tab>
          <Tab eventKey="profile" title="Profile">
            Tab content for Profile
          </Tab>
          <Tab eventKey="addTab" title="+">
            <div>
              <Form className={styles.form}>
                <Form.Group
                  className={styles.titleGroup}
                  controlId="workoutName"
                >
                  <Form.Label>Workout Name</Form.Label>
                  <Form.Control type="email" placeholder="Workout name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exercises">
                  <Form.Label>Exercises</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Exercise Name"
                    name="exerciseName"
                  />
                  <br />
                  <Form.Control type="text" placeholder="Sets" />
                  <br />
                  <Form.Control type="text" placeholder="Reps" name="reps" />
                </Form.Group>

                <Button
                  variant="primary"
                  className={styles.button}
                  onClick={(e) => addWorkout(e)}
                >
                  Add to Workout
                </Button>
                <br />

                <Form.Text className={styles.overview}>
                  <div className={styles.overviewTitle}>Overview</div>
                  <hr />
                  {workouts.map((obj) => (
                    <div>hi</div>
                  ))}
                </Form.Text>

                <br />

                <Button
                  variant="primary"
                  type="submit"
                  className={styles.button}
                >
                  Add
                </Button>
              </Form>
            </div>
          </Tab>
        </Tabs>
      </Card>
    </>
  );
}
