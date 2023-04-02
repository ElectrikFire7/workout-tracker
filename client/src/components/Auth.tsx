import {
    Dispatch,
    FC,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from "react";

import api from "../api";
import { User } from "../models";

export let loggedInUser = null;

type Props = {
    children?: React.ReactNode;
};

export const UserContext = createContext<{
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}>({
    user: {
        _id: "fake",
        name: "Name",
        age: 18,
        height: 172,
        weight: 64,
        isActive: true,
        isAdmin: false,
    },
    setUser: (user) => user,
});

const Auth: FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        (async () => {
            const response = await api.get<User>("users");
            if (response) setUser(response.data);
        })();
    }, []);

    if (!user || user._id === "fake") return <>fetching ...</>;
    if (!user.isActive) return <>Unauthorized</>;
    return (
        <UserContext.Provider
            value={{ user, setUser: setUser as Dispatch<SetStateAction<User>> }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default Auth;
