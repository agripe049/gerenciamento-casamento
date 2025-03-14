import {  BrowserRouter, Route, Routes } from "react-router-dom"
import Login from '../pages/Login/Login'
import Dash from "../pages/Dash/Dash"

function AppRoutes(){
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dash" element={<Dash />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRoutes