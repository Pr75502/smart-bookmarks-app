


"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-10 rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to the Smart Bookmark App
        </h1>
        <p className="text-gray-600 mb-8">
          Your intelligent solution for organizing and accessing your favorite web links.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
