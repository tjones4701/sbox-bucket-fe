
import { SbucketApiCodes } from "./apiCodes";
import { Sbucket } from "./SbucketWebservice";
import { SBucketServer } from "./types.ts/SBucketServer";

export async function fetchServers(organisationId: string): Promise<SBucketServer[]> {
    return (await Sbucket("SERVERS").get({ organisationId: organisationId })).getData();
}

export async function fetchServer(serverId: string): Promise<SBucketServer[]> {
    return (await Sbucket("SERVER").get({ id: serverId })).getData();
}


export async function saveServer(server: SBucketServer): Promise<SBucketServer> {

    let code: SbucketApiCodes = "SERVERS";
    if (server.id != null) {
        code = "SERVER";
        return (await Sbucket(code).patch(server)).getData();
    } else {
        return (await Sbucket(code).post(server)).getData();
    }
}