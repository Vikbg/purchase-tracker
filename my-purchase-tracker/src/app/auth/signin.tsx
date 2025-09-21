// src/pages/auth/signin.tsx
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();

	const res = await signIn('credentials', {
	  redirect: false, // Ne pas rediriger immédiatement
	  email,
	  password,
	});

	if (res?.error) {
	  console.error('Erreur de connexion', res.error);
	} else {
	  router.push('/'); // Rediriger vers la page d'accueil après une connexion réussie
	}
  };

  return (
	<div className="max-w-md mx-auto p-4">
	  <h1 className="text-2xl font-bold mb-4">Se connecter</h1>
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
		<button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
		  Se connecter
		</button>
	  </form>
	</div>
  );
};

export default SignIn;
