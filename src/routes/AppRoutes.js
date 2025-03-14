import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from '../pages/Login/Login'
import Dash from "../pages/Dash/Dash"
import { AuthProvider } from "./contexts/AuthContext"
import PrivateRoutes from "./rotaprivada/PrivateRoutes"

function AppRoutes() {
    return (
        <div>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/dash" element={<PrivateRoutes><Dash /></PrivateRoutes>} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}

export default AppRoutes