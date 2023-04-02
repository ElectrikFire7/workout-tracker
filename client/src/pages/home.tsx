import { useContext, useEffect, useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import { UserContext } from "../components/Auth";
import Users from "./users";
import { Session } from "../models";
import api from "../api";
import ProgressBar from "react-bootstrap/ProgressBar";

const Home = () => {
    const { user } = useContext(UserContext);

    const [sessions, setSessions] = useState<Session[]>([]);

    useEffect(() => {
        (async () => {
            const { data: sessions } = await api.get("sessions/all");
            setSessions(sessions);
        })();
    }, []);

    const score = useMemo(
        () =>
            !sessions.length
                ? 0
                : parseFloat(
                      (
                          sessions.reduce((total, s) => total + s.score, 0) /
                          sessions.length
                      ).toFixed(2)
                  ),
        [sessions]
    );

    return user.isAdmin ? (
        <Users />
    ) : (
        <Container className="w-50 mt-2">
            <h1 className="my-5">Stats</h1>
            <h3>My completion score: {score}%</h3>
            <ProgressBar now={score} label={`${score}%`} />
            <h3 className="mt-5">Previous Sessions</h3>
            {sessions.length ? (
                sessions.map(({ _id, start, end, score }) => (
                    <Card key={_id} className="p-3 my-3">
                        <div>Start: {new Date(start).toString()}</div>
                        <div>End: {new Date(end).toString()}</div>
                        <div>Score: {score}%</div>
                    </Card>
                ))
            ) : (
                <div className="fst-italic">No sessions recorded</div>
            )}
        </Container>
    );
};

export default Home;
