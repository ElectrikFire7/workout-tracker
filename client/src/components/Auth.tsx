import {
    Dispatch,
    FC,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from "react";

import api from "../api";

export let loggedInUser = null;

type Props = {
    children?: React.ReactNode;
};

interface User {
    name: string;
    age: number;
    height: number;
    weight: number;
    isActive: boolean;
    isAdmin: boolean;
}

export const UserContext = createContext<{
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}>({
    user: {
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

    return !!user && user.isActive ? (
        <UserContext.Provider
            value={{ user, setUser: setUser as Dispatch<SetStateAction<User>> }}
        >
            {children}
        </UserContext.Provider>
    ) : (
        <>Unauthorized</>
    );
};

export default Auth;
