import { Col, Container, Row } from "react-bootstrap";
import { useAppContext } from "../AppContext";
import styles from "../../css/nutrition/nutrition.module.css";
import LogDisplay from "./LogDisplay";
import AddFoodDisplay from "./AddFoodDisplay";
import { useEffect, useState } from "react";

export default function Nutrition() {
  const [logDate, setLogDate] = useState("");
  const [currentLog, setCurrentLog] = useState({});

  const { foodLog } = useAppContext();

  useEffect(() => {
    setCurrentLog(foodLog?.find((log) => log.date === logDate));
  }, [foodLog]);

  useEffect(() => {
    console.log("Food Log ", foodLog);
    console.log("Log Date: ", logDate);
    setCurrentLog(foodLog.find((log) => log.date === logDate));
  }, [logDate]);

  return (
    <>
      <Container fluid>
        <Row xs={12} className={`g-1 ${styles.content}`}>
          <Col xs={{ span: 10, offset: 1 }}>
            <LogDisplay
              log={currentLog}
              setLogDate={setLogDate}
              date={logDate}
            />
          </Col>
          {/* <Col xs={2} className={styles.sideContainer}>
            <div className={styles.title}>Favorites</div>
            <div className={styles.logItemContainer}>
              {userNutritionData.favorites?.map((item, index) => (
                // <LogItem
                //   key={index}
                //   onClick={addItem}
                //   food={}
                // />
                <div></div>
              ))}
            </div>
          </Col> */}
        </Row>
        <Row xs={12} style={{ marginBottom: "20px" }}>
          <Col xs={{ span: 10, offset: 1 }}>
            <AddFoodDisplay date={logDate} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
