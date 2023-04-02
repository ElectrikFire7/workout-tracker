import { useContext } from "react";
import { UserContext } from "../components/Auth";
import Users from "./users";

const Home = () => {
    const { user } = useContext(UserContext);

    return user.isAdmin ? <Users /> : <>Stats</>;
};

export default Home;
