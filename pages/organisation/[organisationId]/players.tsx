import React from "react";
import "reflect-metadata";
import PlayerTable from "../../../src/components/common/PlayerTable";
import AppLayout from "../../../src/components/layouts/AppLayout";
import { useQueryParams } from "../../../src/hooks/alterQueryParams";

const PlayersPage: React.FC = () => {
    const { organisationId, isRouterReady } = useQueryParams(["organisationId", "playerId"]);

    return (
        <AppLayout
            breadcrumbs={[
                {
                    name: "Home",
                    href: "/home"
                },
                {
                    name: "Organisation",
                    href: `/organisation/${organisationId ?? ""}`
                },
                {
                    name: "Players"
                }
            ]}
        >
            <PlayerTable canCreateNew organisationId={organisationId} />
        </AppLayout>
    )
};

export default PlayersPage;
