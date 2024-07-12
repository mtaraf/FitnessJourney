import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "../../css/workout_plan/workoutForm.module.css";

export default function WorkoutForm({
  workoutList,
  setWorkoutList,
  setShow,
  setActive,
  user,
}) {
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setWorkouts] = useState([]);
  const [validExercise, setValidExercise] = useState(true);
  const [validWorkoutTitle, setValidWorkoutTitle] = useState(true);
  const [validWorkoutExercises, setValidWorkoutExercises] = useState(true);

  // TO-DO: Put this in ENV file
  const USERS_API_URL = "http://localhost:5000/api/users";

  // Adds exercises to workout overview
  // To-Do: add error checking, check if values are empty
  const addExercise = (e) => {
    e.preventDefault();
    console.log(e);

    // Check if Exercise name, sets, and reps are filled out
    if (
      e.target.form[1].value === "" ||
      e.target.form[2].value === "" ||
      e.target.form[3].value === ""
    ) {
      setValidExercise(false);
      return;
    }

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

    // Empty Form Control Values
    e.target.form[1].value = "";
    e.target.form[2].value = "";
    e.target.form[3].value = "";

    // Set Workout Title
    setWorkoutName(e.target.form[0].value);

    //sets Workouts
    setWorkouts(tempAry);

    // resets error checking
    setValidExercise(true);
  };

  // Adds workout to workoutList and user database entry
  const addWorkout = (e) => {
    // Set Workout Title
    setWorkoutName(e.target.form[0].value);
    console.log(workoutName);
    console.log(e.target.form[0].value);

    // Error checking
    if (!workoutName) {
      setValidWorkoutTitle(false);
      return;
    } else if (exercises.length === 0) {
      setValidWorkoutExercises(false);
      return;
    }

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

    // updates user database with new workout
    updateUserWorkouts(tempList);

    // resets error checking
    setValidWorkoutTitle(true);
    setValidWorkoutExercises(true);
  };

  const updateUserWorkouts = async (newList) => {
    const updatedWorkouts = { workouts: newList };
    try {
      const response = await fetch(`${USERS_API_URL}/${user.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedWorkouts),
      });
    } catch (error) {
      console.log(error);
    }
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
          {/* Validation Instructions for the exercise form */}
          {validExercise ? (
            <Form.Text muted>Press button to add exercise to workout</Form.Text>
          ) : (
            <Form.Text className={styles.invalid}>
              Please add all exercise details before adding to workout
            </Form.Text>
          )}
        </Form.Group>

        <Button
          variant="primary"
          className={styles.button}
          onClick={(e) => addExercise(e)}
        >
          Add Exercise
        </Button>
        <br />

        <Form.Text className={styles.overview}>
          <div className={styles.overviewTitle}>Overview</div>
          <hr />
          {exercises.map((obj) => (
            <div key={obj.name}>
              {obj.name}: {obj.sets} x {obj.reps}
            </div>
          ))}
        </Form.Text>

        <br />
        {/* Validation Instructions for the entire form */}
        {!validWorkoutTitle ? (
          <Form.Text className={styles.invalid}>
            Please add a workout title
          </Form.Text>
        ) : !validWorkoutExercises ? (
          <Form.Text className={styles.invalid}>
            Please add atleast one exercise to workout
          </Form.Text>
        ) : (
          ""
        )}
        <Button
          variant="primary"
          className={styles.button}
          onClick={(e) => addWorkout(e)}
        >
          Add Workout
        </Button>
      </Form>
    </>
  );
}
