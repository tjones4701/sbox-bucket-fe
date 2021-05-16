import { Alert, message, Skeleton } from "antd";
import React from "react";
import { useAsync } from "react-use";
import "reflect-metadata";
import ServerApiKeyEditor from "../../../src/components/editors/ServerApiKeyEditor";
import ServerEditor from "../../../src/components/editors/ServerEditor";
import AppLayout from "../../../src/components/layouts/AppLayout";
import { useQueryParams } from "../../../src/hooks/alterQueryParams";
import { useNavigation } from "../../../src/hooks/useNavigation";
import exceptionModal from "../../../src/lib/exceptionModal";
import { fetchServer, saveServer } from "../../../src/lib/sbucket-api/servers";
import { SBucketServer } from "../../../src/lib/sbucket-api/types.ts/SBucketServer";


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

const ServerPage: React.FC = () => {
    const { organisationId, serverId, isRouterReady } = useQueryParams(["organisationId", "serverId"]);

    let { value: serverValue, loading } = useAsync(async () => {
        if (isRouterReady && serverId != null) {
            let server = await fetchServer(serverId);
            return server;
        } else {
            return null;
        }
    }, [serverId, organisationId, isRouterReady]);

    let server: SBucketServer = { ...(serverValue ?? {}), organisationId: organisationId } as any;

    const isNew = server?.id == null;


    const navigate = useNavigation();

    let innerComponent = <Skeleton active />;

    if (isRouterReady && !loading) {
        if (serverId != null && server?.id == null) {
            innerComponent = <Alert type='error' message='No server found.' />
        } else {
            server = { ...server }
            const onSave = async (server: SBucketServer) => {
                try {
                    let isNew = server?.id == null;

                    server.organisationId = organisationId;
                    server = await saveServer(server);
                    if (isNew) {
                        navigate(`/organisation/${organisationId}/server/${server.id}`);
                    }
                    message.success("Server saved!");
                } catch (e) {
                    exceptionModal('Error creating organisation', e);
                }
            };

            innerComponent = <ServerEditor server={server} onSave={onSave} />
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
                    name: "Organisation",
                    href: `/organisation/${organisationId}`
                },
                {
                    name: "Server"
                }
            ]}
        >
            {innerComponent}
            {!isNew && <ServerApiKeyEditor canCreateNew serverId={serverId} />}
        </AppLayout>
    )
};

export default ServerPage;
