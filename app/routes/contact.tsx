import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import type { Route } from "./+types/contact";
import { useForm, ValidationError } from "@formspree/react";
import { useToast } from "@contexts/ToastContext";

const SITE_URL = "https://hiredesk.vercel.app";
const PAGE_TITLE =
  "Contact HireDesk — Get Help with AI Resume Screening & Hiring Tools";
const PAGE_DESCRIPTION =
  "Questions about HireDesk's AI-powered hiring tools? Contact our team for help with Smart Review, Smart Screening, Find Best Fit, or Quick Screen. We respond within 24 hours. Upgrade to Premium or Enterprise for unlimited analyses.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      name: "Contact HireDesk",
      url: `${SITE_URL}/contact`,
      description: PAGE_DESCRIPTION,
      mainEntity: {
        "@type": "Organization",
        name: "HireDesk",
        email: "rafkhan9323@gmail.com",
        url: SITE_URL,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "When should I use Smart Review?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use Smart Review (Individual Deep Analysis) for final-round candidates or key positions requiring comprehensive evaluation. It provides personality insights, leadership assessments, career trajectory analysis, resume scoring, and tailored interview questions.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best way to handle large applicant pools?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For large applicant pools (20+ candidates), start with Smart Screening (Batch Processing) to analyze 2-10 resumes simultaneously. This provides consistent evaluation criteria and automated ranking to quickly identify top candidates for further review.",
          },
        },
        {
          "@type": "Question",
          name: "How does Find Best Fit help with final decisions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Find Best Fit (Side-by-Side Comparison) allows you to visually compare 2-5 top candidates using intelligent ranking algorithms. Perfect for making objective final decisions when you have multiple strong applicants with similar qualifications.",
          },
        },
        {
          "@type": "Question",
          name: "When should I use Selection & Team Building?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use Selection & Team Building for rapid candidate screening (1-5 resumes). It provides quick FIT/REJECT decisions based on job title and required keywords, perfect for fast-paced hiring cycles where you need immediate decisions on candidate suitability.",
          },
        },
        {
          "@type": "Question",
          name: "Can I combine different analysis methods in my hiring process?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely! Many recruiters use Selection & Team Building for rapid pre-screening, Smart Screening for initial evaluation, Find Best Fit for comparing finalists, and Smart Review for deep analysis of selected candidates. This multi-stage approach ensures thorough evaluation at each hiring phase.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between the four analysis methods?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Smart Review provides comprehensive individual analysis, Smart Screening handles bulk processing (2-10 resumes), Find Best Fit compares candidates side-by-side (2-5), and Selection & Team Building offers quick FIT/REJECT decisions (1-5). Each serves different stages of your hiring funnel.",
          },
        },
      ],
    },
  ],
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: PAGE_TITLE },
    { name: "description", content: PAGE_DESCRIPTION },

    // Canonical
    { tagName: "link", rel: "canonical", href: `${SITE_URL}/contact` },

    // Open Graph
    { property: "og:url", content: `${SITE_URL}/contact` },
    { property: "og:title", content: PAGE_TITLE },
    { property: "og:description", content: PAGE_DESCRIPTION },
    { property: "og:type", content: "website" },

    // Twitter Card
    { name: "twitter:title", content: PAGE_TITLE },
    { name: "twitter:description", content: PAGE_DESCRIPTION },

    // Keywords
    {
      name: "keywords",
      content:
        "contact HireDesk, AI hiring support, resume screening help, recruitment tool support, upgrade hiring plan, HireDesk FAQ",
    },

    // JSON-LD structured data (FAQPage + ContactPage)
    { "script:ld+json": JSON.stringify(jsonLd) },
  ];
}

