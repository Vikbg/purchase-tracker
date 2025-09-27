"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState<string>(() => "");
  const [password, setPassword] = useState<string>(() => "");
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
	<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
		<img
		  alt="Your Company"
		  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
		  className="mx-auto h-10 w-auto"
		/>
		<h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		  Sign in to your account
		</h2>
	  </div>

	  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form onSubmit={handleSubmit} className="space-y-6">
		  <div>
			<label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
			  Email address
			</label>
			<div className="mt-2">
			  <input
				id="email"
				name="email"
				type="email"
				required
				autoComplete="email"
				value={email ?? ""}
				onChange={(e) => setEmail(e.target.value)}
				className="block w-full rounded-md bg-white dark:bg-white/5 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 dark:focus:outline-indigo-500 focus:outline-indigo-600 dark:sm:text-sm sm:text-sm/6"
			  />
			</div>
		  </div>

		  <div>
			<div className="flex items-center justify-between">
			  <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
				Password
			  </label>
			  <div className="text-sm">
				<a href="#" className="font-semibold dark:text-indigo-400 dark:hover:text-indigo-300 text-indigo-600 hover:text-indigo-500">
				  Forgot password?
				</a>
			  </div>
			</div>
			<div className="mt-2">
			  <input
				id="password"
				name="password"
				type="password"
				required
				autoComplete="current-password"
				value={password ?? ""}
				onChange={(e) => setPassword(e.target.value)}
				className="block w-full rounded-md bg-white dark:bg-white/5 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 dark:focus:outline-indigo-500 focus:outline-indigo-600 dark:sm:text-sm sm:text-sm/6"
			  />
			</div>
		  </div>

		  <div>
			<button
			  type="submit"
			  className="flex w-full justify-center rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-1.5 text-sm/6 dark:text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline-2 dark:focus:outline-2 focus-visible:outline-offset-2 dark:focus:outline-indigo-500 focus-visible:outline-indigo-600"
			>
			  Sign in
			</button>
		  </div>
		</form>

		{error && (
		  <p className="mt-4 text-sm text-red-400 text-center">
			Erreur de connexion : {error}
		  </p>
		)}

		<p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-sm dark:text-gray-400">
		  Not a member?{' '}
		  <a href="#" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
			Start a 14 day free trial
		  </a>
		</p>
	  </div>
	</div>
  );
}
