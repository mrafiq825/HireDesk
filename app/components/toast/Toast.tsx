import React, { useEffect } from "react";
import type { ToastComponentProps } from "@app-types/components";

const Toast: React.FC<ToastComponentProps> = ({
  type,
  title,
  message,
  show,
  onClose,
  duration = 5000,
  action,
  actions,
}) => {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const getTypeBadge = () => {
    switch (type) {
      case "success":
        return "glass-badge-success";
      case "error":
        return "glass-badge-danger";
      case "warning":
        return "glass-badge-warning";
      case "info":
      default:
        return "glass-badge-primary";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full">
      <div className="bg-[#1B1B1B] p-4 border border-[rgba(107,114,128,0.2)] rounded-[6px] flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`glass-badge ${getTypeBadge()} uppercase text-[10px]`}
            >
              {type}
            </span>
            {title && (
              <span className="font-bold text-xs text-[#F5E6C8]">{title}</span>
            )}
          </div>
          <p className="text-xs text-[#6B7280] leading-relaxed">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-[#6B7280] hover:text-[#F5E6C8] text-xs p-1 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
