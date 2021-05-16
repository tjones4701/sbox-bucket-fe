import { Connection, createConnection, getConnection } from "typeorm";
import { ApplicationConfig } from "../lib/config";

let connectionReadyPromise: Promise<void> | null = null;

export async function prepareConnection(): Promise<Connection> {
    if (!connectionReadyPromise) {
        connectionReadyPromise = (async () => {
            // clean up old connection that references outdated hot-reload classes
            try {
                const staleConnection = getConnection();
                await staleConnection.close();
            } catch (error) {
                // no stale connection to clean up
            }

            let config = ApplicationConfig.get("TYPEORM");

            // wait for new default connection
            await createConnection({
                ...config,
                "entities": [
                    "src/orm/entity/**/*.ts"
                ],
                "migrations": [
                    "src/orm/migration/**/*.ts"
                ],
                "subscribers": [
                    "src/orm/subscriber/**/*.ts"
                ]
            });
        })();
    }

    return connectionReadyPromise;
}