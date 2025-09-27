"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();

	const res = await signIn("credentials", {
	  redirect: false,
	  email,
	  password,
	});

	if (res?.error) {
	  alert(`Erreur de connexion: ${res.error}`);
	} else {
	  router.push("/");
	}
  };

  return (
	<div className="max-w-md mx-auto p-4">
	  <h1 className="text-2xl font-bold mb-4">Se connecter</h1>
	  {error && <p className="text-red-600 mb-4">Erreur: {error}</p>}
	  <form onSubmit={handleSubmit} className="space-y-4">
		<input
		  type="email"
		  value={email}
		  onChange={(e) => setEmail(e.target.value)}
		  placeholder="Ton email"
		  required
		  className="w-full p-2 border rounded"
		/>
		<input
		  type="password"
		  value={password}
		  onChange={(e) => setPassword(e.target.value)}
		  placeholder="Ton mot de passe"
		  required
		  className="w-full p-2 border rounded"
		/>
		<button
		  type="submit"
		  className="w-full p-2 bg-blue-500 text-white rounded"
		>
		  Se connecter
		</button>
	  </form>
	</div>
  );
}
