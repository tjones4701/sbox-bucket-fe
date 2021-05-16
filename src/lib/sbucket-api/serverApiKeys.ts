

import { Sbucket } from "./SbucketWebservice";
import { SBucketServerApiKey } from "./types.ts/SBucketServerApiKey";

export async function fetchServerApiKeys(serverId: string): Promise<SBucketServerApiKey[]> {
    return (await Sbucket("SERVER_KEYS").get({ serverId: serverId })).getData();
}

export async function createApiKey(serverId: string): Promise<{ id: string, key: string }> {
    return (await Sbucket("SERVER_KEYS").post({ serverId: serverId })).getData();
}