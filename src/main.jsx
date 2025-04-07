import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/home_page/Home";
import WorkoutPlan from "./components/workout_plan/WorkoutPlan";
import { AppProvider } from "./components/AppContext";
import Header from "./components/header/Header";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./components/side_bar/SideBar";
import "./css/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <Header />
      <Container fluid>
        <Row>
          <Col xs="auto">
            <SideBar />
          </Col>
          <Col>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workout" element={<WorkoutPlan />} />
              <Route path="/nutrition" element={<WorkoutPlan />} />
              <Route path="/cardio" element={<WorkoutPlan />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </AppProvider>
  </BrowserRouter>
);
