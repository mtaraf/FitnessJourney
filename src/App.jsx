import { useState } from "react";
import "./App.css";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
import Header from "./components/header/Header";
import SideBar from "./components/side_bar/SideBar";
import Home from "./components/home_page/Home";

function App() {
  const [sideBar, setSideBar] = useState(false);

  return (
    <div>
      <Container fluid>
        <Row sm="auto">
          <Header setSideBar={setSideBar} current={sideBar}></Header>
        </Row>
        <Row>
          <Col sm="auto" class="no-gutters">
            <SideBar sideBar={sideBar}></SideBar>
          </Col>
          <Col lg="10">
            <Home />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
