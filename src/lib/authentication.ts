import { getNumericDate } from "./common/getNumericDate";
import appStore from "./localStore";
import { validateUserJwt } from "./sbucket-api/validationJwt";

export type AuthUser = {
    jwt: string;
    refreshToken: string;
    user: any;
    claims: any;
    expiresAt: number,
    serverExpiresAt: number,
    serverIssuedAt: number,
}

export function readJwt(jwt) {
    try {
        let now = getNumericDate()
        let parts = jwt.split('.');
        let claims = JSON.parse(atob(parts[1]));
        let exp = parseInt(claims?.exp);
        let iat = parseInt(claims?.iat);
        let secondsDuration = (exp - iat);
        let expiresAt = now + secondsDuration - (now - iat);
        let claimsData = claims?.data;

        return {
            expiresAt: expiresAt,
            serverExpiresAt: exp,
            serverIssuedAt: iat,
            claims: claimsData
        }
    } catch (e) {
        return {
            expiresAt: 0,
            serverExpiresAt: 0,
            serverIssuedAt: 0,
            claims: {}
        }
    }
}

const AuthenticationObj = {
    authData: null
    ,
    initialise: async (jwt): Promise<AuthUser> => {
        let user = await validateUserJwt(jwt);
        if (user == null) {
            throw "ERROR";
        }
        const tokenData = readJwt(jwt);
        let authData: AuthUser = {
            jwt: jwt,
            user: user,
            refreshToken: null,
            expiresAt: 0,
            serverExpiresAt: 0,
            serverIssuedAt: 0,
            claims: {},
            ...(tokenData ?? {})
        }

        appStore.set('auth', authData);
        AuthenticationObj.authData = authData;
        return authData;
    },
    getAuthData: () => {
        let authUser: AuthUser = AuthenticationObj?.authData ?? appStore.get('auth');
        return authUser;
    },
    getValidUser: () => {
        if (AuthenticationObj.isExpired()) {
            return null;
        }
        return AuthenticationObj.getUser();
    },
    getUser: () => {
        return AuthenticationObj?.getAuthData()?.user;
    },
    getValidAuthData: () => {
        if (AuthenticationObj.isExpired()) {
            return null;
        }
        return AuthenticationObj.getAuthData();
    },
    isExpired: () => {
        let expiresAt = AuthenticationObj.getAuthData()?.expiresAt ?? 0;
        return (expiresAt - getNumericDate()) <= 0;
    },
    getJwt: () => {
        return AuthenticationObj.getAuthData()?.jwt;
    },
}

export const Authentication = AuthenticationObj;