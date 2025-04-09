import styles from "../../css/general/custom_button.module.css";

export default function CustomButton({ label, onclick }) {
  return <div className={styles.mainContainer}>{label}</div>;
}
