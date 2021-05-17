
import React from "react";
import { useAsync } from "react-use";
import ServerList from "../../../src/components/common/ServerList";
import AppLayout from "../../../src/components/layouts/AppLayout";
import { useQueryParams } from "../../../src/hooks/useQueryParams";
import { fetchServers } from "../../../src/lib/sbucket-api/servers";


const Servers: React.FC<{ organisationId: string }> = ({ organisationId }) => {
    const { value: servers, loading } = useAsync(async () => {
        return await fetchServers(organisationId);
    }, [organisationId]);

    return <ServerList organisationId={organisationId} canCreateNew servers={servers} loading={loading} />;
}

const Page: React.FC = () => {
    const { organisationId: id } = useQueryParams(['organisationId']);

    return (
        <AppLayout
            breadcrumbs={[
                {
                    name: "Home",
                    href: "/home"
                },
                {
                    name: "Organisation",
                    href: `/organisation/${id}/`
                },
                {
                    name: "Servers"
                }
            ]}
        >
            <Servers organisationId={id} />
        </AppLayout>
    )
}


export default Page;