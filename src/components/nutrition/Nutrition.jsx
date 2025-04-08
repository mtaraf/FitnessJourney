import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import { useAppContext } from "../AppContext";
import styles from "../../css/nutrition/nutrition.module.css";
import { CircularProgressbar } from "react-circular-progressbar";

export default function Nutrition() {
  const { state, setState, user, setUser, foodLog, setFoodLog } =
    useAppContext();

  let displayed_log = foodLog.filter((log) => log.date);

  return (
    <Container fluid>
      <Row xs={12} className={`g-1 ${styles.content}`}>
        <Col xs={9} className={styles.mainContainer}>
          <div className={styles.title}>Food Log</div>
          <Row>
            <Col>hi</Col>
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
        <Col xs={3}>
          <div>hu</div>
          <div>hu</div>
        </Col>
      </Row>
    </Container>
  );
}
