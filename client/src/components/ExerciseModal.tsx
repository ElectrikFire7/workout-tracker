import { FC, useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import api from "../api";
import { Progress } from "../models";

const ExerciseModal: FC<{
    show: boolean;
    onHide: () => void;
    progressId: string;
    setProgress: (p: Progress) => void;
}> = ({ show, onHide, progressId, setProgress }) => {
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);

    const onSave = useCallback(async () => {
        const { data: progress } = await api.post(
            `progress/complete/${progressId}`,
            {
                sets,
                reps,
                weight,
            }
        );
        setProgress(progress);
        onHide();
    }, [onHide, progressId, reps, setProgress, sets, weight]);

    return (
        <Modal
            show={show}
            onHide={onHide}
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
    );
};

export default ExerciseModal;
