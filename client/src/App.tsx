import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import CredsForm from "./components/CredsForm";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Logout from "./pages/logout";
import Home from "./pages/home";
import Profile from "./pages/profile";
import WorkoutPlan from "./pages/workout-plan";
import Session from "./pages/session";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <CredsForm isLogin />,
    },
    { path: "/register", element: <CredsForm /> },
    { path: "/logout", element: <Logout /> },
    {
        path: "/",
        element: (
            <Auth>
                <Header />
                <Outlet />
            </Auth>
        ),
        children: [
            { path: "/", element: <Home /> },
            { path: "/profile", element: <Profile /> },
            { path: "/plan", element: <WorkoutPlan /> },
            { path: "/session", element: <Session /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
