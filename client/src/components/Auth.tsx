import { FC, useEffect, useState } from "react";

import api from "../api";

export let loggedInUser = null;

type Props = {
    children?: React.ReactNode;
};

const Auth: FC<Props> = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await api.get("users");
            if (response) setUser(response.data);
        })();
    });

    return !!user ? <>{children}</> : null;
};

export default Auth;
