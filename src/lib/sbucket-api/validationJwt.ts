import { AuthUser } from "../authentication";
import { Sbucket } from "./SbucketWebservice";

export async function validateUserJwt(jwt): Promise<AuthUser> {
    let user = (await Sbucket("ME").get(null, {
        headers: {
            auth: jwt
        }
    })).getData()?.user;

    return user;

}
