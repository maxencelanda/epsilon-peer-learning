import { Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { AuthContext } from "../context/AuthContext";

export default function Layout() {

    const { user, setUser } = useAuth();
    return (
        <div>
            <AuthContext.Provider value={{ user, setUser }}>
                <Outlet/>
            </AuthContext.Provider>
        </div>
    )
}
