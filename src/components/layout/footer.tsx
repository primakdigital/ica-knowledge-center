import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * ICA Global Footer Component
 *
 * Styled according to ICA Design System v2.0:
 * - Background: Navy (#000F37)
 * - 4 columns layout
 * - Logo + Nav + Help + Contact
 * - Legal bar at bottom
 */

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "w-full bg-[var(--ica-primary)] text-white",
        className
      )}
    >
      {/* Main Footer Content */}
      <div className="mx-auto max-w-[var(--ica-content-desktop)] px-[var(--ica-space-6)] py-[var(--ica-space-12)]">
        <div className="grid grid-cols-1 gap-[var(--ica-space-8)] md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo & About */}
          <div className="flex flex-col gap-[var(--ica-space-4)]">
            <div className="flex items-center gap-[var(--ica-space-2)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--ica-radius-md)] bg-white/10">
                <span className="text-lg font-bold">ICA</span>
              </div>
              <span className="text-lg font-semibold">מרכז הידע</span>
            </div>
            <p className="text-[var(--ica-text-small)] text-white/70">
              המרכז הישראלי להתמכרויות - מידע, כלים ומשאבים מקצועיים.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-[var(--ica-space-3)]">
            <h4 className="text-[var(--ica-text-body)] font-semibold">קישורים מהירים</h4>
            <nav className="flex flex-col gap-[var(--ica-space-2)]">
              <a href="/therapist" className="text-[var(--ica-text-small)] text-white/70 transition-colors hover:text-white">
                לובי מטפל/ת
              </a>
              <a href="/search" className="text-[var(--ica-text-small)] text-white/70 transition-colors hover:text-white">
                חיפוש במרכז הידע
              </a>
              <a href="https://ica.org.il" className="text-[var(--ica-text-small)] text-white/70 transition-colors hover:text-white">
                אתר ICA הראשי
              </a>
            </nav>
          </div>

          {/* Column 3: Help */}
          <div className="flex flex-col gap-[var(--ica-space-3)]">
            <h4 className="text-[var(--ica-text-body)] font-semibold">עזרה</h4>
            <nav className="flex flex-col gap-[var(--ica-space-2)]">
              <a href="/help" className="text-[var(--ica-text-small)] text-white/70 transition-colors hover:text-white">
                איך החיפוש עובד?
              </a>
              <a href="/accessibility" className="text-[var(--ica-text-small)] text-white/70 transition-colors hover:text-white">
                הצהרת נגישות
              </a>
              <a href="/privacy" className="text-[var(--ica-text-small)] text-white/70 transition-colors hover:text-white">
                מדיניות פרטיות
              </a>
            </nav>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-[var(--ica-space-3)]">
            <h4 className="text-[var(--ica-text-body)] font-semibold">יצירת קשר</h4>
            <div className="flex flex-col gap-[var(--ica-space-2)] text-[var(--ica-text-small)] text-white/70">
              <a href="mailto:info@ica.org.il" className="transition-colors hover:text-white">
                info@ica.org.il
              </a>
              <span>טלפון: 03-1234567</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[var(--ica-content-desktop)] px-[var(--ica-space-6)] py-[var(--ica-space-4)]">
          <div className="flex flex-col items-center justify-between gap-[var(--ica-space-2)] text-[var(--ica-text-caption)] text-white/50 md:flex-row">
            <span>© {currentYear} ICA — המרכז הישראלי להתמכרויות. כל הזכויות שמורות.</span>
            <div className="flex gap-[var(--ica-space-4)]">
              <a href="/terms" className="transition-colors hover:text-white/70">
                תנאי שימוש
              </a>
              <a href="/privacy" className="transition-colors hover:text-white/70">
                מדיניות פרטיות
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
