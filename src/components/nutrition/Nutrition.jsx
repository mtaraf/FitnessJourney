import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import { useAppContext } from "../AppContext";
import styles from "../../css/nutrition/nutrition.module.css";
import { CircularProgressbar } from "react-circular-progressbar";
import LogItem from "./LogItem";
import MealDisplay from "./MealDisplay";

export default function Nutrition() {
  const { state, setState, user, setUser, foodLog, setFoodLog } =
    useAppContext();

  let displayed_log = foodLog.filter((log) => log.date);

  const addItem = () => {
    console.log("Item Added");
  };

  return (
    <Container fluid>
      <Row xs={12} className={`g-1 ${styles.content}`}>
        <Col xs={9} className={styles.mainContainer}>
          <div className={styles.title}>Food Log</div>
          <Row>
            <Col>
              <MealDisplay mealTitle={"Breakfast"} />
              <div>
                <div>Lunch</div>
              </div>
              <div>
                <div>Dinner</div>
              </div>
            </Col>
            <Col>
              <div className={styles.barContainer}>
                <div>Calories</div>
                <ProgressBar
                  className={styles.bar}
                  now={(15 / 100) * 100}
                  label="15/100"
                />
              </div>
              <div className={styles.barContainer}>
                <div>Protein</div>
                <ProgressBar
                  className={styles.bar}
                  now={(15 / 100) * 100}
                  label="15/100"
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={2} className={styles.sideContainer}>
          <div className={styles.title}>Favorites</div>
          <LogItem
            addItem={addItem}
            name={"Banana"}
            information={{ protein: 5, calories: 150 }}
          />
        </Col>
      </Row>
      <Row xs={12}>
        <Col xs={6}></Col>
        <Col xs={6}></Col>
      </Row>
    </Container>
  );
}
