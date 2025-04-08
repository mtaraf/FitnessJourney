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
import "./css/colors.css";
import Nutrition from "./components/nutrition/Nutrition";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/workout" element={<WorkoutPlan />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/cardio" element={<WorkoutPlan />} />
      </Routes>
    </AppProvider>
  </BrowserRouter>
);
