import styles from "../../css/header/header.module.css";
import { Row, Col, Container, Button, Image } from "react-bootstrap";
import hamburgerMenuImage from "../../assets/hamburgerMenu.png";
import icon from "../../assets/mainicon.jpg";
import SignInButton from "./SignInButton";

export default function Header({ setSideBar, current }) {
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
          <SignInButton />
        </Col>
      </Row>
    </Container>
  );
}
