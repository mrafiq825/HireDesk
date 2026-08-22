import Navbar from "@layout/Navbar";
import RedirectIfAuthenticated from "@auth/RedirectIfAuthenticated";
import { AuthCard } from "@auth/AuthCard";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign In to HireDesk — AI-Powered Hiring Platform" },
    {
      name: "description",
      content:
        "Log in to your HireDesk account and access AI-powered resume screening, candidate comparison, and batch analysis tools.",
    },
    { name: "robots", content: "noindex, nofollow" },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://hiredesk.vercel.app/login",
    },
  ];
}

const Login = () => {
  return (
    <RedirectIfAuthenticated>
      <div className="min-h-screen bg-[#171717] relative flex flex-col justify-between text-[#F5E6C8]">
        <Navbar />
        <div className="pt-24 pb-12 px-4 flex items-center justify-center flex-grow relative z-10">
          <AuthCard initialMode="signin" />
        </div>
      </div>
    </RedirectIfAuthenticated>
  );
};

export default Login;
