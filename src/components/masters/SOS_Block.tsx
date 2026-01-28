'use client';

import React, { useState } from 'react';

// ============================================================================
// SOS BLOCK v1.0
// ============================================================================
// A reusable emergency contact component for crisis support.
// Can be displayed as a floating button, inline block, or full modal.
//
// VARIANTS:
// - floating: Fixed position button in corner (default bottom-left)
// - inline: Embedded block within page content
// - banner: Top/bottom banner with dismiss option
//
// USAGE:
// - All personas: Provides immediate access to crisis resources
// - Floating button appears on all content pages
// - Inline block used in relevant content sections
// - Banner for high-risk assessment results
// ============================================================================

// Types
type SOSVariant = 'floating' | 'inline' | 'banner';
type SOSPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
type SOSTheme = 'urgent' | 'supportive' | 'minimal';

interface EmergencyContact {
  id: string;
  name: string;
  description?: string;
  phone?: string;
  hours?: string;
  url?: string;
  icon?: 'phone' | 'chat' | 'web' | 'location';
  isPrimary?: boolean;
}

interface SOSConfig {
  title?: string;
  subtitle?: string;
  message?: string;
  contacts: EmergencyContact[];
  showDismiss?: boolean;
  dismissLabel?: string;
  expandedByDefault?: boolean;
}

interface SOSBlockProps {
  variant?: SOSVariant;
  position?: SOSPosition;
  theme?: SOSTheme;
  config?: SOSConfig;
  onContactClick?: (contact: EmergencyContact) => void;
  onDismiss?: () => void;
}

