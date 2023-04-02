import { FC, useState } from "react";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";

import { Exercise, Progress } from "../models";
import ExerciseModal from "./ExerciseModal";

const ExerciseCard: FC<{
    exercise: Exercise;
    onClick?: () => void;
    action?: "add" | "remove";
    progress?: Progress;
    setProgress?: (p: Progress) => void;
}> = ({
    exercise: { name, description, sets, reps, weight },
    onClick,
    action,
    progress,
    setProgress,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {progress && setProgress && (
                <ExerciseModal
                    show={open}
                    onHide={() => setOpen(false)}
                    progressId={progress._id}
                    setProgress={setProgress}
                />
            )}
            <Card className="my-3">
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                        {name}
                        {progress ? (
                            progress.isComplete ? (
                                <Button variant="success" disabled>
                                    Completed
                                </Button>
                            ) : (
                                <Button onClick={() => setOpen(true)}>
                                    Mark Complete
                                </Button>
                            )
                        ) : action === "add" ? (
                            <Button variant="danger" onClick={onClick}>
                                Add
                            </Button>
                        ) : action === "remove" ? (
                            <CloseButton onClick={onClick} />
                        ) : null}
                    </Card.Title>
                    <div className="d-flex justify-content-between">
                        <div>Sets: {sets}</div>
                        <div>Reps: {reps}</div>
                        <div>Weight: {weight}</div>
                    </div>
                    <Card.Text className="fst-italic">{description}</Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

export default ExerciseCard;
