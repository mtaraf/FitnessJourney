import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "../../css/workout_plan/workoutForm.module.css";

export default function WorkoutForm({
  workoutList,
  setWorkoutList,
  setShow,
  setActive,
}) {
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setWorkouts] = useState([]);

  // Adds exercises to workout overview
  // To-Do: add error checking, check if values are empty
  const addExercise = (e) => {
    e.preventDefault();
    console.log(e);

    // Use temporary array to set workouts state
    const tempAry = [
      ...exercises,
      {
        name: e.target.form[1].value,
        sets: e.target.form[2].value,
        reps: e.target.form[3].value,
        weight: "-",
      },
    ];

    setWorkoutName(e.target.form[0].value);

    // Empty Form Control Values
    e.target.form[1].value = "";
    e.target.form[2].value = "";
    e.target.form[3].value = "";

    setWorkouts(tempAry);
  };

  const addWorkout = () => {
    console.log("Added Workout");
    const newWorkout = { title: workoutName, exercises: exercises };
    const tempList = [...workoutList, newWorkout];

    // Sets active workout to the one just created
    setActive(workoutList.length);
    setShow(false);

    // Resets workName and workouts for form
    setWorkoutName("");
    setWorkouts([]);

    // adds new workout to workout list
    setWorkoutList(tempList);
  };

  return (
    <>
      <Form className={styles.form}>
        <Form.Group className={styles.titleGroup} controlId="workoutName">
          <Form.Label>Workout Name</Form.Label>
          <Form.Control placeholder="e.g., Pull, Push, Legs" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exercises">
          <Form.Label>Exercises</Form.Label>
          <Form.Control placeholder="Exercise Name" name="exerciseName" />
          <br />
          <Form.Control type="text" placeholder="Sets" />
          <br />
          <Form.Control type="text" placeholder="Reps" name="reps" />
          <Form.Text muted>Press button to add exercise to workout</Form.Text>
        </Form.Group>

        <Button
          variant="primary"
          className={styles.button}
          onClick={(e) => addExercise(e)}
        >
          Add to Workout
        </Button>
        <br />

        <Form.Text className={styles.overview}>
          <div className={styles.overviewTitle}>Overview</div>
          <hr />
          <div>{workoutName}</div>
          {exercises.map((obj) => (
            <div key={obj.name}>
              {obj.name}: {obj.sets} x {obj.reps}
            </div>
          ))}
        </Form.Text>

        <br />

        <Button
          variant="primary"
          className={styles.button}
          onClick={() => addWorkout()}
        >
          Add Workout
        </Button>
      </Form>
    </>
  );
}
