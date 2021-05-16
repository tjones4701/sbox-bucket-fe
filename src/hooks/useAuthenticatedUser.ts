import { useEffect, useState } from "react";
import { Authentication } from "../lib/authentication";

export function useAuthenticatedUser() {
    const [user, setUser] = useState({ user: null, loaded: false });
    useEffect(() => {
        const user = Authentication.getValidUser();
        setUser({ user: user, loaded: true });
    }, []);

    return user;
}