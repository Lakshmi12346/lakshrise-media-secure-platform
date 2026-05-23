"use client";

import { signIn } from "next-auth/react";
import { Github, Mail, ShieldCheck } from "lucide-react";

export default function SignIn() {
  return (
    <main className="mesh flex min-h-screen items-center justify-center px-5 py-10">
      <section className="w-full max-w-md rounded-lg border border-ink/10 bg-white p-6 shadow-lift">
        <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-md bg-mint text-ocean">
          <ShieldCheck size={24} />
        </div>
        <h1 className="text-3xl font-black tracking-normal text-ink">Secure sign in</h1>
        <p className="mt-3 leading-7 text-ink/65">
          Access LakshRise Media client workflows with an approved OAuth provider.
        </p>
        <div className="mt-7 grid gap-3">
          <button
            className="inline-flex h-12 items-center justify-center gap-3 rounded-md border border-ink/10 bg-white font-bold text-ink transition hover:border-ocean hover:text-ocean"
            onClick={() => signIn("google")}
          >
            <Mail size={18} />
            Continue with Google
          </button>
          <button
            className="inline-flex h-12 items-center justify-center gap-3 rounded-md bg-ink font-bold text-white transition hover:bg-ocean"
            onClick={() => signIn("github")}
          >
            <Github size={18} />
            Continue with GitHub
          </button>
        </div>
      </section>
    </main>
  );
}
