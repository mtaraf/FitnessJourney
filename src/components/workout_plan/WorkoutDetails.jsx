import styles from "../../css/workout_plan/workoutDetails.module.css";

export default function WorkoutDetails({ title }) {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
    </div>
  );
}
