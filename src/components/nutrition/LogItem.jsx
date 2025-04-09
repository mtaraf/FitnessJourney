import { Button } from "react-bootstrap";
import styles from "../../css/nutrition/logitem.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function LogItem({ addItem, name, calories, protein }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.information}>
        <div className={styles.title}>{name}</div>
        <div className={styles.detailText}>
          {calories} calories, {protein}g protein
        </div>
      </div>
      <div
        className={styles.addIcon}
        onClick={() => {
          addItem();
        }}
      >
        <AiOutlinePlusCircle size={25} />
      </div>
    </div>
  );
}
