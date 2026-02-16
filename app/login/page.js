"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
    const router = useRouter()
    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser()
        
            if (data.user) {
                router.push("/dashboard")
            }
        }
        checkUser()
    },[router])
    
    const handleLogin = async() => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "http://localhost:3000/dashboard",
            },
})
    
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Welcome to Smart Bookmark App
                </h1>
                <p className="text-gray-600 mb-6">
                    Please sign in with your Google account to access your dashboard and manage your bookmarks.
                </p>
                <button
                    onClick={handleLogin}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Sign In with Google
                </button>
            </div>
        </div>
    )

}

export default Login