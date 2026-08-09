import {useNavigate} from "react-router-dom";
import LoginCard from "../components/auth/LoginCard";

function Login()
{
    const navigate = useNavigate();

    function handleLoginSuccess()
    {
        navigate("/");
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-surface-container-high">
            <LoginCard
                onSuccess={handleLoginSuccess}
            />
        </div>
    );
}

export default Login;