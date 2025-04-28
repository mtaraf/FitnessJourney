import { Col, ProgressBar, Row } from "react-bootstrap";
import styles from "../../css/nutrition/logdisplay.module.css";
import MealDisplay from "./MealDisplay";
import { useEffect, useState } from "react";
import { useAppContext } from "../AppContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function LogDisplay({ log, setLogDate, date }) {
  const [dailyCalories, setDailyCalories] = useState(0);
  const [dailyProtein, setDailyProtein] = useState(0);

  const [startDate, setStartDate] = useState(new Date());

  const { user } = useAppContext();

  const calculateInformation = () => {
    let tempCalories = 0;
    let tempProtein = 0;
    if (log !== undefined) {
      for (const [key, value] of Object.entries(log)) {
        value?.meals?.forEach((meal) => {
          tempCalories += meal.totalCalories;
          tempProtein += meal.totalProtein;
        });
        value?.foods?.forEach((food) => {
          tempCalories += food.calories;
          tempProtein += food.protein;
        });
      }
    }
    setDailyCalories(tempCalories);
    setDailyProtein(tempProtein);
  };

  useEffect(() => {
    calculateInformation();
  }, [log]);

  useEffect(() => {
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0");
    const day = String(startDate.getDate()).padStart(2, "0");
    const formattedDate = `${month}/${day}/${year}`;
    setLogDate(formattedDate);
  }, [startDate]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Food Log</div>
        <div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className={styles.datePicker}
          />
        </div>
      </div>
      <Row>
        <Col xs={6}>
          <MealDisplay
            meals={log?.breakfast?.meals}
            foods={log?.breakfast?.foods}
            title={"Breakfast"}
            date={date}
          />
          <MealDisplay
            meals={log?.lunch?.meals}
            foods={log?.lunch?.foods}
            title={"Lunch"}
            date={date}
          />
          <MealDisplay
            meals={log?.dinner?.meals}
            foods={log?.dinner?.foods}
            title={"Dinner"}
            date={date}
          />
          <MealDisplay
            meals={log?.everythingElse?.meals}
            foods={log?.everythingElse?.foods}
            title={"Everything else"}
            date={date}
          />
        </Col>
        <Col xs={3}>
          <div className={styles.barContainer}>
            <div>Daily Calories</div>
            <div className={styles.bar}>
              <CircularProgressbar
                value={
                  user.goals?.calorie_goal
                    ? (dailyCalories / user.goals?.calorie_goal) * 100
                    : 0
                }
                text={`${dailyCalories} / ${
                  user.goals?.calorie_goal ? user.goals.calorie_goal : "~"
                }`}
                styles={buildStyles({
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "round",

                  // Text size
                  textSize: "14px",

                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,

                  // Colors
                  pathColor: `rgba(62, 152, 199)`,
                  textColor: "#f9f4f0",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#3e98c7",
                })}
              />
            </div>
          </div>
        </Col>
        <Col xs={3}>
          <div className={styles.barContainer}>
            <div>Daily Protein</div>
            {/* <ProgressBar
              className={styles.bar}
              now={(15 / 100) * 100}
              label="15/100"
            /> */}
            <div className={styles.bar}>
              <CircularProgressbar
                value={
                  user.goals?.protein_goal
                    ? (dailyProtein / user.goals?.protein_goal) * 100
                    : 0
                }
                text={`${dailyProtein} / ${
                  user.goals?.protein_goal ? user.goals.protein_goal : "~"
                }`}
                styles={buildStyles({
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "round",

                  // Text size
                  textSize: "14px",

                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,

                  // Colors
                  pathColor: `rgba(62, 152, 199)`,
                  textColor: "#f9f4f0",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#3e98c7",
                })}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
