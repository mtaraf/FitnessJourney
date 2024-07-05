import { Table } from "react-bootstrap";
import styles from "../../css/workout_plan/workoutDetails.module.css";

export default function WorkoutDetails({ title, details }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div>
        {title !== "Add New Workout" ? (
          <Table striped bordered hover className={styles.table}>
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Weight</th>
                <th>Sets</th>
                <th>Reps</th>
              </tr>
            </thead>
            <tbody>
              {details?.map((exercise) => (
                <tr key={exercise.name}>
                  <td>{exercise.name}</td>
                  <td>{exercise.weight}</td>
                  <td>{exercise.sets}</td>
                  <td>{exercise.reps}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
