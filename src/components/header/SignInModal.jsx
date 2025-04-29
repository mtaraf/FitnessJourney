import { Button, Form, Modal } from "react-bootstrap";
import styles from "../../css/header/signInModal.module.css";
import { useEffect, useState } from "react";
import { createUser, getUser } from "../../services/userService";
import { useAppContext } from "../AppContext";

export default function SignInModal({ show, setShow }) {
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Error checking
  const [loginError, setLoginError] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [allowLogin, setAllowLogin] = useState(false);

  const { setUser } = useAppContext();

  // Enable login button only if username and password are entered
  useEffect(() => {
    if (loginUsername !== "" && loginPassword !== "") {
      setAllowLogin(true);
    } else {
      setAllowLogin(false);
    }
  }, [loginUsername, loginPassword]);

  const handleClose = () => {
    setDisplaySignUp(false);
    setShow(false);
  };

  // Login Functionality
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await getUser(loginUsername);

    if (response.status === 200) {
      // Login Successful
      const tempUser = {
        signedIn: true,
        username: response.data.username,
        workouts: response.data.workouts,
        weeklyPlan: response.data.weeklyPlan,
        goals: response.data.goals,
        information: response.data.information,
      };
      setUser(tempUser);
      console.log("Successful Login by: ", tempUser);
      setLoginError(false);
      handleClose();
    } else {
      setLoginError(true);
      // Login Unsuccessful
      // TO-DO display error to user
    }
  };

  // Sign-Up Functionality
  const handleSignUp = async (e) => {
    e.preventDefault();
    const username = e.target.signUpUsername.value;
    const password = e.target.signUpPassword.value;

    const newUser = {
      username: e.target.signUpUsername.value,
      password: e.target.signUpPassword.value,
    };

    // Create User
    const response = await createUser(newUser);

    // Create User Nutrition Logs

    // Create User Nutrition Data

    if (response.status === 200) {
      // User creation successfull
      setDisplaySignUp(false);
      setSignUpError("");
      handleClose();
    } else {
      // User creation unsuccessfull
      // TO-DO: display error to user
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>{displaySignUp ? "Join Today!" : "Sign-In"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Change Form if sign-up button clicked */}

          {displaySignUp ? (
            <Form onSubmit={handleSignUp}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="Enter username"
                  name="signUpUsername"
                  onChange={(e) => setLoginUsername(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className={styles.group}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  placeholder="Enter password"
                  name="signUpPassword"
                  onChange={(e) => setLoginPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Text>{signUpError}</Form.Text>

              <Button
                type="submit"
                variant="dark"
                className={styles.button}
                disabled={!allowLogin}
              >
                Sign Up
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handleLogin}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="Enter username"
                  name="username"
                  onChange={(e) => setLoginUsername(e.target.value)}
                  value={loginUsername}
                ></Form.Control>
              </Form.Group>

              <Form.Group className={styles.group}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  placeholder="Enter password"
                  name="password"
                  onChange={(e) => setLoginPassword(e.target.value)}
                  value={loginPassword}
                ></Form.Control>
              </Form.Group>

              <Button
                type="submit"
                variant="dark"
                className={styles.button}
                disabled={!allowLogin}
              >
                Log In
              </Button>

              <Button
                variant="dark"
                className={styles.button}
                onClick={() => {
                  setDisplaySignUp(true);
                }}
              >
                Don't have an account? Sign Up!
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
