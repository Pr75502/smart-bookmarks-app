🚀 Smart Bookmark App

A full-stack bookmark management application built using Next.js (App Router) and Supabase.
The app allows users to securely authenticate with Google, manage personal bookmarks, and see real-time updates across multiple tabs.

✨ Features

🔐 Google OAuth authentication (Supabase Auth)

➕ Add bookmarks (Title + URL)

👀 View personal bookmarks

🗑 Delete bookmarks

🔒 Row-Level Security (RLS) for per-user data privacy

⚡ Real-time updates across browser tabs

🎨 Clean UI with Tailwind CSS

🚀 Deployable on Vercel

🛠 Tech Stack

Frontend: Next.js (App Router)

Backend & Database: Supabase (PostgreSQL)

Authentication: Supabase Google OAuth

Realtime: Supabase Realtime Subscriptions

Styling: Tailwind CSS

Deployment: Vercel

🔐 Security Implementation

Row-Level Security (RLS) enabled on the bookmarks table

Policies implemented:

SELECT: auth.uid() = user_id

INSERT: WITH CHECK (auth.uid() = user_id)

DELETE: auth.uid() = user_id

Ensures users can only access their own bookmarks

⚡ Real-Time Functionality

The application subscribes to Postgres changes using Supabase Realtime.
If a bookmark is added or deleted in one tab, the update is reflected instantly in other open tabs without page refresh.

🧠 Challenges Faced

Understanding the difference between USING and WITH CHECK in RLS policies

Debugging silent failures in DELETE operations due to RLS

Managing client-side routing in Next.js App Router

Implementing and cleaning up realtime subscriptions properly

📦 Installation
git clone <your-repo-url>
cd smart-bookmark-app
npm install
npm run dev


Add your .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

🌍 Deployment

Deployed using Vercel.
Authentication and redirect URLs configured in Supabase.