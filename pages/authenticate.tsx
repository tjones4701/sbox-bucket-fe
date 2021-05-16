import { Result, Spin } from "antd";
import React from "react";
import { useAsync } from "react-use";
import "reflect-metadata";
import { useNavigation } from "../src/hooks/useNavigation";
import { useQueryParams } from "../src/hooks/useQueryParams";
import { Authentication } from "../src/lib/authentication";

const Authenticate: React.FC = () => {
    const { jwt } = useQueryParams(["jwt"]);
    const navigate = useNavigation();

    useAsync(async () => {
        try {
            await Authentication.initialise(jwt);
            navigate("/home");

        } catch (e) {
            navigate("/error/AUTHENTICATION_FAILED");

        }

    }, [jwt]);

    return (
        <Result
            icon={<Spin />}
            title="Logging you in!"
        />);
};

export default Authenticate
