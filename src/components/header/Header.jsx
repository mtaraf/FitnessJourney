import styles from "../../css/header/header.module.css";
import { Row, Col, Container, Button, Image, Stack } from "react-bootstrap";
import hamburgerMenuImage from "../../assets/hamburgerMenu.png";
import icon from "../../assets/mainicon.jpg";
import SignInButton from "./SignInButton";
import { useEffect, useState } from "react";
import defaultProfilePic from "../../assets/defaultProfilePic.png";
import ProfileButton from "./ProfileButton";
import homeIcon from "../../assets/homeIcon.png";
import plan from "../../assets/journal.png";
import cardio from "../../assets/cardio.png";
import diet from "../../assets/diet.png";
import { useNavigate } from "react-router";
import { useAppContext } from "../AppContext";

export default function Header() {
  const [signIn, setSignIn] = useState(false);

  const { state, setState, user, setUser } = useAppContext();
  const navigate = useNavigate();

  const profilePictures = [defaultProfilePic];

  useEffect(() => {
    if (user.signedIn) {
      console.log("CALLED");
      setSignIn(true);
    }
  }, [user.signedIn]);

  const navButtons = [
    { name: "Home", icon: homeIcon },
    { name: "Workout", icon: plan },
    { name: "Nutrition", icon: diet },
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
              <img src={icon} className={styles.icon}></img>
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
                <Image src={button.icon} className={styles.navButtonIcon} />
                {button.name}
              </div>
            ))}
          </div>
        </Col>
        <Col className="col-2">
          <div className={styles.profileButton}>
            {signIn ? (
              <ProfileButton
                picture={profilePictures[user.profilePicture]}
                user={user}
              />
            ) : (
              <SignInButton setUser={setUser} />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
