// src/app/auth/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();

	const res = await fetch('/api/auth/signup', {
	  method: 'POST',
	  body: JSON.stringify({ email, password }),
	  headers: { 'Content-Type': 'application/json' },
	});

	if (res.ok) {
	  router.push('/auth/signin');
	} else {
	  const { error } = await res.json();
	  setError(error || 'Erreur lors de l’inscription.');
	}
  };

  return (
	<div className="max-w-md mx-auto p-4">
	  <h1 className="text-2xl font-bold mb-4">Créer un compte</h1>
	  <form onSubmit={handleSubmit} className="space-y-4">
		<input
		  type="email"
		  value={email}
		  onChange={(e) => setEmail(e.target.value)}
		  placeholder="Ton email"
		  className="w-full p-2 border rounded"
		/>
		<input
		  type="password"
		  value={password}
		  onChange={(e) => setPassword(e.target.value)}
		  placeholder="Ton mot de passe"
		  className="w-full p-2 border rounded"
		/>
		{error && <p className="text-red-500">{error}</p>}
		<button
		  type="submit"
		  className="w-full p-2 bg-green-600 text-white rounded"
		>
		  S’inscrire
		</button>
	  </form>
	</div>
  );
};

export default SignUp;
