import { Alert, message, Skeleton } from "antd";
import React from "react";
import { useAsync } from "react-use";
import "reflect-metadata";
import EventList from "../../../src/components/common/EventsList";
import PlayerEditor from "../../../src/components/editors/PlayerEditor";
import AppLayout from "../../../src/components/layouts/AppLayout";
import { useQueryParams } from "../../../src/hooks/alterQueryParams";
import { useNavigation } from "../../../src/hooks/useNavigation";
import exceptionModal from "../../../src/lib/exceptionModal";
import { fetchPlayer, savePlayer } from "../../../src/lib/sbucket-api/players";
import { SBucketPlayer } from "../../../src/lib/sbucket-api/types.ts/SBucketPlayer";


const PlayerPage: React.FC = () => {
    const { organisationId, playerId, isRouterReady } = useQueryParams(["organisationId", "playerId"]);

    let { value: playerValue, loading } = useAsync(async () => {
        if (isRouterReady && playerId != null) {
            let player = await fetchPlayer(organisationId, playerId);
            return player;
        } else {
            return null;
        }
    }, [playerId, organisationId, isRouterReady]);

    let player: SBucketPlayer = { ...(playerValue ?? {}), organisationId: organisationId } as any;

    const isNew = player?.playerId == null;
    const navigate = useNavigation();

    let innerComponent = <Skeleton active />;

    if (isRouterReady && !loading) {
        if (playerId == null && !isNew) {
            innerComponent = <Alert type='error' message='No player found.' />
        } else {
            player = { ...player }
            const onSave = async (player: SBucketPlayer) => {
                try {
                    let isNew = player?.playerId == null;
                    player.organisationId = organisationId;
                    player = await savePlayer(player);
                    if (isNew) {
                        navigate(`/organisation/${organisationId}/player/${player.playerId}`);
                    }
                    message.success("Player saved!");
                } catch (e) {
                    exceptionModal('Error creating organisation', e);
                }
            };

            innerComponent = <PlayerEditor player={player} onSave={onSave} />
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
                    name: "Players",
                    href: `/organisation/${organisationId}/players`
                },
                {
                    name: "Player"
                }
            ]}
        >
            {innerComponent}
            {!isNew && (
                <>
                    <EventList playerIds={[playerId]} organisationId={organisationId} canCreateNew />
                </>
            )}
        </AppLayout>
    )
};

export default PlayerPage;
