import {  BrowserRouter, Route, Routes } from "react-router-dom"
import Dash from "../pages/Dash/Dash"

function AppRoutes(){
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dash />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRoutes;