import { ExportOutlined } from "@ant-design/icons";
import { Alert, Button, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import PageLayout from "../src/components/layouts/PageLayout";
import { ApplicationConfig } from "../src/lib/config";
import styles from '../styles/Home.module.scss';



const Login: React.FC = () => {

    const loginButton = (
        <>
            <Button type="primary" icon={<ExportOutlined />} href={ApplicationConfig.get('LOGIN_URL')}>Log in using steam</Button>
        </>
    )
    return (
        <PageLayout>
            <div className={styles.container}>
                <main className={styles.main}>
                    <Card
                        style={{
                            maxWidth: "600px"
                        }}
                        cover={<img style={{
                            maxHeight: "200px",
                            height: "clam(100px,20vh,400px)",
                            objectFit: "cover"
                        }} alt="login" src="/images/sandbox.png" />}
                    >
                        <h1>Welcome to SBucket</h1>
                        <p>
                            SBucket is a data layer that will take care of the complicated job of managing servers, player, groups, and their data.
                            <br />
                            <br />
                            During alpha we will focus on building apis and tools for managing data, allowing you to focus on building your gamemode.
                        </p>


                        <Meta description={loginButton} />
                        <br />
                        <br />

                        <Alert message="This UI is only functional at the moment. The focus is ensuring we have strong apis to support SBox." type="info" />
                    </Card>
                </main>
            </div>
        </PageLayout>
    )
}


export default Login;