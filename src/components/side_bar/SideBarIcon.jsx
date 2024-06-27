import styles from "../../css/side_bar/sideBarIcon.module.css";
import { Image } from "react-bootstrap";

export default function SideBarIcon({ image, title, setCurrent }) {
  function setCurrentPage() {
    switch (title) {
      case "Home":
        setCurrent(0);
        break;
      case "Workout Plan":
        setCurrent(1);
        break;
      case "Cardio":
        setCurrent(2);
        break;
      case "Nutrition":
        setCurrent(3);
        break;
      default:
        console.error("Error changing page");
    }
    console.log(title);
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => setCurrentPage()}>
        <div>
          <Image src={image} className={styles.image} />
          <div className={styles.title}>{title}</div>
        </div>
      </button>
    </div>
  );
}
