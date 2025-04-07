import styles from "../../css/header/header.module.css";
import { Row, Col, Container, Button, Image, Stack } from "react-bootstrap";
import hamburgerMenuImage from "../../assets/hamburgerMenu.png";
import icon from "../../assets/mainicon.jpg";
import SignInButton from "./SignInButton";
import { useEffect, useState } from "react";
import defaultProfilePic from "../../assets/defaultProfilePic.png";
import ProfileButton from "./ProfileButton";

export default function Header() {
  const [signIn, setSignIn] = useState(false);

  const profilePictures = [defaultProfilePic];

  const setCurrent = () => {};
  const user = "";
  const setUser = () => {};

  useEffect(() => {
    if (user.signedIn) {
      console.log("CALLED");
      setSignIn(true);
    }
  }, [user.signedIn]);

  const changePage = (title) => {
    switch (title) {
      case "Home":
        setCurrent(0);
        break;
      case "Workout Plan":
        setCurrent(1);
        break;
      case "Cardio":
        setCurrent(2);
        break;
      case "Nutrition":
        setCurrent(3);
        break;
      default:
        console.error("Error changing page");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconButton}>
        <Button className={styles.button} onClick={() => changePage("Home")}>
          <img src={icon} className={styles.icon}></img>
          Journey
        </Button>
      </div>

      <div className={styles.profileButton}>
        {signIn ? (
          <ProfileButton
            picture={profilePictures[user.profilePicture]}
            user={user}
          />
        ) : (
          <SignInButton setUser={setUser} />
        )}
      </div>
    </div>

    // <Stack direction="horizontal" gap={2} className={styles.container}>
    //   <div>
    //     <img src={icon} className={styles.icon}></img>
    //   </div>
    //   <div>
    //     <div className={styles.title}>Journey</div>
    //   </div>
    //   <div>
    //     <Button className={styles.button} onClick={() => changePage("Home")}>
    //       Home
    //     </Button>
    //   </div>
    //   <div>
    //     <Button
    //       className={styles.button}
    //       onClick={() => changePage("Workout Plan")}
    //     >
    //       Workout Plan
    //     </Button>
    //   </div>
    //   <div>
    //     <Button
    //       className={styles.button}
    //       onClick={() => changePage("Nutrition")}
    //     >
    //       Nutrition
    //     </Button>
    //   </div>
    //   <div className="p-2 ms-auto">
    //     {signIn ? (
    //       <ProfileButton
    //         picture={profilePictures[user.profilePicture]}
    //         user={user}
    //       />
    //     ) : (
    //       <SignInButton setUser={setUser} />
    //     )}
    //   </div>
    // </Stack>
  );
}
