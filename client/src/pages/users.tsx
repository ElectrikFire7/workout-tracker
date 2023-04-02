import { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { User } from "../models";
import api from "../api";

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        (async () => {
            const { data: usersList } = await api.get<User[]>("users/all");
            setUsers(usersList);
        })();
    }, []);

    const onClick = useCallback(
        (enable: boolean, id: string) => async () => {
            (async () => {
                const { data: user } = await api.post(
                    `users/${enable ? "enable" : "disable"}/${id}`
                );
                setUsers((users) => {
                    const newUsers: User[] = [];
                    users.forEach(
                        (u, i) => (newUsers[i] = u._id === id ? user : u)
                    );
                    return newUsers;
                });
            })();
        },
        []
    );

    return (
        <Container className="w-50 mt-5">
            <h2>Users</h2>
            {users.map(({ _id, name, isActive }) => (
                <Card
                    key={_id}
                    className="d-flex flex-row justify-content-between align-items-center p-3 my-3"
                >
                    {name || ""}
                    {isActive ? (
                        <Button variant="danger" onClick={onClick(false, _id)}>
                            Disable
                        </Button>
                    ) : (
                        <Button onClick={onClick(true, _id)}>Enable</Button>
                    )}
                </Card>
            ))}
        </Container>
    );
};

export default Users;
