"use client";

/**
 * Family Signs Checklist - Using Master_Wizard
 * Route: /family/signs
 * רשימת סימנים לזיהוי - Warning Signs Checklist for Parents
 */

import { useRouter } from "next/navigation";
import MasterWizard, {
  type WizardConfig,
} from "@/components/masters/Master_Wizard_v1.0";

// =============================================================================
// WIZARD CONFIGURATION
// =============================================================================

const SIGNS_CHECKLIST_CONFIG: WizardConfig = {
  title: "רשימת סימני אזהרה",
  subtitle: "סמנו את הסימנים שהבחנתם בהם — זה יעזור לכם להבין את המצב",
  mode: "checklist",
  showProgressBar: true,
  allowSkip: true,

  steps: [
    {
      id: "behavior",
      title: "שינויים בהתנהגות",
      question: "האם הבחנתם באחד או יותר מהשינויים הבאים בהתנהגות?",
      type: "multi-select",
      options: [
        { value: 1, label: "הסתגרות והתרחקות מהמשפחה", icon: "🚪" },
        { value: 1, label: "שינויים פתאומיים במצב הרוח", icon: "😔" },
        { value: 1, label: "התפרצויות זעם או עצבנות יתר", icon: "😤" },
        { value: 1, label: "שקרים או העלמת מידע", icon: "🤥" },
        { value: 1, label: "התנהגות סודית או חשדנית", icon: "🔒" },
      ],
    },
    {
      id: "social",
      title: "שינויים חברתיים",
      question: "האם הבחנתם בשינויים בחיים החברתיים?",
      type: "multi-select",
      options: [
        { value: 1, label: "החלפת חברים פתאומית", icon: "👥" },
        { value: 1, label: "הימנעות מלהציג חברים חדשים", icon: "❓" },
        { value: 1, label: "ירידה בפעילויות שאהב/ה", icon: "⚽" },
        { value: 1, label: "בעיות עם חברים ותיקים", icon: "💔" },
      ],
    },
    {
      id: "school",
      title: "בית ספר ולימודים",
      question: "האם יש שינויים בתחום הלימודים?",
      type: "multi-select",
      options: [
        { value: 1, label: "ירידה בציונים", icon: "📉" },
        { value: 1, label: "היעדרויות מבית הספר", icon: "🏫" },
        { value: 1, label: "אובדן עניין בלימודים", icon: "📚" },
        { value: 1, label: "בעיות משמעת", icon: "⚠️" },
        { value: 1, label: "תלונות ממורים", icon: "📝" },
      ],
    },
    {
      id: "physical",
      title: "סימנים פיזיים",
      question: "האם הבחנתם בסימנים פיזיים?",
      type: "multi-select",
      options: [
        { value: 1, label: "עיניים אדומות או אישונים מורחבים/מצומצמים", icon: "👀" },
        { value: 1, label: "שינויים בהרגלי שינה", icon: "😴" },
        { value: 1, label: "שינויים בתיאבון או במשקל", icon: "🍽" },
        { value: 1, label: "הזנחת היגיינה או הופעה", icon: "🚿" },
        { value: 1, label: "ריחות חריגים", icon: "👃" },
      ],
    },
    {
      id: "money",
      title: "כסף וחפצים",
      question: "האם הבחנתם בשינויים הקשורים לכסף או חפצים?",
      type: "multi-select",
      options: [
        { value: 1, label: "בקשות תכופות לכסף", icon: "💰" },
        { value: 1, label: "היעלמות של כסף או חפצים מהבית", icon: "❌" },
        { value: 1, label: "חפצים חדשים ללא הסבר", icon: "🎁" },
        { value: 1, label: "אביזרים חשודים בחדר/בתיק", icon: "🔍" },
      ],
    },
  ],

  resultThresholds: [
    {
      minScore: 0,
      maxScore: 3,
      level: "green",
      title: "מעט סימנים",
      message: "הסימנים שציינתם בודדים ואינם בהכרח מעידים על בעיה. יחד עם זאת, חשוב להמשיך לשים לב.",
      recommendation: "המשיכו להיות קשובים ולשמור על תקשורת פתוחה.",
      actions: [
        { label: "חזרה לדף הבית", href: "/family" },
        { label: "טיפים לתקשורת עם מתבגרים", href: "/family/guides" },
      ],
    },
    {
      minScore: 4,
      maxScore: 8,
      level: "yellow",
      title: "כדאי לשים לב",
      message: "יש מספר סימנים שכדאי לשים אליהם לב. זה לא בהכרח אומר שיש התמכרות, אבל שווה לברר.",
      recommendation: "שקלו לנהל שיחה פתוחה ולבדוק מה קורה. אל תחכו.",
      actions: [
        { label: "איך לדבר על זה?", href: "/family/guides" },
        { label: "התייעצות טלפונית", href: "tel:*2631" },
      ],
    },
    {
      minScore: 9,
      maxScore: 14,
      level: "orange",
      title: "מומלץ לפנות להתייעצות",
      message: "ריבוי הסימנים מצביע על כך שכדאי לפנות להתייעצות מקצועית.",
      recommendation: "פנייה למומחה תעזור לכם להבין מה קורה ומה הצעדים הבאים.",
      actions: [
        { label: "התקשרו עכשיו: *2631", href: "tel:*2631" },
        { label: "מצאו מטפל/ת", href: "/family/guides#find-help" },
      ],
    },
    {
      minScore: 15,
      maxScore: 25,
      level: "red",
      title: "חשוב לפנות לעזרה",
      message: "הסימנים שציינתם מצביעים על כך שכדאי מאוד לפנות לעזרה מקצועית בהקדם.",
      recommendation: "אל תחכו. פנייה מוקדמת יכולה לעשות הבדל גדול.",
      actions: [
        { label: "התקשרו עכשיו: *2631", href: "tel:*2631", primary: true },
        { label: "מרפאות ICA", href: "https://ica.org.il/clinics" },
      ],
    },
  ],

  disclaimer: "רשימה זו נועדה להעלאת מודעות ואינה מהווה אבחון. סימנים אלו יכולים להיות קשורים גם למצבים אחרים. לאבחון מדויק יש לפנות לאיש מקצוע.",
};

// =============================================================================
// COMPONENT
// =============================================================================

export default function FamilySignsPage() {
  const router = useRouter();

  const handleComplete = (answers: Record<string, number>, totalScore: number) => {
    console.log("Signs checklist completed:", { answers, totalScore });
  };

  const handleStepChange = (stepIndex: number) => {
    console.log("Step changed to:", stepIndex);
  };

  return (
    <MasterWizard
      config={SIGNS_CHECKLIST_CONFIG}
      persona="family"
      onComplete={handleComplete}
      onStepChange={handleStepChange}
    />
  );
}
