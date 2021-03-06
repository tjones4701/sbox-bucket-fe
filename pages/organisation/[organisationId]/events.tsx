import { Skeleton } from "antd";
import React from "react";
import { useAsync } from "react-use";
import "reflect-metadata";
import PlayerEventsEditor from "../../../src/components/editors/PlayerEventsEditor";
import AppLayout from "../../../src/components/layouts/AppLayout";
import { useQueryParams } from "../../../src/hooks/alterQueryParams";

const EventsPage: React.FC = () => {
    const { organisationId, isRouterReady } = useQueryParams(["organisationId", "eventId"]);

    let { value: events, loading } = useAsync(async () => {
        if (isRouterReady) {
            let events = []
            return events;
        } else {
            return null;
        }
    }, [organisationId, isRouterReady]);

    let innerComponent = <Skeleton active />;
    if (isRouterReady && !loading) {
        // innerComponent = <EventList canCreateNew events={events ?? []} organisationId={organisationId} />;
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
                    name: "Player Events"
                }
            ]}
        >
            <PlayerEventsEditor organisationId={organisationId} />
        </AppLayout>
    )
};

export default EventsPage;
