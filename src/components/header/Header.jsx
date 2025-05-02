import styles from "../../css/header/header.module.css";
import { Row, Col, Container, Button } from "react-bootstrap";
import SignInButton from "./SignInButton";
import { useEffect, useState } from "react";
import ProfileButton from "./ProfileButton";
import { useLocation, useNavigate } from "react-router";
import { useAppContext } from "../AppContext";
import { IoHomeOutline } from "react-icons/io5";
import { FaDumbbell } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";

export default function Header() {
  const [signIn, setSignIn] = useState(false);

  const { state, setState, user, setUser } = useAppContext();
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (user.signedIn) {
      setSignIn(true);
    }
  }, [user.signedIn]);

  useEffect(() => {
    setState(location.pathname.slice(1));
  });

  const navButtons = [
    { name: "Home", icon: <IoHomeOutline /> },
    { name: "Workout", icon: <FaDumbbell /> },
    { name: "Nutrition", icon: <LuNotebookPen /> },
  ];

  return (
    <Container fluid className={styles.container}>
      <Row className="g-0">
        <Col className="col-2">
          <div className={styles.iconButton}>
            <Button
              className={styles.button}
              onClick={() => {
                navigate("/");
                setState("home");
              }}
            >
              Journey
            </Button>
          </div>
        </Col>
        <Col className="col-8">
          <div className={styles.navButtons}>
            {navButtons.map((button, index) => (
              <div
                key={index}
                className={`${
                  state === button.name.toLowerCase()
                    ? styles.activeNavButton
                    : ""
                } ${styles.navButton}`}
                onClick={() => {
                  navigate(button.name.toLowerCase());
                  setState(button.name.toLowerCase());
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {button.icon}
                  {button.name}
                </div>
              </div>
            ))}
          </div>
        </Col>
        <Col className="col-2">
          <div className={styles.profileButton}>
            {signIn ? (
              <ProfileButton user={user} />
            ) : (
              <SignInButton setUser={setUser} />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
