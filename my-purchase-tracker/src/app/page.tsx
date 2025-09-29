// src/app/index.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ToggleSwitch from "@/components/ToggleButton";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon, TrackIcon, BudgetIcon, ChartIcon } from "@/components/SvgIcons";


const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Read initial theme from localStorage or default to system preference if necessary
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkTheme(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkTheme(false);
    }
  }, []);

  // Handler function for the ToggleSwitch
  const handleThemeChange = (checked: boolean) => {
    setIsDarkTheme(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-500">
        <p>Chargement...</p>
      </div>
    );
  }

  // --- LOGGED OUT LANDING PAGE CONTENT ---
  const LoggedOutLanding = () => (
    <div className="flex flex-col items-center pt-24 pb-12 px-4 min-h-screen text-slate-900 dark:text-white bg-white dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-4xl w-full">

        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-blue-600 dark:text-blue-400">
            PurchaseTracker 💸
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light text-slate-700 dark:text-slate-300">
            **Gardez le contrôle total de vos dépenses.** Enregistrez, analysez et gérez tous vos achats avec facilité.
          </p>

          {/* Primary CTA */}
          <button
            onClick={() => router.push("/auth/signin")}
            className="p-4 px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Commencer Gratuitement
          </button>
        </section>

        <hr className="my-12 border-slate-200 dark:border-slate-700" />

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-800 dark:text-white">
            Fonctionnalités Clés
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">

            {/* Feature 1 */}
            <div className="p-6 rounded-lg shadow-lg bg-slate-50 dark:bg-slate-800">
              <TrackIcon />
              <h3 className="text-xl font-semibold mt-3 mb-2">
                Suivi Instantané
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Enregistrez un achat en quelques secondes, où que vous soyez. Catégorisation automatique pour une meilleure organisation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg shadow-lg bg-slate-50 dark:bg-slate-800">
              <BudgetIcon />
              <h3 className="text-xl font-semibold mt-3 mb-2">
                Gestion des Budgets
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Créez des budgets mensuels ou hebdomadaires et recevez des alertes avant de les dépasser.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg shadow-lg bg-slate-50 dark:bg-slate-800">
              <ChartIcon />
              <h3 className="text-xl font-semibold mt-3 mb-2">
                Visualisation des Données
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Des graphiques clairs pour visualiser vos habitudes de dépenses et identifier les domaines d'amélioration.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="text-center py-10 bg-blue-50 dark:bg-slate-800 rounded-lg shadow-inner">
          <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">
            Prêt à mieux gérer votre argent ?
          </h2>
          <p className="text-lg mb-6 text-slate-600 dark:text-slate-300">
            Rejoignez des milliers d'utilisateurs qui maîtrisent leurs finances.
          </p>
          <button
            onClick={() => router.push("/auth/signin")}
            className="p-3 px-6 text-base font-semibold bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md transition-all duration-300"
          >
            Inscription Rapide et Gratuite
          </button>
        </section>

      </div>
    </div>
  );

  return (
    // Main page container
    <div className="relative min-h-screen">
      {/* Theme Switch (Fixed Position) */}
      <div className="absolute top-4 right-4 z-20">
        <ToggleSwitch
          checked={isDarkTheme}
          onChange={handleThemeChange}
          withIcons={true}
          iconOn={<MoonIcon />}
          iconOff={<SunIcon />}
          colorOn="bg-slate-700"
          colorOff="bg-sky-400"
          thumbColor="bg-white"
        />
      </div>

      {/* Conditionally render the main content based on session */}
      {session ? (
        // --- LOGGED IN VIEW ---
        // This view is kept simple as it's not the landing page
        <div className="flex flex-col justify-center items-center h-screen text-slate-900 dark:text-white bg-white dark:bg-slate-900 transition-colors duration-500">
          <div className="max-w-md text-center p-6 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-2xl">
            <h1 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Bienvenue, {session.user?.name ?? session.user?.email}! 👋
            </h1>
            <p className="text-lg mb-6">
              Votre tableau de bord vous attend. Commencez à suivre vos achats !
            </p>
            <button
              // In a real app, this should probably link to the main app dashboard/tracker page
              onClick={() => { /* router.push("/dashboard") */ }}
              className="mt-2 p-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-md mr-4"
            >
              Accéder au Tracker
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="mt-2 p-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition shadow-md"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      ) : (
        // --- LOGGED OUT LANDING PAGE ---
        <LoggedOutLanding />
      )}
    </div>
  );
};

export default Home;