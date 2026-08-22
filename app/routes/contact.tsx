import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import type { Route } from "./+types/contact";
import { useForm, ValidationError } from "@formspree/react";
import { useToast } from "@contexts/ToastContext";

const SITE_URL = "https://hiredesk.vercel.app";
const PAGE_TITLE =
  "Contact HireDesk — Get Help with AI Resume Screening & Hiring Tools";
const PAGE_DESCRIPTION =
  "Questions about HireDesk's AI-powered hiring tools? Contact our team for help with Smart Review, Smart Screening, Find Best Fit, or Quick Screen.";

export function meta({}: Route.MetaArgs) {
  return [
    { title: PAGE_TITLE },
    { name: "description", content: PAGE_DESCRIPTION },
    { tagName: "link", rel: "canonical", href: `${SITE_URL}/contact` },
    { property: "og:url", content: `${SITE_URL}/contact` },
    { property: "og:title", content: PAGE_TITLE },
    { property: "og:description", content: PAGE_DESCRIPTION },
    { property: "og:type", content: "website" },
  ];
}

const Contact = () => {
  const [state, handleSubmit] = useForm("mwpvrznl");
  const { showToast } = useToast();

  if (state.succeeded) {
    showToast(
      "Message sent successfully! We will get back to you shortly.",
      "success",
    );
  }

  return (
    <div className="min-h-screen bg-[#171717] relative text-[#F5E6C8]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-10">
        <div className="text-center space-y-3">
          <span className="glass-badge glass-badge-primary rounded-[4px]">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#F5E6C8]">
            Contact <span className="text-[#D4AF37]">HireDesk Support</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-xl mx-auto leading-relaxed">
            Have questions about enterprise quotas, custom integrations, or
            platform capabilities? We're here to assist.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8">
          {state.succeeded ? (
            <div className="text-center py-10 space-y-3">
              <span className="text-4xl">✨</span>
              <h3 className="text-xl font-bold text-[#F5E6C8]">
                Thank You for Reaching Out!
              </h3>
              <p className="text-xs text-[#6B7280]">
                Our support team will respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#6B7280] mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="glass-input w-full p-2.5 text-xs sm:text-sm"
                    placeholder="Jane Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#6B7280] mb-1.5">
                    Work Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="glass-input w-full p-2.5 text-xs sm:text-sm"
                    placeholder="jane@company.com"
                    required
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#6B7280] mb-1.5">
                  Subject / Topic
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  className="glass-input w-full p-2.5 text-xs sm:text-sm"
                  placeholder="Upgrade credit limits, technical query..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#6B7280] mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="glass-input w-full p-2.5 text-xs sm:text-sm resize-none"
                  placeholder="How can our AI recruitment team help you?"
                  required
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="btn-primary px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-[6px]"
                >
                  {state.submitting ? "Sending Message..." : "Send Message"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
