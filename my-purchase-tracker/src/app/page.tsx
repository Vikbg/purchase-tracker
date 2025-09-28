// src/app/index.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ToggleSwitch from "@/components/ToggleButton"; // Assuming your file is named ToggleButton.tsx

// --- Icon components are the same ---
const SunIcon = () => (
  <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
const MoonIcon = () => (
  <svg className="w-4 h-4 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Suggestion: Add the 'boolean' type for better TypeScript safety
  const handleThemeChange = (isDarkMode: boolean) => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    console.log(`Dark mode is now: ${isDarkMode ? 'ON' : 'OFF'}`);
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    // Main page container
    <div className="relative min-h-screen">
      {/* Place the switch in a fixed position so it's always accessible */}
      <div className="absolute top-4 right-4">
        <ToggleSwitch
          onChange={handleThemeChange}
          withIcons={true}
          iconOn={<SunIcon />}
          iconOff={<MoonIcon />}
          colorOn="bg-sky-400"
          colorOff="bg-slate-700"
          thumbColor="bg-white"
        />
      </div>

      {/* Conditionally render the main content based on session */}
      {session ? (
        // --- LOGGED IN VIEW ---
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold mb-2">
              Bienvenue, {session.user?.name ?? session.user?.email}!
            </h1>
            <p>Email : {session.user?.email}</p>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="mt-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      ) : (
        // --- LOGGED OUT VIEW ---
        <div className="flex justify-center items-center h-screen">
          <button
            onClick={() => router.push("/auth/signin")}
            className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
          >
            Se connecter
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;