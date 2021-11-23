import React from "react";
import styles from "./SplashPage.module.css";
import Footer from "../Footer/index";

export default function SplashPage() {
    return (
        <>
            <div className={styles.splashPicContainer}>
                <img
                    className={styles.splashPic}
                    src="https://www.coastlinenservices.com/wp-content/uploads/2019/07/shutterstock_741884605.jpg"
                    alt="Splash Page"
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.splashText}>
                    <h1 className={styles.splashTitle}>
                        Fine dining at your fingertips with
                        <span className={styles.splashSpan}>Open Reservation</span>{" "}

                    </h1>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p id="splashDescription" className="splashDescript">Can't decide where to eat? Browse restaurants near you!</p>
                </div>
            </div>
            <Footer />
        </>
    );
}
