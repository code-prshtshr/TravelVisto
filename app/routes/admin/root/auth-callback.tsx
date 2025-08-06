import { useEffect } from "react";
import { handleAuthCallback } from "~/appwrite/auth";

export default function AuthCallback() {
    useEffect(() => {
        (async () => {
            try {
                await handleAuthCallback();
                window.location.href = "/dashboard"; // Redirect after success
            } catch (e) {
                console.error("Auth error:", e);
                window.location.href = "/sign-in";
            }
        })();
    }, []);

    return (
        <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-sky-200">
            <img
                src="/assets/icons/logo.svg"
                alt="Tourvisto Logo"
                className="w-16 h-16 animate-bounce mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Setting up your travel dashboard...
            </h2>
            <p className="text-gray-600 mb-6">Please wait while we sign you in.</p>

            {/* Loader Spinner */}
            <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin border-t-transparent"></div>
        </main>
    );
}
