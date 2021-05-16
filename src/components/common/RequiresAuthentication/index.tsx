import React from "react";
import { useAuthenticatedUser } from '../../../hooks/useAuthenticatedUser';
import { useNavigation } from "../../../hooks/useNavigation";




const RequiresAuthentication: React.FC = ({ children }) => {

    const navigate = useNavigation();
    const { user, loaded } = useAuthenticatedUser();

    if (loaded) {
        if (user == null) {
            navigate(`/login?redirect=here`);
            return <></>;
        }
        return <>{children}</>;
    } else {
        return <></>;
    }
}


export default RequiresAuthentication;