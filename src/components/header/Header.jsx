import styles from "../../css/header/header.module.css";
import { Row, Col, Container, Button, Image } from "react-bootstrap";
import hamburgerMenuImage from "../../assets/hamburgerMenu.png";
import icon from "../../assets/mainicon.jpg";
import SignInButton from "./SignInButton";
import { useEffect, useState } from "react";
import defaultProfilePic from "../../assets/defaultProfilePic.png";
import ProfileButton from "./ProfileButton";

export default function Header({ setSideBar, current, user, setUser }) {
  const [signIn, setSignIn] = useState(false);

  const profilePictures = [defaultProfilePic];

  useEffect(() => {
    if (user.signedIn) {
      console.log("CALLED");
      setSignIn(true);
    }
  }, [user.signedIn]);

  return (
    <Container fluid className={styles.container}>
      <Row>
        <Col xs="auto">
          <button
            className={styles.hamburgerButton}
            onClick={() => setSideBar(!current)}
          >
            <img src={hamburgerMenuImage} className={styles.image} />
          </button>
        </Col>
        <Col xs={1}>
          <div className={styles.heading}>
            <img src={icon} className={styles.icon}></img>
            <div className={styles.title}>Journey</div>
          </div>
        </Col>
        <Col>
          {signIn ? (
            <ProfileButton
              picture={profilePictures[user.profilePicture]}
              user={user}
            />
          ) : (
            <SignInButton setUser={setUser} />
          )}
        </Col>
      </Row>
    </Container>
  );
}
