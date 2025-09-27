"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
	<div className="max-w-md mx-auto p-4">
	  <h1 className="text-2xl font-bold mb-4">Déconnexion</h1>
	  <button
		onClick={() => signOut({ callbackUrl: "/" })}
		className="w-full p-2 bg-red-500 text-white rounded"
	  >
		Se déconnecter
	  </button>
	</div>
  );
}
