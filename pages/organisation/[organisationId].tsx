
import { Alert, Card, Skeleton } from "antd";
import React from "react";
import { useAsync } from "react-use";
import ServerList from "../../src/components/common/ServerList";
import Link from "../../src/components/design-system/Link";
import OrganisationEditor from "../../src/components/editors/OrganisationEditor";
import AppLayout from "../../src/components/layouts/AppLayout";
import { useQueryParams } from "../../src/hooks/useQueryParams";
import { fetchOrganisation } from "../../src/lib/sbucket-api/organisations";
import { fetchServers } from "../../src/lib/sbucket-api/servers";
import styles from "./[organisationId].module.scss";


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

    const orgLink = `/organisation/${id}/`;

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
            {organisation != null && (
                <>
                    <br />
                    <Card title="Quick Links">
                        <div className={styles['quick-links']}>
                            <Link button type="dashed" href={`${orgLink}players`}>Players</Link>
                            <Link button type="dashed" href={`${orgLink}events`}>Events</Link>
                            <Link button type="dashed" href={`${orgLink}servers`}>Servers</Link>
                        </div>
                    </Card>
                </>
            )}
            {inner}
        </AppLayout>
    )
}


export default Home;