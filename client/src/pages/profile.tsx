import { useCallback, useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import api from "../api";
import { UserContext } from "../components/Auth";
import { Link } from "react-router-dom";

const ProfilePage = () => {
    const { user, setUser } = useContext(UserContext);

    const [name, setName] = useState(user.name);
    const [age, setAge] = useState(user.age);
    const [height, setHeight] = useState(user.height);
    const [weight, setWeight] = useState(user.weight);

    const saveHandler = useCallback(async () => {
        const { data: user } = await api.put("users", {
            name,
            age,
            height,
            weight,
        });
        setUser(user);
    }, [age, height, name, setUser, weight]);

    return (
        <Container className="w-50 mt-2">
            <Link to="/">&lt;&lt; Home</Link>
            <h2 className="my-5">Profile</h2>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
                className="mb-3"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Form.Label htmlFor="age">Age</Form.Label>
            <Form.Control
                className="mb-3"
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
            />
            <Form.Label htmlFor="height">Height</Form.Label>
            <Form.Control
                className="mb-3"
                type="number"
                step="0.01"
                id="height"
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
            />
            <Form.Label htmlFor="weight">Weight</Form.Label>
            <Form.Control
                className="mb-3"
                type="number"
                step="0.01"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
            <Button className="mb-4 mt-3" onClick={saveHandler}>
                Save
            </Button>
        </Container>
    );
};

export default ProfilePage;
