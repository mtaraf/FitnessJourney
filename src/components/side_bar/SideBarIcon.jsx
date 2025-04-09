import styles from "../../css/side_bar/sideBarIcon.module.css";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function SideBarIcon({ image, title }) {
  const navigate = useNavigate();
  function setCurrentPage() {
    switch (title) {
      case "Home":
        navigate("/");
        break;
      case "Workout Plan":
        navigate("/workout");
        break;
      case "Cardio":
        break;
      case "Nutrition":
        navigate("/nutrition");
        break;
      default:
        console.error("Error changing page");
    }
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
