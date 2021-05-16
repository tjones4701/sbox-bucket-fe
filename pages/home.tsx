import { SmileOutlined } from "@ant-design/icons";
import { Alert, Button, Result, Spin } from 'antd';
import Link from 'next/link';
import React from "react";
import { useAsync } from 'react-use';
import OrganisationList from '../src/components/common/OrganisationList';
import RequiresAuthentication from "../src/components/common/RequiresAuthentication";
import AppLayout from "../src/components/layouts/AppLayout";
import { fetchOrganisations } from '../src/lib/sbucket-api/organisations';



const HomeOrganisations: React.FC = () => {
    const { value: organisations, loading } = useAsync(() => {
        return fetchOrganisations(true);
    });

    if (loading) {
        return <Spin />;
    }

    if ((organisations ?? []).length == 0) {
        return (
            <Result
                icon={<SmileOutlined />}
                title="Welcome to SBucket, let's being by creating an organisation."
                extra={<Link href="/organisation"><Button type="primary">Create Organisation</Button></Link>}
            />
        );
    } else {
        return <OrganisationList canCreateNew organisations={organisations} />
    }
};

const Home: React.FC = () => {
    return (
        <AppLayout>
            <RequiresAuthentication>
                <Alert type='info' message='This site is a work in progress.' />

                <br />
                <br />

                <HomeOrganisations />
            </RequiresAuthentication>
        </AppLayout >
    )
}


export default Home;