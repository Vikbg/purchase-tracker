"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");

  useEffect(() => {
	if (!error) router.push("/auth/signin");
  }, [error, router]);

  return (
	<div className="max-w-md mx-auto p-4">
	  <h1 className="text-2xl font-bold mb-4">Erreur d'authentification</h1>
	  <p>Code d'erreur : {error}</p>
	  <button
		onClick={() => router.push("/auth/signin")}
		className="mt-4 p-2 bg-blue-500 text-white rounded"
	  >
		Retour à la connexion
	  </button>
	</div>
  );
}
