import styles from "../../css/workout_plan/calendarItem.module.css";

export default function CalendarItem({ day, date, title, exercises }) {
  return (
    <div className={styles.item}>
      <div className={styles.calendarTitle}>
        <div disabled className={styles.date}>
          {date}
        </div>
        <div className={styles.workoutTitle}>{title !== "" ? title : "-"}</div>
      </div>
      <ul>
        {exercises?.map((item) => (
          <li key={item.name}>
            {item.name}: {item.weight} , {item.sets} x {item.reps}
          </li>
        ))}
      </ul>
    </div>
  );
}
