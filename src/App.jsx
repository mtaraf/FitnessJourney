import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./css/app.module.css";
import { Container, Row, Col, Offcanvas, Modal, Button } from "react-bootstrap";
import Header from "./components/header/Header";
import SideBar from "./components/side_bar/SideBar";
import Home from "./components/home_page/Home";
import WorkoutPlan from "./components/workout_plan/WorkoutPlan";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [user, setUser] = useState({
    signedIn: false,
    profilePicture: 0,
    username: "",
    workouts: [],
    weeklyPlan: [],
  });

  return (
    <Container fluid className={styles.container}>
      <Row>
        <Header
          setCurrent={setCurrentPage}
          user={user}
          setUser={setUser}
        ></Header>
      </Row>
      <Row className={styles.mainRow}>
        <Col xs="auto">
          <SideBar setCurrent={setCurrentPage} />
        </Col>
        <Col>
          {currentPage == 0 ? (
            <WorkoutPlan user={user} setUser={setUser} />
          ) : (
            <Home />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
