// src/app.d.ts
declare global {
	namespace App {
		interface Locals {
			userId: string | null;
			user?: {
				id: string;
				email: string | null;
				name: string | null;
				avatar_url: string | null;
			};
		}
	}
}

export {};
