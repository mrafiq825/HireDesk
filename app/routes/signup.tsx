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
        "Sign up for HireDesk and get AI-powered resume analyses. Screen candidates, compare applicants, and make data-driven hiring decisions.",
    },
    { name: "robots", content: "noindex, nofollow" },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://hiredesk.vercel.app/signup",
    },
  ];
}

const SignUp = () => {
  return (
    <RedirectIfAuthenticated>
      <div className="min-h-screen bg-[#171717] relative flex flex-col justify-between text-[#F5E6C8]">
        <Navbar />
        <div className="pt-24 pb-12 px-4 flex items-center justify-center flex-grow relative z-10">
          <AuthCard initialMode="signup" />
        </div>
      </div>
    </RedirectIfAuthenticated>
  );
};

export default SignUp;
