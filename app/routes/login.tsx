import Navbar from "@layout/Navbar";
import RedirectIfAuthenticated from "@auth/RedirectIfAuthenticated";
import { AuthCard } from "@auth/AuthCard";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign In to HireDesk — AI-Powered Hiring Platform" },
    {
      name: "description",
      content:
        "Log in to your HireDesk account and access AI-powered resume screening, candidate comparison, and batch analysis tools to hire top talent faster.",
    },
    { name: "robots", content: "noindex, nofollow" },
    { tagName: "link", rel: "canonical", href: "https://hiredesk.vercel.app/login" },
    {
      name: "keywords",
      content: "Login, HireDesk",
    },
  ];
}

const Login = () => {
  return (
    <RedirectIfAuthenticated>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col justify-between">
        <Navbar />
        <div className="pt-20 pb-12 px-4 flex items-center justify-center flex-grow">
          <AuthCard initialMode="signin" />
        </div>
      </div>
    </RedirectIfAuthenticated>
  );
};

export default Login;

