
import { SbucketApiCodes } from "./apiCodes";
import { Sbucket } from "./SbucketWebservice";
import { SbucketOrganisation } from "./types.ts/SBucketOrganisation";

export async function fetchOrganisations(onlyMine: boolean): Promise<SbucketOrganisation[]> {
    let options: any = {};
    if (onlyMine == true) {
        options.onlyMine = true;
    }
    let organisations = (await Sbucket("ORGANISATIONS").get(options)).getData();

    return organisations;
}

export async function saveOrganisation(organisation: SbucketOrganisation) {

    let code: SbucketApiCodes = "ORGANISATIONS";
    if (organisation.id != null) {
        code = "ORGANISATION";
        return (await Sbucket(code).patch(organisation)).getData();
    } else {
        return (await Sbucket(code).post(organisation)).getData();
    }
}


export async function fetchOrganisation(id: string): Promise<SbucketOrganisation> {
    if (id == null) {
        return null;
    }
    let organisation = (await Sbucket("ORGANISATION").get({ id: id })).getData();
    return organisation;
}
