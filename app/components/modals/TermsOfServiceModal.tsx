import type { TermsOfServiceModalProps } from "@app-types/components";

export const TermsOfServiceModal = ({
  isOpen,
  onClose,
}: TermsOfServiceModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#07110D]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <div className="relative z-50 flex items-center justify-center min-h-screen p-4">
        <div className="relative glass-floating border border-white/20 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col p-0">
          <div className="sticky top-0 bg-[#101E17] px-6 py-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#94B69E]" />
              <h2 className="text-xl font-bold text-[#F3F7F4]">Terms of Service</h2>
            </div>
            <button
              onClick={onClose}
              className="text-[#AAB8AF] hover:text-[#F3F7F4] p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
          <div className="overflow-y-auto flex-1 px-6 py-5 text-[#AAB8AF] space-y-4 text-xs leading-relaxed">
            <section>
              <h3 className="text-sm font-bold text-[#F3F7F4] mb-1">1. Acceptance of Terms</h3>
              <p>
                By creating an account on HireDesk, you accept and agree to abide by all platform rules and usage parameters.
              </p>
            </section>
            <section>
              <h3 className="text-sm font-bold text-[#F3F7F4] mb-1">2. Service Usage</h3>
              <p>
                HireDesk AI tools are provided for recruitment assessment assistance. Final hiring choices remain the responsibility of the organization.
              </p>
            </section>
          </div>
          <div className="px-6 py-4 bg-[#101E17] border-t border-white/10 flex justify-end">
            <button onClick={onClose} className="btn-primary px-5 py-2 text-xs">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
