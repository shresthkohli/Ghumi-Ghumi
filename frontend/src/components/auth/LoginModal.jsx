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

    if(!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-5">
            <div 
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />
                <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in-95 duration-300">
                    <button
                        onClick={onClose}
                        type="button"
                        className="absolute -right-3 -top-3 z-20 flex h-10 w-10 items-center justofy-center rounded-full
                        bg-white text-on-surface shadow-xl transition-all hover:scale-110 hover:bg-surface-container"
                    >
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </button>
                    <div className="overflow-hidden rounded-3xl shadow-2xl">
                        <LoginCard
                            onSucces={onClose}
                        />
                    </div>
                </div>
        </div>
    )
}