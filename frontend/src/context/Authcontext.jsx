import { createContext, useContext, useState, useEffect } from "react";
import { me } from "../api/userApi";

const Authcontext = createContext(null);

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        me()
            .then((res) => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    function login(userData) {
        setUser(userData);
    }

    function logout() {
        setUser(null);
    }

    return(
        <Authcontext.Provider value={{ user, loading, login, logout }}>
            {children}
        </Authcontext.Provider>
    );
}

function useAuth() {
    return useContext(Authcontext);
}

export {AuthProvider, useAuth};
