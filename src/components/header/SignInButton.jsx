import { Button, Image } from "react-bootstrap";
import styles from "../../css/header/signInButton.module.css";
import { useState } from "react";
import SignInModal from "./SignInModal";

export default function SignInButton({ setUser }) {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
    console.log("Sign-In button pressed");
  };

  return (
    <div className={styles.container}>
      <Button className={styles.button} onClick={handleClick}>
        Sign-In
      </Button>

      <SignInModal show={show} setShow={setShow} />
    </div>
  );
}
