import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import CredsForm from "./components/CredsForm";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Logout from "./pages/logout";
import Profile from "./pages/profile";
import WorkoutPlan from "./pages/workout-plan";

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
            { path: "/profile", element: <Profile /> },
            { path: "/plan", element: <WorkoutPlan /> },
            { path: "/", element: <h1>404 Not Found</h1> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
