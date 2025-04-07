import { useEffect, useState } from "react";
import { Card, Offcanvas, ListGroup } from "react-bootstrap";
import styles from "../../css/workout_plan/workoutPlan.module.css";
import WorkoutDetails from "./WorkoutDetails";
import WorkoutForm from "./WorkoutForm";
import WeeklyPlan from "./WeeklyPlan";
import { useAppContext } from "../AppContext";

export default function WorkoutPlan() {
  const [workoutList, setWorkoutList] = useState([]);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(0);

  const { state, setState, user, setUser } = useAppContext();

  // TO-DO: Put this in ENV file
  const USERS_API_URL = "http://localhost:5000/api/users";

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const displayDetails = (index) => {
    setActive(index);
  };

  // change weekly plan of user
  const changeWeeklyPlan = (day, workout) => {
    console.log(day);
    console.log(workout);
    let tempUser = user;
    tempUser.weeklyPlan[day] = workout;
    setUser(tempUser);
    console.log(user);

    updateWeeklyPlanData();
  };

  // update database with new weekly plan for user
  const updateWeeklyPlanData = async () => {
    const updatedWorkouts = { weeklyPlan: user.weeklyPlan };
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

  // populate workout list based on user data
  useEffect(() => {
    if (user.signedIn) {
      setWorkoutList(user.workouts);
    } else {
      setWorkoutList([]);
    }
    console.log("Check Sign In for workout list");
  }, [user.signedIn]);

  return (
    <div className={styles.row}>
      <WeeklyPlan
        user={user}
        workoutList={workoutList}
        changeWeeklyPlan={changeWeeklyPlan}
      />
      <Card className={styles.workoutsCard}>
        {/* Title */}
        <div className={styles.title}>
          {workoutList.length === 0
            ? "Click Button to Add Workout"
            : workoutList[active].title}
        </div>

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

          <div className={styles.details}>
            {/* Displays workout details for active workout*/}
            <div>
              {workoutList.length === 0 ? (
                <WorkoutDetails title="Click Button to Add Workout" />
              ) : (
                <WorkoutDetails
                  title={workoutList[active].title}
                  details={workoutList[active].exercises}
                />
              )}
            </div>
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
            user={user}
            workoutList={workoutList}
            setWorkoutList={setWorkoutList}
            setShow={setShow}
            setActive={setActive}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
