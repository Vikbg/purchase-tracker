// src/app/index.tsx
"use client";

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button
          onClick={() => router.push('/auth/signin')} // Redirige vers la page de connexion
          className="p-4 bg-blue-500 text-white rounded"
        >
          Se connecter
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold">Bienvenue, {session.user?.name}!</h1>
      <p>Email : {session.user?.email}</p>
      <button
        onClick={() => signOut()}
        className="mt-4 p-2 bg-red-500 text-white rounded"
      >
        Se déconnecter
      </button>
    </div>
  );
};

export default Home;
