import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import { createRoot } from "react-dom/client";

const root = document.getElementById('root');

if (!root) {
    throw new Error('root not found');
}

const container = createRoot(root);
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/hello',
                element: <h1>Hello!</h1>
            }
        ]
    },
]);

container.render(<RouterProvider router={router} />);
