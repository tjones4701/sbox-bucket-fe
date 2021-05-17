import { Skeleton } from "antd";
import React from "react";
import { useAsync } from "react-use";
import "reflect-metadata";
import PlayerList from "../../../src/components/common/PlayerList";
import AppLayout from "../../../src/components/layouts/AppLayout";
import { useQueryParams } from "../../../src/hooks/alterQueryParams";
import { fetchPlayers } from "../../../src/lib/sbucket-api/players";

const PlayersPage: React.FC = () => {
    const { organisationId, isRouterReady } = useQueryParams(["organisationId", "playerId"]);

    let { value: players, loading } = useAsync(async () => {
        if (isRouterReady) {
            let players = await fetchPlayers(organisationId);
            return players;
        } else {
            return null;
        }
    }, [organisationId, isRouterReady]);

    let innerComponent = <Skeleton active />;
    if (isRouterReady && !loading) {
        innerComponent = <PlayerList canCreateNew players={players ?? []} organisationId={organisationId} />;
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
                    href: `/organisation/${organisationId ?? ""}`
                },
                {
                    name: "Players"
                }
            ]}
        >
            {innerComponent}
        </AppLayout>
    )
};

export default PlayersPage;
