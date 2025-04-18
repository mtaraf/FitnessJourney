import { Col, Container, Row } from "react-bootstrap";
import { useAppContext } from "../AppContext";
import styles from "../../css/nutrition/nutrition.module.css";
import LogItem from "./LogItem";
import LogDisplay from "./LogDisplay";
import AddFoodDisplay from "./AddFoodDisplay";

export default function Nutrition() {
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

  let log = foodLog.find((log) => log.date === "4/20");

  return (
    <Container fluid>
      <Row xs={12} className={`g-1 ${styles.content}`}>
        <Col xs={{ span: 8, offset: 1 }}>
          <LogDisplay log={log} />
        </Col>
        <Col xs={2} className={styles.sideContainer}>
          <div className={styles.title}>Favorites</div>
          <div className={styles.logItemContainer}>
            {userNutritionData.favorites?.map((item, index) => (
              <LogItem
                key={index}
                onClick={addItem}
                name={item.name}
                calories={item.calories}
                protein={item.protein}
              />
            ))}
          </div>
        </Col>
      </Row>
      <Row xs={12} style={{ marginBottom: "20px" }}>
        <Col xs={{ span: 10, offset: 1 }}>
          <AddFoodDisplay />
        </Col>
      </Row>
    </Container>
  );
}
