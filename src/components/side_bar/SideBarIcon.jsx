import styles from "../../css/side_bar/sideBarIcon.module.css";
import { Image } from "react-bootstrap";

export default function SideBarIcon({ image, title }) {
  return (
    <div className={styles.container}>
      <button className={styles.button}>
        <div>
          <Image src={image} className={styles.image} />
          <div className={styles.title}>{title}</div>
        </div>
      </button>
    </div>
  );
}
