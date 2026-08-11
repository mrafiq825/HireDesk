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
    showToast("Message sent successfully! We will get back to you shortly.", "success");
  }

  return (
    <div className="min-h-screen bg-[#07110D] relative overflow-hidden text-[#F3F7F4]">
      <Navbar />

      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#94B69E]/10 blur-[130px] pointer-events-none" />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-12">
        <div className="text-center space-y-4">
          <span className="glass-badge glass-badge-primary">GET IN TOUCH</span>
          <h1 className="text-4xl sm:text-6xl font-bold text-[#F3F7F4]">
            Contact <span className="text-[#94B69E]">HireDesk Support</span>
          </h1>
          <p className="text-base sm:text-lg text-[#AAB8AF] max-w-2xl mx-auto leading-relaxed">
            Have questions about enterprise quotas, custom integrations, or platform capabilities? We're here to assist.
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-10">
          {state.succeeded ? (
            <div className="text-center py-12 space-y-4">
              <span className="text-5xl">✨</span>
              <h3 className="text-2xl font-bold text-[#F3F7F4]">Thank You for Reaching Out!</h3>
              <p className="text-sm text-[#AAB8AF]">Our support team will respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#AAB8AF] mb-2">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="glass-input w-full p-3.5 text-sm"
                    placeholder="Jane Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#AAB8AF] mb-2">Work Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="glass-input w-full p-3.5 text-sm"
                    placeholder="jane@company.com"
                    required
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#AAB8AF] mb-2">Subject / Topic</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  className="glass-input w-full p-3.5 text-sm"
                  placeholder="Upgrade credit limits, technical query..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#AAB8AF] mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="glass-input w-full p-3.5 text-sm resize-none"
                  placeholder="How can our AI recruitment team help you?"
                  required
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="btn-primary px-8 py-3.5 text-sm font-semibold rounded-xl"
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
