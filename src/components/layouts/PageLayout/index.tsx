import Head from "next/head";
import React from "react";
import "reflect-metadata";
const PageLayout: React.FC = ({ children }) => {

    return (
        <>
            <Head>
                <title>SBucket</title>
            </Head>
            {children}

        </>
    );
};

export default PageLayout
