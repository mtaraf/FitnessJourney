import { ListGroup } from "react-bootstrap";
import styles from "../../css/side_bar/sideBar.module.css";
import testImage from "../../assets/test.png";
import homeIcon from "../../assets/homeIcon.png";
import plan from "../../assets/journal.png";
import cardio from "../../assets/cardio.png";
import diet from "../../assets/diet.png";
import SideBarIcon from "./SideBarIcon";

export default function SideBar() {
  return (
    <div className={styles.container}>
      <div>
        <SideBarIcon image={homeIcon} title="Home" />
        <SideBarIcon image={plan} title="Workout Plan" />
        <SideBarIcon image={cardio} title="Cardio" />
        <SideBarIcon image={diet} title="Nutrition" />
      </div>
    </div>
  );
}
