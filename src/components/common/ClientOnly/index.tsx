import React, { useEffect, useState } from 'react';

const ClientOnly: React.FC = ({ children }) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);
    }, []);
    if (show) {
        return <>{children}</>
    }
    return <></>;
}

export default ClientOnly