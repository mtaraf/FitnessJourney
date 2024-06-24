import {
  Collapse,
  Nav,
  Col,
  Container,
  Row,
  Image,
  ListGroup,
  Button,
} from "react-bootstrap";
import styles from "../../css/side_bar/sideBar.module.css";
import testImage from "../../assets/test.png";
import homeIcon from "../../assets/homeIcon.png";
import plan from "../../assets/journal.png";
import cardio from "../../assets/cardio.png";
import diet from "../../assets/diet.png";
import SideBarIcon from "./SideBarIcon";

export default function SideBar({ sideBar }) {
  const alertClicked = () => {
    alert("You clicked the third ListGroupItem");
  };

  return (
    <div className={styles.container}>
      {sideBar ? (
        <ListGroup>
          <ListGroup.Item
            action
            onClick={() => alertClicked()}
            className={styles.listItem}
          >
            <SideBarIcon image={testImage} title="Hola" />
          </ListGroup.Item>
          <ListGroup.Item action onClick={() => alertClicked()}>
            <SideBarIcon image={testImage} title="Hola" />
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <div>
          <SideBarIcon image={homeIcon} title="Home" />
          <SideBarIcon image={plan} title="Workout Plan" />
          <SideBarIcon image={cardio} title="Cardio" />
          <SideBarIcon image={diet} title="Nutrition" />
        </div>
      )}
    </div>
  );
}
