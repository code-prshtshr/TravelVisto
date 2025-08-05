import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleAuthCallback } from "~/appwrite/auth";

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                await handleAuthCallback();
                navigate("/admin/dashboard"); // Or "/" if regular user
            } catch (e) {
                console.error("Auth error:", e);
                navigate("/sign-in");
            }
        })();
    }, []);

    return <p>Signing in...</p>;
}