const Contact = () => {
  const { showToast } = useToast();
  const formId = (import.meta.env.VITE_FORMSPREE_FORM_ID || "your-form-id")
    .split("/")
    .pop();
  const [state, handleSubmit, reset] = useForm(formId);

  if (state.succeeded && !state.submitting) {
    showToast(
      "Thank you for reaching out! We'll get back to you within 24 hours.",
      "success",
      {
        title: "Message Sent!",
        duration: 5000,
      }
    );
    setTimeout(() => reset(), 2000);
  }

  if (state.errors && state.errors.getFormErrors().length > 0) {
    const errorMessages = state.errors
      .getFormErrors()
      .map((error) => error.message)
      .join(", ");
    showToast(
      `Failed to send message: ${errorMessages}. Please try again or contact us directly at rafkhan9323@gmail.com`,
      "error",
      {
        title: "Error Sending Message",
        duration: 7000,
      }
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-2xl mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-75 animate-pulse"></div>
                <div className="relative bg-linear-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Questions about our AI-powered analysis methods? Need help
              choosing between Individual Deep Analysis, Batch Processing,
              Side-by-Side Comparison, or Candidate Selection? We're here to
              help you streamline your hiring process with intelligent insights.
            </p>
          </div>

          <div className="mb-12 relative">
            <div className="absolute -inset-1 bg-linear-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-linear-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl border border-emerald-500/30 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="shrink-0">
                  <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Need More Than 10 Resume Analyses?
                  </h3>
                  <p className="text-slate-300 mb-4">
                    Our free tier includes 10 resume uploads per user. Ready to
                    scale your hiring? Contact us to upgrade to our Premium or
                    Enterprise plans with unlimited analyses, priority support,
                    and advanced AI features!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Four Analysis Methods, One Powerful Platform
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
                <div className="relative bg-slate-800 rounded-2xl p-6 h-full border border-slate-700">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Smart Review
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">
                    Comprehensive AI analysis for single candidates with
                    personality insights, career trajectory, resume scoring, and
                    tailored interview questions.
                  </p>
                  <div className="text-xs text-blue-400 font-semibold">
                    Perfect for final candidate evaluation
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-green-500 to-emerald-500 rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
                <div className="relative bg-slate-800 rounded-2xl p-6 h-full border border-slate-700">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Smart Screening (2-10)
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">
                    Process multiple resumes simultaneously with automated
                    ranking and consistent evaluation criteria for large
                    applicant pools.
                  </p>
                  <div className="text-xs text-green-400 font-semibold">
                    Perfect for initial screening phases
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
                <div className="relative bg-slate-800 rounded-2xl p-6 h-full border border-slate-700">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Find Best Fit (2-5)
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">
                    Compare top candidates side-by-side with intelligent ranking
                    algorithms for objective final decision-making between
                    similar candidates.
                  </p>
                  <div className="text-xs text-purple-400 font-semibold">
                    Perfect for final candidate selection
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-orange-500 to-red-500 rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
                <div className="relative bg-slate-800 rounded-2xl p-6 h-full border border-slate-700">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-orange-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Selection & Team Building (1-5)
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">
                    Quick FIT/REJECT decisions based on job requirements and
                    keywords with AI-powered evaluation for rapid candidate
                    screening.
                  </p>
                  <div className="text-xs text-orange-400 font-semibold">
                    Perfect for fast-paced hiring cycles
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 md:p-10">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Send us a message
                  </h2>
                  <p className="text-slate-400 mb-6">
                    Questions about Smart Review, Smart Screening, Find Best
                    Fit, or Selection & Team Building? Need help choosing the
                    right method for your hiring workflow? We're here to help
                    you get the most out of HireDesk's AI-powered resume
                    analysis platform.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-slate-300 mb-2"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          disabled={state.submitting}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="John Doe"
                        />
                        <ValidationError
                          prefix="Name"
                          field="name"
                          errors={state.errors}
                          className="text-red-400 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-slate-300 mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          disabled={state.submitting}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="john@example.com"
                        />
                        <ValidationError
                          prefix="Email"
                          field="email"
                          errors={state.errors}
                          className="text-red-400 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        disabled={state.submitting}
                        rows={6}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-slate-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Tell us more about your inquiry..."
                      />
                      <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                        className="text-red-400 text-sm mt-1"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={state.submitting || state.succeeded}
                      className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl cursor-pointer"
                    >
                      {state.submitting ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </div>
                      ) : state.succeeded ? (
                        <div className="flex items-center justify-center gap-2">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Message Sent!</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span>Send Message</span>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Email
                      </h3>
                      <p className="text-sm text-slate-400">
                        We'll respond within 24h
                      </p>
                    </div>
                  </div>
                  <a
                    href="mailto:support@hiredesk.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    rafkhan9323@gmail.com
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-emerald-600/20 to-teal-600/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Upgrade Plans
                      </h3>
                      <p className="text-sm text-slate-400">
                        Flexible pricing options
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-emerald-400">
                          Free Plan
                        </span>
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full">
                          Current
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        10 resume uploads/user
                      </p>
                    </div>
                    <div className="bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-3 border border-blue-500/30">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-blue-300">
                          Premium Plan
                        </span>
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                          Popular
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">
                        100 uploads/month + priority support
                      </p>
                      <button
                        onClick={() => {
                          document.getElementById("name")?.focus();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-1.5 rounded-lg transition-colors"
                      >
                        Contact for Pricing
                      </button>
                    </div>
                    <div className="bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-3 border border-purple-500/30">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-purple-300">
                          Enterprise
                        </span>
                        <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                          Custom
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">
                        Unlimited uploads + dedicated support
                      </p>
                      <button
                        onClick={() => {
                          document.getElementById("name")?.focus();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 py-1.5 rounded-lg transition-colors"
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Connect With Us
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    <a
                      href="https://x.com/Rafiqdeveloper"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                      aria-label="Twitter"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                      >
                        <g
                          fill="none"
                          fillRule="evenodd"
                          stroke="none"
                          strokeWidth="1"
                          transform="translate(112 112)"
                        >
                          <path
                            fill="#000"
                            d="M711.111 800H88.89C39.8 800 0 760.2 0 711.111V88.89C0 39.8 39.8 0 88.889 0H711.11C760.2 0 800 39.8 800 88.889V711.11C800 760.2 760.2 800 711.111 800"
                          />
                          <path
                            fill="#FFF"
                            fillRule="nonzero"
                            d="M628 623H484.942L174 179h143.058zm-126.012-37.651h56.96L300.013 216.65h-56.96z"
                          />
                          <path
                            fill="#FFF"
                            fillRule="nonzero"
                            d="M219.296885 623 379 437.732409 358.114212 410 174 623z"
                          />
                          <path
                            fill="#FFF"
                            fillRule="nonzero"
                            d="M409 348.387347 429.212986 377 603 177 558.330417 177z"
                          />
                        </g>
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/rafiqdevhub/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <svg
                        className="w-5 h-5 text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/rafiqdevhub/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-linear-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                      aria-label="Instagram"
                    >
                      <svg
                        className="w-5 h-5 text-pink-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-400">
                Quick answers to common questions about HireDesk
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur"></div>
                <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-sm">
                      Q
                    </span>
                    When should I use Smart Review?
                  </h3>
                  <p className="text-slate-400 text-sm ml-9">
                    Use Smart Review (Individual Deep Analysis) for final-round
                    candidates or key positions requiring comprehensive
                    evaluation. It provides personality insights, leadership
                    assessments, career trajectory analysis, resume scoring, and
                    tailored interview questions.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-green-600/10 to-emerald-600/10 rounded-2xl blur"></div>
                <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 text-sm">
                      Q
                    </span>
                    What's the best way to handle large applicant pools?
                  </h3>
                  <p className="text-slate-400 text-sm ml-9">
                    For large applicant pools (20+ candidates), start with Smart
                    Screening (Batch Processing) to analyze 2-10 resumes
                    simultaneously. This provides consistent evaluation criteria
                    and automated ranking to quickly identify top candidates for
                    further review.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600/10 to-pink-600/10 rounded-2xl blur"></div>
                <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 text-sm">
                      Q
                    </span>
                    How does Find Best Fit help with final decisions?
                  </h3>
                  <p className="text-slate-400 text-sm ml-9">
                    Find Best Fit (Side-by-Side Comparison) allows you to
                    visually compare 2-5 top candidates using intelligent
                    ranking algorithms. Perfect for making objective final
                    decisions when you have multiple strong applicants with
                    similar qualifications.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-orange-600/10 to-red-600/10 rounded-2xl blur"></div>
                <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400 text-sm">
                      Q
                    </span>
                    When should I use Selection & Team Building?
                  </h3>
                  <p className="text-slate-400 text-sm ml-9">
                    Use Selection & Team Building for rapid candidate screening
                    (1-5 resumes). It provides quick FIT/REJECT decisions based
                    on job title and required keywords, perfect for fast-paced
                    hiring cycles where you need immediate decisions on
                    candidate suitability.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-teal-600/10 to-cyan-600/10 rounded-2xl blur"></div>
                <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 bg-teal-500/20 rounded-lg flex items-center justify-center text-teal-400 text-sm">
                      Q
                    </span>
                    Can I combine different analysis methods in my hiring
                    process?
                  </h3>
                  <p className="text-slate-400 text-sm ml-9">
                    Absolutely! Many recruiters use Selection & Team Building
                    for rapid pre-screening, Smart Screening for initial
                    evaluation, Find Best Fit for comparing finalists, and Smart
                    Review for deep analysis of selected candidates. This
                    multi-stage approach ensures thorough evaluation at each
                    hiring phase.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-pink-600/10 to-rose-600/10 rounded-2xl blur"></div>
                <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 bg-pink-500/20 rounded-lg flex items-center justify-center text-pink-400 text-sm">
                      Q
                    </span>
                    What's the difference between the four analysis methods?
                  </h3>
                  <p className="text-slate-400 text-sm ml-9">
                    Smart Review provides comprehensive individual analysis,
                    Smart Screening handles bulk processing (2-10 resumes), Find
                    Best Fit compares candidates side-by-side (2-5), and
                    Selection & Team Building offers quick FIT/REJECT decisions
                    (1-5). Each serves different stages of your hiring funnel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
