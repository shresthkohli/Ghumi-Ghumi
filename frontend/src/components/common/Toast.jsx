// shows a small error banner at the top of the screen
import { useEffect } from "react";

function Toast({ message, onClose }) {

    useEffect(() => {

        if (!message) return;

        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div
            role="alert"
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[99999] bg-error text-on-error px-6 py-3 rounded-full shadow-lg font-body text-sm font-medium flex items-center gap-2"
        >
            <span className="material-symbols-outlined text-base">error</span>
            <span>{message}</span>
        </div>
    )
}

export default Toast;