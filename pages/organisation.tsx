import React from "react";
import "reflect-metadata";
import OrganisationEditor from "../src/components/editors/OrganisationEditor";
import AppLayout from "../src/components/layouts/AppLayout";

const Organisation: React.FC = () => {
    return (
        <AppLayout>
            <OrganisationEditor organisation={{} as any} redirectOnSave />
        </AppLayout>
    )
};

export default Organisation
