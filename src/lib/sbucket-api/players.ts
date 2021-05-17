
import { SbucketApiCodes } from "./apiCodes";
import { Sbucket } from "./SbucketWebservice";
import { SBucketPlayer } from "./types.ts/SBucketPlayer";

export async function fetchPlayers(organisationId: string): Promise<SBucketPlayer[]> {
    return (await Sbucket("PLAYERS").get({ organisationId: organisationId })).getData();
}

export async function fetchPlayer(organisationId: string, playerId: string): Promise<SBucketPlayer[]> {
    return (await Sbucket("PLAYER").get({ playerId: playerId, organisationId: organisationId })).getData();
}


export async function savePlayer(player: SBucketPlayer): Promise<SBucketPlayer> {
    let code: SbucketApiCodes = "PLAYERS";
    return (await Sbucket(code).post(player)).getData();
}