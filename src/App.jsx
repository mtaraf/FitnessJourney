import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Row, Col, Offcanvas, Modal, Button } from "react-bootstrap";
import Header from "./components/header/Header";
import SideBar from "./components/side_bar/SideBar";
import Home from "./components/home_page/Home";
import WorkoutPlan from "./components/workout_plan/WorkoutPlan";

function App() {
  const [sideBar, setSideBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [user, setUser] = useState({
    signedIn: false,
    profilePicture: 0,
    username: "",
    workouts: [],
  });

  return (
    <>
      <Container fluid>
        <Row>
          <Header
            setSideBar={setSideBar}
            current={sideBar}
            user={user}
            setUser={setUser}
          ></Header>
        </Row>
        <Row>
          <Col xs="auto">
            <SideBar sideBar={sideBar} setCurrent={setCurrentPage}></SideBar>
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
    </>
  );
}

export default App;
