import { ChangeEventHandler, FC, memo, useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";

import api from "../api";

interface Props {
    isLogin?: boolean;
}

const CredsForm: FC<Props> = ({ isLogin }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const emailChangeHandler: ChangeEventHandler<HTMLInputElement> =
        useCallback((e) => {
            setEmail(e.target.value);
            setError("");
        }, []);
    const passChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
        (e) => {
            setPassword(e.target.value);
            setError("");
        },
        []
    );

    const loginHandler = useCallback(async () => {
        const { status, data } = await api.post("users/login", {
            email,
            password,
        });
        if (status === 200) navigate("/");
        else setError(data);
    }, [email, navigate, password]);
    const registerHandler = useCallback(async () => {
        const { data, status } = await api.post("users/signup", {
            email,
            password,
        });
        if (status === 200) navigate("/profile");
        else setError(data);
    }, [email, navigate, password]);

    return (
        <div className="d-flex flex-grow-1 align-items-center">
            <Container className="border rounded py-4 px-5 d-flex flex-column w-25">
                <h2 className="mb-3">{isLogin ? "Login" : "Register"}</h2>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                    className="mb-3"
                    id="email"
                    value={email}
                    onChange={emailChangeHandler}
                />
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                    className="mb-3"
                    type="password"
                    id="password"
                    value={password}
                    onChange={passChangeHandler}
                />

                <Button
                    className="mb-4 mt-2"
                    onClick={isLogin ? loginHandler : registerHandler}
                >
                    {isLogin ? "Sign in" : "Register"}
                </Button>
                <p className="text-center">
                    {isLogin ? (
                        <>
                            Not a member? <Link to="/register">Register</Link>
                        </>
                    ) : (
                        <>
                            Already registered? <Link to="/login">Sign In</Link>
                        </>
                    )}
                </p>
            </Container>
            {error && (
                <Alert
                    className="position-fixed"
                    variant="danger"
                    style={{ bottom: 0, margin: 16 }}
                >
                    {error}
                </Alert>
            )}
        </div>
    );
};

export default memo(CredsForm);
