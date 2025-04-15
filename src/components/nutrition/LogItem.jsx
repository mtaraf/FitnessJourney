import { Button } from "react-bootstrap";
import styles from "../../css/nutrition/logitem.module.css";
import { AiOutlinePlusCircle, AiOutlineMinus } from "react-icons/ai";

export default function LogItem({
  onClick,
  name,
  calories,
  protein,
  addButton = true,
  subtractButton = false,
}) {
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
          onClick();
        }}
        hidden={!addButton}
      >
        {subtractButton ? (
          <AiOutlineMinus size={25} />
        ) : (
          <AiOutlinePlusCircle size={25} />
        )}
      </div>
    </div>
  );
}
