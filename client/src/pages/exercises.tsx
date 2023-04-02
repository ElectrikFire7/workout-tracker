import { FC, useCallback, useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";

import { Exercise } from "../models";
import api from "../api";
import ExerciseCard from "../components/ExerciseCard";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { UserContext } from "../components/Auth";

const Exercises: FC = () => {
    const { user } = useContext(UserContext);

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [exercises, setExercises] = useState<Exercise[]>([]);

    useEffect(() => {
        (async () => {
            const { data: usersList } = await api.get<Exercise[]>("exercises");
            setExercises(usersList);
        })();
    }, []);

    const onSave = useCallback(async () => {
        (async () => {
            const { data: exercise } = await api.post<Exercise>("exercises", {
                name,
                description,
                sets,
                reps,
                weight,
            });
            setExercises((e) => [...e, exercise]);
            setOpen(false);
        })();
    }, [description, name, reps, sets, weight]);

    if (!user.isAdmin) return <>Unauthorized</>;
    return (
        <>
            <Modal
                show={open}
                onHide={() => setOpen(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Enter exercise details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control
                        className="mb-3"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control
                        className="mb-3"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Form.Label htmlFor="sets">Sets</Form.Label>
                    <Form.Control
                        className="mb-3"
                        type="number"
                        id="sets"
                        value={sets}
                        onChange={(e) => setSets(parseInt(e.target.value))}
                    />
                    <Form.Label htmlFor="reps">Reps</Form.Label>
                    <Form.Control
                        className="mb-3"
                        type="number"
                        step="0.01"
                        id="reps"
                        value={reps}
                        onChange={(e) => setReps(parseInt(e.target.value))}
                    />
                    <Form.Label htmlFor="weight">Weight</Form.Label>
                    <Form.Control
                        className="mb-3"
                        type="number"
                        step="0.01"
                        id="weight"
                        value={weight}
                        onChange={(e) => setWeight(parseInt(e.target.value))}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onSave}>Submit</Button>
                </Modal.Footer>
            </Modal>
            <Container className="w-50 mt-5">
                <div className="d-flex justify-content-between">
                    <h2 className="my-3">Exercises</h2>
                    <Button className="mb-4 mt-3" onClick={() => setOpen(true)}>
                        Add New Exercise
                    </Button>
                </div>
                {exercises.map((e) => (
                    <ExerciseCard key={e._id} exercise={e} />
                ))}
            </Container>
        </>
    );
};

export default Exercises;
