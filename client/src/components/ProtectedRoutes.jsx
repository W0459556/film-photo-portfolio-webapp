import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/authService";

const ProtectedRoutes = () => {
    if (authService.isSignedIn()) {
        console.log('outlet');
        return <Outlet />;
    } else {
        console.log('else');
        return <Navigate to="/signin" />;
    }
};

export default ProtectedRoutes;
