import { FC } from "react";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";

import { Exercise } from "../models";

const ExerciseCard: FC<{
    exercise: Exercise;
    onClick: () => void;
    add?: boolean;
}> = ({
    exercise: { name, description, sets, reps, weight },
    onClick,
    add,
}) => {
    return (
        <Card className="my-3">
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                    {name}
                    {add ? (
                        <Button variant="danger" onClick={onClick}>
                            Add
                        </Button>
                    ) : (
                        <CloseButton onClick={onClick} />
                    )}
                </Card.Title>
                <div className="d-flex justify-content-between">
                    <div>Sets: {sets}</div>
                    <div>Reps: {reps}</div>
                    <div>Weight: {weight}</div>
                </div>
                <Card.Text className="fst-italic">{description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ExerciseCard;
