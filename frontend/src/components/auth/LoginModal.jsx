import { useEffect} from "react";
import LoginCard from "./LoginCard";

export default function LoginModal({
    open,
    onClose
}) {
    useEffect(() => {
        if(!open) 
            return;
        document.body.style.overflow= " hidden";

        function handleEscape(e) {
            if(e.key === "Escape"){
                onClose();
            }
        }
        window.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            document.body.style.overflow = "";

            window.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    },[open , onClose]);
}