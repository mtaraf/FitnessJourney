import { Button, Dropdown, Modal } from "react-bootstrap";
import styles from "../../css/header/profileButton.module.css";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";

export default function ProfileButton({ user }) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className={styles.container}>
      <Dropdown>
        <Dropdown.Toggle className={styles.button}>
          <CgProfile style={{ width: "25px", height: "25px" }} />
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.buttonMenu}>
          <Dropdown.Item className={styles.buttonMenuItem}>
            My Profile
          </Dropdown.Item>
          <Dropdown.Item className={styles.buttonMenuItem}>
            Settings
          </Dropdown.Item>
          <Dropdown.Item className={styles.buttonMenuItem}>
            Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

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
