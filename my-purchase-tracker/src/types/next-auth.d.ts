// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
	user: {
	  id: number;
	  email: string;
	  name?: string;
	};
  }

  interface User {
	id: number;
	email: string;
	name?: string;
  }
}
