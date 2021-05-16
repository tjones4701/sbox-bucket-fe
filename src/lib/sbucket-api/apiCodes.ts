export type SbucketApiCodes = "OrganisationGroups" | "ORGANISATIONS" | "ME" | "ORGANISATION" | "SERVERS" | "SERVER" | "SERVER_KEYS";
export const SbucketApiConfigurations = {
    "APIS.SBUCKET.ME": {
        url: "me",
        version: 1,
    },
    "APIS.SBUCKET.ORGANISATIONS": {
        url: "organisations",
        version: 1,
    },
    "APIS.SBUCKET.ORGANISATION": {
        url: "organisations/:id",
        version: 1,
    },
    "APIS.SBUCKET.SERVERS": {
        url: "organisations/:organisationId/servers",
        version: 1,
    },
    "APIS.SBUCKET.SERVER": {
        url: "servers/:id",
        version: 1,
    },
    "APIS.SBUCKET.SERVER_KEYS": {
        url: "servers/:serverId/api-keys",
        version: 1,
    }
}