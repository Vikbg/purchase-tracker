// src/app/index.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button
          onClick={() => router.push("/auth/signin")}
          className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
        >
          Se connecter
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">
        Bienvenue, {session.user?.name ?? session.user?.email}!
      </h1>
      <p>Email : {session.user?.email}</p>
      <button
        onClick={() => signOut({ callbackUrl: "/auth/signout" })}
        className="mt-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
      >
        Se déconnecter
      </button>
    </div>
  );
};

export default Home;
