import type { TermsOfServiceModalProps } from "@app-types/components";

export const TermsOfServiceModal = ({
  isOpen,
  onClose,
}: TermsOfServiceModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/70 transition-opacity"
        onClick={onClose}
      />
      <div className="relative z-50 flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] rounded-[6px] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col p-0">
          <div className="sticky top-0 bg-[#1B1B1B] px-6 py-4 flex items-center justify-between border-b border-[rgba(107,114,128,0.2)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <h2 className="text-base font-bold text-[#F5E6C8]">
                Terms of Service
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-[#6B7280] hover:text-[#F5E6C8] p-1.5 rounded-[4px] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
          <div className="overflow-y-auto flex-1 px-6 py-5 text-[#6B7280] space-y-4 text-xs leading-relaxed">
            <section>
              <h3 className="text-sm font-bold text-[#F5E6C8] mb-1">
                1. Acceptance of Terms
              </h3>
              <p>
                By creating an account on HireDesk, you accept and agree to
                abide by all platform rules and usage parameters.
              </p>
            </section>
            <section>
              <h3 className="text-sm font-bold text-[#F5E6C8] mb-1">
                2. Service Usage
              </h3>
              <p>
                HireDesk AI tools are provided for recruitment assessment
                assistance. Final hiring choices remain the responsibility of
                the organization.
              </p>
            </section>
          </div>
          <div className="px-6 py-4 bg-[#1B1B1B] border-t border-[rgba(107,114,128,0.2)] flex justify-end">
            <button
              onClick={onClose}
              className="btn-primary px-5 py-2 text-xs font-semibold rounded-[6px]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
