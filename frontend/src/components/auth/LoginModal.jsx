import {useEffect , useState} from "react";
import {Link} from "react-router-dom";
import {GoggleLogin} from "@react-oauth/google"

import {login,goggleLogin} from "../../api/authApi";
import {useAuth} from "../../context/Authcontext";
import Toast from "../Toast";

export default function LoginModal ({
    open,
    onClose
}) {
    const [email , setEmail] =useState("");
    const[password , setPassword] = useState("");
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { login: setLoggedInUser } = useAuth();
    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = "hidden";

        function handleEscape(e) {
            if (e.key === "Escape") {
                onClose();
            }
        }
        window.addEventListener("keydown", handleEscape);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, [open, onClose]);
    if (!open) return null;

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await login({
                email,
                password
            });
            setLoggedInUser(response.data);
            onClose();
        }

        catch (error) {
            console.log(error);
            setError(
                error.message ||
                "Something went wrong. Please try again."
            );
        }

        finally {
            setLoading(false);
        }
    }

    async function handleGoogleSuccess(googleResponse) {
        setError("");
        setLoading(true);
        try {
            const response =
                await googleLogin(
                    googleResponse.credential
                );
            setLoggedInUser(response.data);
            onClose();
        }

        catch (error) {
            console.log(error);
            setError(
                error.message ||
                "Something went wrong."
            );
        }

        finally {
            setLoading(false);
        }
    }
}
return(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
        <Toast 
            message={error}
            onClose={() => setError("")}
        />
        <div
            onClick={onClose}
            className="absolute inset-0 bg-black/35 backdrop-blur-md" 
        />
        <div className="absolute h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl"/>
        <div className="glass-widget relative w-full max-w-md rounded-[36px] overflow-hidden border border-white/30 p-10 shadow-warm-lg animate-in fade-in zoom-in-95 duration-300">
            <span className="material-symbols-outlined asolute -right-10 -top-10 text-[180px] opacity-5 text-primary select-none">
                travel_explore 
            </span>
            <button 
                onClick={onClose}
                className="absolute right-5 top-5 rounded-full p-2 hover:bg-white/30 transition"
            >
                    <span className="materials-symbols-outlined">
                        close
                    </span>
            </button>
            <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full">

                </div>
            </div>
        </div>
        <div/>
    </div>
)