// Default configuration
const defaultConfig: SOSConfig = {
  title: 'צריך עזרה עכשיו?',
  subtitle: 'אנחנו כאן בשבילך',
  message: 'אם את/ה במצוקה או חושב/ת על פגיעה עצמית, אנא פנה/י לאחד מהקווים הבאים. אתה לא לבד.',
  contacts: [
    {
      id: 'eran',
      name: 'ער"ן - עזרה ראשונה נפשית',
      description: 'קו חירום לתמיכה נפשית',
      phone: '*2201',
      hours: '24/7',
      icon: 'phone',
      isPrimary: true,
    },
    {
      id: 'sahar',
      name: 'סה"ר - סיוע והקשבה ברשת',
      description: 'צ\'אט תמיכה מקוון',
      url: 'https://sahar.org.il',
      hours: '24/7',
      icon: 'chat',
    },
    {
      id: 'natal',
      name: 'נט"ל - טראומה לאומית',
      description: 'קו סיוע לנפגעי טראומה',
      phone: '*6911',
      hours: '24/7',
      icon: 'phone',
    },
    {
      id: 'moked106',
      name: 'מוקד 106',
      description: 'קו חירום עירוני',
      phone: '106',
      hours: '24/7',
      icon: 'phone',
    },
  ],
  showDismiss: false,
  dismissLabel: 'סגור',
  expandedByDefault: false,
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

// Icon components
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function WebIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

// Get icon by type
function ContactIcon({ type, className }: { type?: string; className?: string }) {
  switch (type) {
    case 'phone':
      return <PhoneIcon className={className} />;
    case 'chat':
      return <ChatIcon className={className} />;
    case 'web':
      return <WebIcon className={className} />;
    case 'location':
      return <LocationIcon className={className} />;
    default:
      return <PhoneIcon className={className} />;
  }
}

// Contact card component
function ContactCard({
  contact,
  theme,
  onClick,
}: {
  contact: EmergencyContact;
  theme: SOSTheme;
  onClick?: () => void;
}) {
  const isPrimary = contact.isPrimary;

  const baseClasses = "w-full p-4 rounded-lg text-right transition-all";
  const themeClasses = {
    urgent: isPrimary
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-red-50 border border-red-200 hover:bg-red-100",
    supportive: isPrimary
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-blue-50 border border-blue-200 hover:bg-blue-100",
    minimal: isPrimary
      ? "bg-gray-800 text-white hover:bg-gray-900"
      : "bg-gray-100 border border-gray-200 hover:bg-gray-200",
  };

  const textColorClass = isPrimary ? 'text-white/80' : 'text-gray-500';
  const nameColorClass = isPrimary ? 'text-white' : 'text-gray-900';

  const handleClick = () => {
    if (contact.phone) {
      window.location.href = `tel:${contact.phone}`;
    } else if (contact.url) {
      window.open(contact.url, '_blank');
    }
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${themeClasses[theme]}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          isPrimary ? 'bg-white/20' : 'bg-white'
        }`}>
          <ContactIcon type={contact.icon} className={`w-5 h-5 ${isPrimary ? 'text-white' : 'text-gray-600'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-bold ${nameColorClass}`}>{contact.name}</div>
          {contact.description && (
            <div className={`text-sm ${textColorClass}`}>{contact.description}</div>
          )}
        </div>
        <div className="text-left flex-shrink-0">
          {contact.phone && (
            <div className={`font-bold text-lg ${nameColorClass}`} dir="ltr">{contact.phone}</div>
          )}
          {contact.hours && (
            <div className={`text-xs ${textColorClass}`}>{contact.hours}</div>
          )}
        </div>
      </div>
    </button>
  );
}

// ============================================================================
// VARIANT COMPONENTS
// ============================================================================

// Floating button variant
function FloatingButton({
  position,
  theme,
  config,
  onContactClick,
}: {
  position: SOSPosition;
  theme: SOSTheme;
  config: SOSConfig;
  onContactClick?: (contact: EmergencyContact) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(config.expandedByDefault);

  const positionClasses: Record<SOSPosition, string> = {
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6',
    'top-left': 'top-20 left-6',
    'top-right': 'top-20 right-6',
  };

  const themeColors = {
    urgent: 'bg-red-600 hover:bg-red-700',
    supportive: 'bg-blue-600 hover:bg-blue-700',
    minimal: 'bg-gray-800 hover:bg-gray-900',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`} dir="rtl">
      {/* Expanded panel */}
      {isExpanded && (
        <div className="mb-4 w-80 bg-white rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className={`p-4 ${theme === 'urgent' ? 'bg-red-600' : theme === 'supportive' ? 'bg-blue-600' : 'bg-gray-800'} text-white`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{config.title}</h3>
                {config.subtitle && (
                  <p className="text-sm text-white/80">{config.subtitle}</p>
                )}
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Message */}
          {config.message && (
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <p className="text-sm text-gray-600">{config.message}</p>
            </div>
          )}

          {/* Contacts */}
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {config.contacts.map(contact => (
              <ContactCard
                key={contact.id}
                contact={contact}
                theme={theme}
                onClick={() => onContactClick?.(contact)}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <HeartIcon className="w-3 h-3 text-red-500" />
              <span>אתה לא לבד. אנחנו כאן בשבילך.</span>
            </p>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          ${themeColors[theme]} text-white px-4 py-3 rounded-full shadow-lg
          flex items-center gap-2 transition-all hover:scale-105
          ${isExpanded ? 'ring-4 ring-white/30' : ''}
        `}
      >
        <PhoneIcon className="w-5 h-5" />
        <span className="font-medium">{config.title || 'צריך עזרה?'}</span>
      </button>
    </div>
  );
}

// Inline block variant
function InlineBlock({
  theme,
  config,
  onContactClick,
  onDismiss,
}: {
  theme: SOSTheme;
  config: SOSConfig;
  onContactClick?: (contact: EmergencyContact) => void;
  onDismiss?: () => void;
}) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const themeClasses = {
    urgent: 'bg-red-50 border-red-200',
    supportive: 'bg-blue-50 border-blue-200',
    minimal: 'bg-gray-50 border-gray-200',
  };

  const titleColors = {
    urgent: 'text-red-800',
    supportive: 'text-blue-800',
    minimal: 'text-gray-800',
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <div dir="rtl" className={`rounded-xl border-2 overflow-hidden ${themeClasses[theme]}`}>
      {/* Header */}
      <div className="p-4 flex justify-between items-start">
        <div>
          <h3 className={`font-bold text-lg ${titleColors[theme]}`}>{config.title}</h3>
          {config.subtitle && (
            <p className="text-sm text-gray-600 mt-1">{config.subtitle}</p>
          )}
        </div>
        {config.showDismiss && (
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-black/5 rounded transition-colors"
          >
            <CloseIcon className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Message */}
      {config.message && (
        <div className="px-4 pb-3">
          <p className="text-sm text-gray-600">{config.message}</p>
        </div>
      )}

      {/* Contacts grid */}
      <div className="p-4 pt-0 grid gap-3 sm:grid-cols-2">
        {config.contacts.map(contact => (
          <ContactCard
            key={contact.id}
            contact={contact}
            theme={theme}
            onClick={() => onContactClick?.(contact)}
          />
        ))}
      </div>
    </div>
  );
}

// Banner variant
function BannerBlock({
  theme,
  config,
  onContactClick,
  onDismiss,
}: {
  theme: SOSTheme;
  config: SOSConfig;
  onContactClick?: (contact: EmergencyContact) => void;
  onDismiss?: () => void;
}) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (isDismissed) return null;

  const themeClasses = {
    urgent: 'bg-red-600 text-white',
    supportive: 'bg-blue-600 text-white',
    minimal: 'bg-gray-800 text-white',
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  // Get primary contact for quick display
  const primaryContact = config.contacts.find(c => c.isPrimary) || config.contacts[0];

  return (
    <div dir="rtl" className={`${themeClasses[theme]}`}>
      {/* Main banner */}
      <div className="px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PhoneIcon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{config.title}</span>
            {primaryContact && (
              <a
                href={primaryContact.phone ? `tel:${primaryContact.phone}` : primaryContact.url}
                className="font-bold underline hover:no-underline"
                dir="ltr"
                onClick={() => onContactClick?.(primaryContact)}
              >
                {primaryContact.phone || primaryContact.name}
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm underline hover:no-underline"
            >
              {isExpanded ? 'הסתר' : 'עוד קווים'}
            </button>
            {config.showDismiss && (
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expanded contacts */}
      {isExpanded && (
        <div className="bg-white text-gray-900 border-t">
          <div className="max-w-6xl mx-auto p-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {config.contacts.map(contact => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  theme={theme}
                  onClick={() => onContactClick?.(contact)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function SOSBlock({
  variant = 'floating',
  position = 'bottom-left',
  theme = 'urgent',
  config,
  onContactClick,
  onDismiss,
}: SOSBlockProps) {
  const mergedConfig = { ...defaultConfig, ...config };

  switch (variant) {
    case 'floating':
      return (
        <FloatingButton
          position={position}
          theme={theme}
          config={mergedConfig}
          onContactClick={onContactClick}
        />
      );
    case 'inline':
      return (
        <InlineBlock
          theme={theme}
          config={mergedConfig}
          onContactClick={onContactClick}
          onDismiss={onDismiss}
        />
      );
    case 'banner':
      return (
        <BannerBlock
          theme={theme}
          config={mergedConfig}
          onContactClick={onContactClick}
          onDismiss={onDismiss}
        />
      );
    default:
      return null;
  }
}

// ============================================================================
// EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  SOSVariant,
  SOSPosition,
  SOSTheme,
  EmergencyContact,
  SOSConfig,
  SOSBlockProps,
};

// Pre-configured exports
export const SOSFloating = (props: Omit<SOSBlockProps, 'variant'>) => (
  <SOSBlock {...props} variant="floating" />
);

export const SOSInline = (props: Omit<SOSBlockProps, 'variant'>) => (
  <SOSBlock {...props} variant="inline" />
);

export const SOSBanner = (props: Omit<SOSBlockProps, 'variant'>) => (
  <SOSBlock {...props} variant="banner" />
);
