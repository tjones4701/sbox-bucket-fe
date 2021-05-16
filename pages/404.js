import React from "react";
import styles from '../styles/Home.module.scss';

const Custom404 = () => {

    return (
        <div className={styles.container}>
            <h1>404 Page Not Found</h1>

            <div>
                <hr />
                <br />
                <a href='/home'>Click here to go back home</a>
                <br />
                <br />
                <a href='/'>Click here to the index page</a>
            </div>
        </div>
    )
}


export default Custom404;