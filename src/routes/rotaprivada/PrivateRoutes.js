import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function PrivateRoutes({ children }){
    const { currentUser } = useAuth();

    return currentUser ? children : <Navigate to="/" />;
}

export default PrivateRoutes;