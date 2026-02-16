"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [bookmarks, setBookmarks] = useState([]);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    const fetchBookmarks = async () => {
        const { data, error } = await supabase
            .from("bookmarks")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error) {
            setBookmarks(data);
        }
    };

    // Load user once
    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();

            if (!data.user) {
                router.push("/login");
            } else {
                setUser(data.user);
                fetchBookmarks();
            }
        };

        getUser();
    }, [router]);

    // Realtime subscription
    useEffect(() => {
        if (!user) return;

        const channel = supabase
            .channel("realtime-bookmarks")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",   // FIXED
                    table: "bookmarks",
                    filter: `user_id=eq.${user.id}`,
                },
                () => {
                    fetchBookmarks();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    const handleAddBookmark = async () => {
        if (!title || !url || !user) return;

        await supabase.from("bookmarks").insert([
            {
                title,
                url,
                user_id: user.id,
            },
        ]);

        setTitle("");
        setUrl("");
    };

    const handleDelete = async (id) => {
        await supabase.from("bookmarks").delete().eq("id", id);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="p-10 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome, {user.email}
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Logout
                    </button>
                </div>

                <p className="text-gray-600 mb-10">
                    This is your personal space to manage all your bookmarks. You can add new bookmarks, view your existing ones, and delete those you no longer need. The real-time feature ensures that your list is always up-to-date across all your devices.
                </p>

                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Title"
                            className="border p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type="url"
                            placeholder="URL"
                            className="border p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <button
                            onClick={handleAddBookmark}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                        >
                            Add Bookmark
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Bookmarks</h2>
                    <ul>
                        {bookmarks.map((bookmark) => (
                            <li
                                key={bookmark.id}
                                className="flex justify-between items-center border-b py-3"
                            >
                                <a
                                    href={bookmark.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-lg"
                                >
                                    {bookmark.title}
                                </a>
                                <button
                                    onClick={() => handleDelete(bookmark.id)}
                                    className="text-red-500 hover:text-red-700 font-semibold"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
