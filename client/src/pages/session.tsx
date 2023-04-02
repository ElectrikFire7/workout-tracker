import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import api from "../api";
import { Exercise, Plan, Progress, Session } from "../models";
import ExerciseCard from "../components/ExerciseCard";

const SessionPage = () => {
    const [session, setSession] = useState<Session | null>();
    const [plan, setPlan] = useState<Plan>();
    const [exercises, setExercises] = useState<Record<string, Exercise>>();
    const [progresses, setProgresses] = useState<Progress[]>();

    useEffect(() => {
        (async () => {
            const {
                data: { plan, session, exercises, progresses },
            } = await api.get<{
                session: Session | null;
                plan: Plan;
                exercises: Exercise[];
                progresses?: Progress[];
            }>("sessions");
            setSession(session);
            setPlan(plan);
            setExercises(
                exercises.reduce((acc, e) => {
                    acc[e._id] = e;
                    return acc;
                }, {} as Record<string, Exercise>)
            );
            setProgresses(progresses);
        })();
    }, []);

    const added = useMemo(
        () =>
            !exercises
                ? null
                : progresses?.length
                ? progresses.map((p) => (
                      <ExerciseCard
                          key={p._id}
                          exercise={exercises[p.exerciseId]}
                          progress={p}
                          setProgress={(p) => {
                              setProgresses((prev) =>
                                  prev
                                      ?.filter((pr) => pr._id !== p._id)
                                      .concat(p)
                              );
                          }}
                      />
                  ))
                : plan &&
                  plan.exercises.map((id) => (
                      <ExerciseCard key={id} exercise={exercises[id]} />
                  )),
        [exercises, plan, progresses]
    );

    const onStart = useCallback(() => {
        (async () => {
            const {
                data: { session, progresses },
            } = await api.post<{
                session: Session;
                progresses: Progress[];
            }>("sessions/start");
            setSession(session);
            setProgresses(progresses);
        })();
    }, []);

    const onEnd = useCallback(() => {
        (async () => {
            await api.post<{
                session: Session;
                progresses: Progress[];
            }>("sessions/end");
            setSession(null);
            setProgresses(undefined);
        })();
    }, []);

    return (
        <Container className="w-75 mt-2">
            <div className="d-flex justify-content-between">
                <h2 className="my-5">Workout Plan</h2>
                <Button
                    variant={session ? "danger" : "primary"}
                    className="mb-4 mt-3"
                    onClick={session ? onEnd : onStart}
                >
                    {session ? "End" : "Start"} Session
                </Button>
            </div>
            <h4>Name: {plan && plan.name}</h4>
            <h5>Description: {plan && plan.description}</h5>
            <div>
                <h4>Exercises</h4>
                {added}
            </div>
        </Container>
    );
};

export default SessionPage;
