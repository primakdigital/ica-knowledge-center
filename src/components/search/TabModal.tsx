"use client";

import * as React from "react";

interface TabModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: string;
  children: React.ReactNode;
}

export function TabModal({ isOpen, onClose, title, icon, children }: TabModalProps) {
  // Handle Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      {/* Dimmed Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        dir="rtl"
        className="relative z-10 w-full max-w-4xl mx-4 mt-16 mb-8 max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          {/* Close Button - Top Left for RTL */}
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="סגור"
          >
            <span className="text-gray-600 text-xl">✕</span>
          </button>

          {/* Title */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            <h2 className="font-mono text-xl font-bold text-gray-900">
              {title}
            </h2>
          </div>

          {/* Spacer for centering */}
          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default TabModal;
