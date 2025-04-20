import { Col, Container, Modal, Row } from "react-bootstrap";
import { useAppContext } from "../AppContext";
import styles from "../../css/nutrition/nutrition.module.css";
import LogItem from "./LogItem";
import LogDisplay from "./LogDisplay";
import AddFoodDisplay from "./AddFoodDisplay";
import { useEffect, useState } from "react";
import { data } from "react-router";

export default function Nutrition() {
  const [logDate, setLogDate] = useState();
  const [currentLog, setCurrentLog] = useState({});

  const [showLogModal, setShowLogModal] = useState(false);

  const {
    state,
    setState,
    user,
    setUser,
    foodLog,
    setFoodLog,
    userNutritionData,
  } = useAppContext();

  const addItem = () => {
    console.log("Item Added");
  };

  // useEffect(() => {
  //   // setCurrentLog(foodLog.find((log) => log.date === "04/19/2025"));
  // }, [logDate]);

  // useEffect(() => {
  //   // const date = new Date();
  //   // const yyyy = date.getFullYear();
  //   // const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  //   // const dd = String(date.getDate()).padStart(2, "0");
  //   // const formattedDate = `${yyyy}/${mm}/${dd}`;

  //   // setLogDate(formattedDate);
  //   setLogDate("04/19/2025");
  //   // console.log(foodLog.find((log) => log.date === "04/19/2025"));
  //   // setCurrentLog(foodLog.find((log) => log.date === "04/19/2025"));
  //   console.log("FOOD LOG: ", foodLog);
  // }, [foodLog, logDate]);

  useEffect(() => {
    console.log("HI ", foodLog);
    setCurrentLog(foodLog.find((log) => log.date === "04/19/2025"));
  }, [foodLog]);

  return (
    <>
      <Container fluid>
        <Row xs={12} className={`g-1 ${styles.content}`}>
          <Col xs={{ span: 8, offset: 1 }}>
            <LogDisplay log={currentLog} />
          </Col>
          <Col xs={2} className={styles.sideContainer}>
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
          </Col>
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
