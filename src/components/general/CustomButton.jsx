import styles from "../../css/general/custom_button.module.css";

export default function CustomButton({ label, onclick, width = "100%" }) {
  return (
    <div
      className={styles.mainContainer}
      onClick={onclick}
      style={{ width: width }}
    >
      {label}
    </div>
  );
}
