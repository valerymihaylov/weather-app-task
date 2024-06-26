import { createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import ForecastDetails from "./ForecastDetails.jsx";

export const router = createBrowserRouter([
    { path: "/", element: <App />},
    { path: ":slug", element: <ForecastDetails />}
]);