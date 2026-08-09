import Navbar from "@layout/Navbar";
import RedirectIfAuthenticated from "@auth/RedirectIfAuthenticated";
import { AuthCard } from "@auth/AuthCard";
import type { Route } from "./+types/signup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create Your HireDesk Account — Start Hiring Smarter Today" },
    {
      name: "description",
      content:
        "Sign up for HireDesk and get 10 free AI-powered resume analyses. Screen candidates, compare applicants, and make data-driven hiring decisions in minutes — not weeks.",
    },
    { name: "robots", content: "noindex, nofollow" },
    { tagName: "link", rel: "canonical", href: "https://hiredesk.vercel.app/signup" },
  ];
}

const SignUp = () => {
  return (
    <RedirectIfAuthenticated>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col justify-between">
        <Navbar />
        <div className="pt-20 pb-12 px-4 flex items-center justify-center flex-grow">
          <AuthCard initialMode="signup" />
        </div>
      </div>
    </RedirectIfAuthenticated>
  );
};

export default SignUp;

