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
      options: [
        { id: "isolation", value: 1, label: "הסתגרות והתרחקות מהמשפחה", icon: "🚪" },
        { id: "mood", value: 1, label: "שינויים פתאומיים במצב הרוח", icon: "😔" },
        { id: "anger", value: 1, label: "התפרצויות זעם או עצבנות יתר", icon: "😤" },
        { id: "lies", value: 1, label: "שקרים או העלמת מידע", icon: "🤥" },
        { id: "secretive", value: 1, label: "התנהגות סודית או חשדנית", icon: "🔒" },
      ],
    },
    {
      id: "social",
      title: "שינויים חברתיים",
      question: "האם הבחנתם בשינויים בחיים החברתיים?",
      options: [
        { id: "new_friends", value: 1, label: "החלפת חברים פתאומית", icon: "👥" },
        { id: "hide_friends", value: 1, label: "הימנעות מלהציג חברים חדשים", icon: "❓" },
        { id: "activities", value: 1, label: "ירידה בפעילויות שאהב/ה", icon: "⚽" },
        { id: "old_friends", value: 1, label: "בעיות עם חברים ותיקים", icon: "💔" },
      ],
    },
    {
      id: "school",
      title: "בית ספר ולימודים",
      question: "האם יש שינויים בתחום הלימודים?",
      options: [
        { id: "grades", value: 1, label: "ירידה בציונים", icon: "📉" },
        { id: "absence", value: 1, label: "היעדרויות מבית הספר", icon: "🏫" },
        { id: "interest", value: 1, label: "אובדן עניין בלימודים", icon: "📚" },
        { id: "discipline", value: 1, label: "בעיות משמעת", icon: "⚠️" },
        { id: "teachers", value: 1, label: "תלונות ממורים", icon: "📝" },
      ],
    },
    {
      id: "physical",
      title: "סימנים פיזיים",
      question: "האם הבחנתם בסימנים פיזיים?",
      options: [
        { id: "eyes", value: 1, label: "עיניים אדומות או אישונים מורחבים/מצומצמים", icon: "👀" },
        { id: "sleep", value: 1, label: "שינויים בהרגלי שינה", icon: "😴" },
        { id: "appetite", value: 1, label: "שינויים בתיאבון או במשקל", icon: "🍽" },
        { id: "hygiene", value: 1, label: "הזנחת היגיינה או הופעה", icon: "🚿" },
        { id: "smell", value: 1, label: "ריחות חריגים", icon: "👃" },
      ],
    },
    {
      id: "money",
      title: "כסף וחפצים",
      question: "האם הבחנתם בשינויים הקשורים לכסף או חפצים?",
      options: [
        { id: "requests", value: 1, label: "בקשות תכופות לכסף", icon: "💰" },
        { id: "missing", value: 1, label: "היעלמות של כסף או חפצים מהבית", icon: "❌" },
        { id: "new_items", value: 1, label: "חפצים חדשים ללא הסבר", icon: "🎁" },
        { id: "suspicious", value: 1, label: "אביזרים חשודים בחדר/בתיק", icon: "🔍" },
      ],
    },
  ],

  resultThresholds: [
    {
      min: 0,
      max: 3,
      title: "מעט סימנים",
      description: "הסימנים שציינתם בודדים ואינם בהכרח מעידים על בעיה. יחד עם זאת, חשוב להמשיך לשים לב.",
      color: "green",
      recommendations: ["המשיכו להיות קשובים ולשמור על תקשורת פתוחה"],
      ctaLabel: "חזרה לדף הבית",
      ctaHref: "/family",
    },
    {
      min: 4,
      max: 8,
      title: "כדאי לשים לב",
      description: "יש מספר סימנים שכדאי לשים אליהם לב. זה לא בהכרח אומר שיש התמכרות, אבל שווה לברר.",
      color: "yellow",
      recommendations: ["שקלו לנהל שיחה פתוחה ולבדוק מה קורה"],
      ctaLabel: "איך לדבר על זה?",
      ctaHref: "/family/guides",
    },
    {
      min: 9,
      max: 14,
      title: "מומלץ לפנות להתייעצות",
      description: "ריבוי הסימנים מצביע על כך שכדאי לפנות להתייעצות מקצועית.",
      color: "orange",
      recommendations: ["פנייה למומחה תעזור לכם להבין מה קורה"],
      ctaLabel: "התקשרו עכשיו: *2631",
      ctaHref: "tel:*2631",
    },
    {
      min: 15,
      max: 25,
      title: "חשוב לפנות לעזרה",
      description: "הסימנים שציינתם מצביעים על כך שכדאי מאוד לפנות לעזרה מקצועית בהקדם.",
      color: "red",
      recommendations: ["אל תחכו. פנייה מוקדמת יכולה לעשות הבדל גדול."],
      ctaLabel: "התקשרו עכשיו: *2631",
      ctaHref: "tel:*2631",
    },
  ],

  completionMessage: "תודה על מילוי השאלון. זכרו - סימנים אלו יכולים להיות קשורים גם למצבים אחרים.",
  backLabel: "הקודם",
  nextLabel: "הבא",
  submitLabel: "סיום",
  restartLabel: "התחל מחדש",
};

export default function FamilySignsPage() {
  const router = useRouter();

  const handleComplete = (answers: Record<string, string | string[]>, score?: number) => {
    console.log("Signs checklist completed:", { answers, score });
  };

  return (
    <MasterWizard
      config={SIGNS_CHECKLIST_CONFIG}
      persona="family"
      onComplete={handleComplete}
    />
  );
}
