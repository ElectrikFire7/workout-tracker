import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await api.get("/users/logout");
            navigate("/login");
        })();
    }, [navigate]);

    return <></>;
};

export default Logout;
