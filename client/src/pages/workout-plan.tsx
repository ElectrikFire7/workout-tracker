import { useCallback, useEffect, useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import api from "../api";
import { Exercise, Plan } from "../models";
import ExerciseCard from "../components/ExerciseCard";

const PlanPage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [exercises, setExercises] = useState<string[]>([]);
    const [allExercises, setAllExercises] =
        useState<Record<string, Exercise>>();

    useEffect(() => {
        (async () => {
            const getPlan = api.get<Plan>("plans");
            const getAllExercises = api.get<Exercise[]>("exercises");

            const {
                data: { name, description, exercises },
            } = await getPlan;
            setName(name || "");
            setDescription(description || "");
            setExercises(exercises);

            const { data: allExercises } = await getAllExercises;
            setAllExercises(
                allExercises.reduce((acc, exercise) => {
                    acc[exercise._id] = exercise;
                    return acc;
                }, {} as Record<string, Exercise>)
            );
        })();
    }, []);

    const saveHandler = useCallback(async () => {
        await api.put("plans", {
            name,
            description,
            exercises,
        });
    }, [description, exercises, name]);

    const added = useMemo(
        () =>
            !!allExercises &&
            (!exercises.length ? (
                <div className="fst-italic my-2">None</div>
            ) : (
                exercises.map((id) => (
                    <ExerciseCard
                        key={id}
                        exercise={allExercises[id]}
                        onClick={() =>
                            setExercises((prev) => prev.filter((x) => x !== id))
                        }
                    />
                ))
            )),
        [allExercises, exercises]
    );

    const remaining = useMemo(() => {
        const keys = new Set(exercises);
        const allKeys = Object.keys(allExercises || {}).filter(
            (id) => !keys.has(id)
        );
        return (
            !!allExercises &&
            (!allKeys.length ? (
                <div className="fst-italic my-2">None</div>
            ) : (
                allKeys.map((id) => (
                    <ExerciseCard
                        key={id}
                        add
                        exercise={allExercises[id]}
                        onClick={() => setExercises((prev) => [...prev, id])}
                    />
                ))
            ))
        );
    }, [allExercises, exercises]);

    return (
        <Container className="w-75 mt-2">
            <h2 className="my-5">Workout Plan</h2>
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
            <div>
                <h4>Exercises</h4>
                {added}
            </div>
            <div>
                <h4>Add More</h4>
                {remaining}
            </div>
            <Button className="mb-4 mt-3" onClick={saveHandler}>
                Save
            </Button>
        </Container>
    );
};

export default PlanPage;
