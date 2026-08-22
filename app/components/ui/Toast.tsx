import { useEffect, useState } from "react";
import type { ToastProps } from "@app-types/components";

const Toast = ({ toast, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => onClose(toast.id), 180);
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case "success":
        return "border-l-[#D4AF37]";
      case "error":
        return "border-l-[#EF4444]";
      case "warning":
        return "border-l-[#F59E0B]";
      case "info":
      default:
        return "border-l-[#D4AF37]";
    }
  };

  const getIconStyles = () => {
    switch (toast.type) {
      case "success":
        return "text-[#D4AF37]";
      case "error":
        return "text-[#EF4444]";
      case "warning":
        return "text-[#F59E0B]";
      case "info":
      default:
        return "text-[#D4AF37]";
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return (
          <svg
            className="w-4 h-4"
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
        );
      case "error":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case "info":
      default:
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`
        transition-all duration-180 ease-out
        ${isVisible && !isLeaving ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        max-w-sm w-full p-4 rounded-[6px] bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] border-l-4 ${getBorderColor()}
      `}
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 mt-0.5 ${getIconStyles()}`}>
          {getIcon()}
        </div>

        <div className="ml-3 flex-1">
          {toast.title && (
            <h4 className="text-xs font-bold text-[#F5E6C8] mb-0.5">
              {toast.title}
            </h4>
          )}
          <p className="text-xs text-[#6B7280] leading-relaxed">
            {toast.message}
          </p>

          {toast.action && (
            <div className="mt-2">
              <button
                onClick={toast.action.onClick}
                className="text-xs font-medium text-[#D4AF37] underline hover:no-underline cursor-pointer"
              >
                {toast.action.label}
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-3 text-[#6B7280] hover:text-[#F5E6C8] transition-colors p-1 cursor-pointer"
          title="Close notification"
          aria-label="Close notification"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
