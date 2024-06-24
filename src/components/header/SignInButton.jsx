import { Button, Image } from "react-bootstrap";
import styles from "../../css/header/signInButton.module.css";

export default function SignInButton() {
  return (
    <div className={styles.container}>
      <Button variant="dark" className={styles.button}>
        Sign-In
      </Button>
    </div>
  );
}
