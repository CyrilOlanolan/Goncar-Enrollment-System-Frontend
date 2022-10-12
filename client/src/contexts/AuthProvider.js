import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth as Auth} from "../components/Pages/Firebase";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(Auth, (currentUser) => {
            setAuth(currentUser)
            setLoading(false);
        })
    }, [setAuth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;