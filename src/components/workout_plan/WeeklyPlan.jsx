import { Button, Card, Table, Modal, Form } from "react-bootstrap";
import styles from "../../css/workout_plan/weeklyPlan.module.css";
import { useEffect, useState } from "react";
import CalendarItem from "./CalendarItem";

export default function WeeklyPlan({ user, workoutList, changeWeeklyPlan }) {
  // Display Modal
  const [show, setShow] = useState(false);

  // Day for Modal Title
  const [editDay, setEditDay] = useState(0);

  // Update dates for the weekl
  const [dates, setDates] = useState([]);

  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get Dates for the week to fill title and list
  useEffect(() => {
    const date = new Date();
    const currentDay = date.getDay();
    const offset = (currentDay + 7) % 7;
    const currentSunday = new Date(date);
    currentSunday.setDate(date.getDate() - offset);
    let currentDate = "";
    let tempList = [];
    for (let i = 0; i < 7; i++) {
      currentDate =
        (currentSunday.getMonth() + 1).toString() +
        "/" +
        currentSunday.getDate().toString();
      tempList.push(currentDate);
      currentSunday.setDate(currentSunday.getDate() + 1);
    }
    tempList.concat(dates);
    setDates(tempList);
  }, []);

  // Set workout for day of the week
  const addWorkoutToWeeklyPlan = (day) => {
    console.log("workout added to weekly plan");

    // Set day of the week to change
    setEditDay(day);

    // Display Modal
    setShow(true);
  };

  // Close Modal
  const handleClose = () => {
    setShow(false);
  };

  // Submit Modal Form Data
  const updateWeeklyPlan = (e) => {
    const title = e.target.form[0].value;
    const workout = workoutList.find((obj) => obj.title === title);

    // update user and database
    changeWeeklyPlan(editDay, workout);

    // close modal
    setShow(false);
  };

  return (
    <>
      <Card className={styles.card}>
        <div className={styles.title}>Weekly Plan</div>
        <Table bordered className={styles.table}>
          <tbody>
            <tr>
              {dates.map((date, index) => (
                <td key={date} onClick={() => addWorkoutToWeeklyPlan(index)}>
                  <CalendarItem
                    date={date}
                    title={
                      user.weeklyPlan[index]
                        ? user.weeklyPlan[index].title
                        : "-"
                    }
                    exercises={
                      user.weeklyPlan[index]
                        ? user.weeklyPlan[index].exercises
                        : []
                    }
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      </Card>

      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>{daysOfTheWeek[editDay]}</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Select Workout</Form.Label>
            <Form.Select>
              {workoutList.map((workout) => (
                <option key={workout.title} value={workout.title}>
                  {workout.title}
                </option>
              ))}
            </Form.Select>
            <Button
              variant="dark"
              className={styles.modalButton}
              onClick={(e) => updateWeeklyPlan(e)}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
