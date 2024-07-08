import { Button, Form, Modal } from "react-bootstrap";
import styles from "../../css/header/signInModal.module.css";
import { useEffect, useState } from "react";

export default function SignInModal({ show, setShow }) {
  const [loginError, setLoginError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [allowLogin, setAllowLogin] = useState(false);

  const USERS_API_URL = "http://localhost:5000/api/users";

  // Enable login button only if username and password are entered
  useEffect(() => {
    if (loginUsername !== "" && loginPassword !== "") {
      setAllowLogin(true);
    } else {
      setAllowLogin(false);
    }
  }, [loginUsername, loginPassword]);

  // TO-DO: Create use effect for loginError and signUpError to prompt user with errors

  // Creates POST request to create new user
  const postUser = async (user, pass) => {
    const userObj = { username: user, password: pass };

    // Add User if valid
    try {
      const response = await fetch(USERS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        // User added, login user as well
        console.log("User Creation Success");
        return true;
      }
    } catch (e) {
      console.log(e);
    }

    return false;
  };

  // Creates GET request to check if user exists
  const getUser = async (username) => {
    // Check if User exists
    try {
      const response = await fetch(`${USERS_API_URL}/${username}`);
      const data = await response.json();
      console.log(data);

      // If user exists, login user
      if (data !== null && response.status === 200) {
        console.log("Login Success");
        setAllowLogin(false);
        return true;
      }
    } catch (e) {
      console.log(e);
    }

    return false;
  };

  const handleClose = () => {
    setShow(false);
  };

  // Login Functionality
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const success = await getUser(e.target.username.value);
    console.log(success);
    if (success) {
      // Login Successful
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

    const success = await postUser(username, password);

    if (success) {
      // User creation successfull
      setSignUpError(false);
      handleClose();
    } else {
      setSignUpError(true);
      // User creation unsuccessfull
      // TO-DO: display error to user
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign-In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="Enter username"
                name="username"
                onChange={(e) => setLoginUsername(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className={styles.group}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Enter password"
                name="password"
                onChange={(e) => setLoginPassword(e.target.value)}
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

            <Button variant="dark" className={styles.button}>
              Don't have an account? Sign Up!
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
