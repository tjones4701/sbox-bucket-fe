
import { Alert, Skeleton } from "antd";
import React from "react";
import { useAsync } from "react-use";
import ServerList from "../../src/components/common/ServerList";
import OrganisationEditor from "../../src/components/editors/OrganisationEditor";
import AppLayout from "../../src/components/layouts/AppLayout";
import { useQueryParams } from "../../src/hooks/useQueryParams";
import { fetchOrganisation } from "../../src/lib/sbucket-api/organisations";
import { fetchServers } from "../../src/lib/sbucket-api/servers";


const Servers: React.FC<{ organisationId: string }> = ({ organisationId }) => {
    const { value: servers, loading } = useAsync(async () => {
        return await fetchServers(organisationId);
    }, [organisationId]);

    return <ServerList organisationId={organisationId} canCreateNew servers={servers} loading={loading} />;
}

const Home: React.FC = () => {
    const { organisationId: id } = useQueryParams(['organisationId']);
    const { value: organisation, loading } = useAsync(async () => {
        return await fetchOrganisation(id);
    }, [id]);

    let inner = <Skeleton active />;

    if (!loading && id !== undefined) {
        if (organisation == null) {
            inner = <Alert message='No Organisation Found' type='error' />
        } else {
            inner = (
                <>
                    <br />
                    <Servers organisationId={organisation.id} />
                </>
            )
        }
    }

    return (
        <AppLayout
            breadcrumbs={[
                {
                    name: "Home",
                    href: "/home"
                },
                {
                    name: "Organisation"
                }
            ]}
        >
            <OrganisationEditor organisation={organisation} />
            {inner}
        </AppLayout>
    )
}


export default Home;