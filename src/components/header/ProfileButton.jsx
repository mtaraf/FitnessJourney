import { Button, Modal } from "react-bootstrap";
import styles from "../../css/header/profileButton.module.css";
import { useState } from "react";

export default function ProfileButton({ picture, user }) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className={styles.container}>
      <Button
        className={styles.button}
        onClick={() => {
          setShowProfile(true);
        }}
      >
        <img src={picture} className={styles.image} />
      </Button>

      <Modal
        show={showProfile}
        onHide={() => {
          setShowProfile(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className={styles.title}>
            Hi, {user.username}!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button className={styles.button}>Sign-out</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
