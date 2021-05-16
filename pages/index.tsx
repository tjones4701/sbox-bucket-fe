
import React from "react";
import Link from "../src/components/design-system/Link";
import PageLayout from "../src/components/layouts/PageLayout";
import styles from '../styles/Home.module.scss';


const Home: React.FC = () => {
    return (
        <PageLayout>
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Welcome to SBucket
                    </h1>
                    <br />
                    <Link href='/login' button>Click here to login.</Link>
                </main>
            </div>
        </PageLayout>
    )
}


export default Home;