
import { removeNullProperties } from "../removeNullProperties";
import { Sbucket } from "./SbucketWebservice";
import { SBucketPlayer } from "./types.ts/SBucketPlayer";
import { SBucketPlayerEvent } from "./types.ts/SBucketPlayerEvent";

export async function fetchPlayerEvents(organisationId: string, playerIds?: string[], code = null, page: number = null): Promise<SBucketPlayer[]> {
    return (await Sbucket("PLAYER_EVENTS").get(removeNullProperties({ organisationId: organisationId, playerIds, code: code, page: page }))).getData();
}

export type ISavePlayerEvents = {
    playerIds?: string[];
    code?: string;
    metadata?: any;
    organisationId?: string;
};
export async function savePlayerEvents(payload: ISavePlayerEvents): Promise<SBucketPlayerEvent[]> {
    return (await Sbucket("PLAYER_EVENTS").post(payload)).getData();
}