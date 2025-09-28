"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

// This is a simple wrapper component that provides the context.
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
	<SessionProvider>
	  {children}
	</SessionProvider>
  );
}