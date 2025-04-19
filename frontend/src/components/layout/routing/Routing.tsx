import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../not-found/NotFound";
import { useContext } from "react";
import { AuthContext } from "../../auth/auth/Auth";
import Login from "../../auth/login/Login";
import SignUp from "../../auth/sign-up/SignUp";
import Vacations from "../../vacations/vacations/Vacations";
import Add from "../../vacations/add/Add";
import Edit from "../../vacations/edit/Edit";
import Stats from "../../vacations/stats/Stats";

export default function Routing(): JSX.Element {
    const { isLoading, user } = useContext(AuthContext)!;
    const  isAdmin  = user?.isAdmin

    if (isLoading) {
        return (
            <div className="loading-container">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/login" element={user ? <Navigate to="/vacations" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/vacations" /> : <SignUp />} />

            <Route path="/" element={<Navigate to="/vacations" />} />

            <Route path="/vacations" element={user ? <Vacations /> : <Navigate to="/login"/>} />
            <Route
                path="/admin/add"
                element={
                    user?
                        (isAdmin ? <Add /> : <Navigate to="/vacations" />)
                        : <Navigate to="/login" />
                }
            />
             <Route
                path="/admin/edit/:id"
                element={
                    user
                        ? (isAdmin ? <Edit /> : <Navigate to="/vacations" />)
                        : <Navigate to="/login" />
                }
            />
            
            <Route path="/admin/stats"
                element={
                    user
                        ? (isAdmin ? <Stats/> : <Navigate to="/vacations" />)
                        : <Navigate to="/login" />

                } />

            <Route path="*" element={<NotFound />} />

        </Routes>
    )   
}
