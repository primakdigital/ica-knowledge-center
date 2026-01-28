"use client";

/**
 * Education Early Signs Checklist - Using Master_Wizard
 * Route: /education/early-signs
 * זיהוי סימנים מוקדמים - Early Warning Signs Checklist for Educators
 */

import { useRouter } from "next/navigation";
import MasterWizard, {
  type WizardConfig,
} from "@/components/masters/Master_Wizard_v1.0";

// =============================================================================
// WIZARD CONFIGURATION
// =============================================================================

const EARLY_SIGNS_CONFIG: WizardConfig = {
  title: "זיהוי סימנים מוקדמים",
  subtitle: "סמנו את הסימנים שהבחנתם בהם אצל התלמיד/ה — כלי לעזרה בהערכה ראשונית",
  mode: "checklist",
  showProgressBar: true,
  allowSkip: true,

  steps: [
    {
      id: "academic",
      title: "שינויים אקדמיים",
      question: "האם הבחנתם בשינויים בתחום הלימודים?",
      type: "multi-select",
      options: [
        { value: 1, label: "ירידה פתאומית בציונים", icon: "📉" },
        { value: 1, label: "אי הגשת עבודות", icon: "📝" },
        { value: 1, label: "קשיי ריכוז בשיעורים", icon: "🧠" },
        { value: 1, label: "איחורים תכופים", icon: "⏰" },
        { value: 1, label: "היעדרויות ללא הסבר", icon: "❌" },
      ],
    },
    {
      id: "behavior",
      title: "שינויים התנהגותיים",
      question: "האם הבחנתם בשינויים בהתנהגות?",
      type: "multi-select",
      options: [
        { value: 1, label: "עצבנות או תוקפנות", icon: "😤" },
        { value: 1, label: "הסתגרות ושתיקנות", icon: "🤐" },
        { value: 1, label: "שינויים פתאומיים במצב רוח", icon: "😔" },
        { value: 1, label: "התנהגות סודית", icon: "🔒" },
        { value: 1, label: "שקרים תכופים", icon: "🤥" },
      ],
    },
    {
      id: "social",
      title: "שינויים חברתיים",
      question: "האם הבחנתם בשינויים בתפקוד החברתי?",
      type: "multi-select",
      options: [
        { value: 1, label: "התרחקות מחברים ותיקים", icon: "👋" },
        { value: 1, label: "חברים חדשים מחוץ לבית הספר", icon: "👥" },
        { value: 1, label: "בידוד בהפסקות", icon: "🚶" },
        { value: 1, label: "סירוב להשתתף בפעילויות", icon: "🎭" },
        { value: 1, label: "קונפליקטים עם תלמידים", icon: "⚡" },
      ],
    },
    {
      id: "physical",
      title: "סימנים פיזיים",
      question: "האם הבחנתם בסימנים פיזיים?",
      type: "multi-select",
      options: [
        { value: 1, label: "עיניים אדומות או עייפות", icon: "👀" },
        { value: 1, label: "הזנחת היגיינה או הופעה", icon: "🚿" },
        { value: 1, label: "ירידה/עלייה במשקל", icon: "⚖️" },
        { value: 1, label: "עייפות קיצונית", icon: "😴" },
        { value: 1, label: "ריחות חריגים", icon: "👃" },
      ],
    },
    {
      id: "additional",
      title: "סימנים נוספים",
      question: "האם יש סימנים נוספים?",
      type: "multi-select",
      options: [
        { value: 1, label: "עניין מופרז בנושאי סמים/אלכוהול", icon: "💬" },
        { value: 1, label: "חפצים חשודים", icon: "🔍" },
        { value: 1, label: "בקשות לכסף", icon: "💰" },
        { value: 1, label: "שיחות טלפון סודיות", icon: "📱" },
        { value: 1, label: "דיווחים מתלמידים אחרים", icon: "🗣" },
      ],
    },
  ],

  resultThresholds: [
    {
      minScore: 0,
      maxScore: 4,
      level: "green",
      title: "מעט סימנים",
      message: "הסימנים שציינתם בודדים. יש להמשיך לעקוב אך אין צורך בהתערבות מיידית.",
      recommendation: "תעדו את ההתרשמות ושמרו על קשב. ניתן לשוחח עם התלמיד/ה באופן לא פורמלי.",
      actions: [
        { label: "חזרה לדף הבית", href: "/education" },
        { label: "טיפים לשיחה עם תלמידים", href: "/education/protocols" },
      ],
    },
    {
      minScore: 5,
      maxScore: 10,
      level: "yellow",
      title: "יש לשים לב",
      message: "מספר הסימנים מצדיק מעקב צמוד יותר ושיחה עם התלמיד/ה.",
      recommendation: "מומלץ לדווח ליועץ/ת ולתעד. שקלו שיחה ראשונית עם התלמיד/ה.",
      actions: [
        { label: "פרוטוקול שיחה ראשונית", href: "/education/protocols" },
        { label: "דווחו ליועץ/ת", href: "/education/protocols#reporting" },
      ],
    },
    {
      minScore: 11,
      maxScore: 17,
      level: "orange",
      title: "מומלץ להתערב",
      message: "ריבוי הסימנים מצביע על צורך בהתערבות. יש לדווח ולפעול לפי פרוטוקול.",
      recommendation: "דווחו מיד ליועץ/ת בית הספר. יש לקיים שיחה עם ההורים ולבחון הפניה.",
      actions: [
        { label: "פרוטוקול התערבות", href: "/education/protocols" },
        { label: "התייעצות עם ICA: *2631", href: "tel:*2631" },
      ],
    },
    {
      minScore: 18,
      maxScore: 30,
      level: "red",
      title: "נדרשת פעולה מיידית",
      message: "ריבוי הסימנים מעיד על מצב שדורש התייחסות דחופה.",
      recommendation: "יש לדווח מיד ליועץ/ת ולמנהל/ת. יש ליצור קשר עם ההורים ולשקול הפניה.",
      actions: [
        { label: "התקשרו ליועץ מיידית", href: "#", primary: true },
        { label: "התייעצות עם ICA: *2631", href: "tel:*2631" },
      ],
    },
  ],

  disclaimer: "כלי זה נועד לעזרה בהערכה ראשונית ואינו מהווה אבחון. סימנים אלו יכולים להיות קשורים גם למצבים אחרים (לחץ, בעיות בבית, וכד'). כל מקרה דורש בדיקה מעמיקה.",
};

// =============================================================================
// COMPONENT
// =============================================================================

export default function EducationEarlySignsPage() {
  const router = useRouter();

  const handleComplete = (answers: Record<string, number>, totalScore: number) => {
    console.log("Early signs checklist completed:", { answers, totalScore });
  };

  const handleStepChange = (stepIndex: number) => {
    console.log("Step changed to:", stepIndex);
  };

  return (
    <MasterWizard
      config={EARLY_SIGNS_CONFIG}
      persona="education"
      onComplete={handleComplete}
      onStepChange={handleStepChange}
    />
  );
}
