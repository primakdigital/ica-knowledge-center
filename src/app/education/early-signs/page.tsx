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

// Wizard configuration for early signs checklist
const WIZARD_CONFIG: WizardConfig = {
  title: "זיהוי סימנים מוקדמים",
  subtitle: "כלי לאיתור תלמידים בסיכון",
  description: "סמנו את הסימנים שהבחנתם בתלמיד/ה. הכלי יעזור להעריך את רמת הסיכון ויציע המלצות לפעולה.",
  mode: "checklist",
  showProgressBar: true,
  allowSkip: true,

  steps: [
    {
      id: "academic",
      title: "שינויים אקדמיים",
      question: "האם הבחנתם בשינויים בתחום הלימודים?",
      options: [
        { id: "grades", value: 1, label: "ירידה פתאומית בציונים", icon: "📉" },
        { id: "homework", value: 1, label: "אי הגשת עבודות", icon: "📝" },
        { id: "focus", value: 1, label: "קשיי ריכוז בשיעורים", icon: "🧠" },
        { id: "late", value: 1, label: "איחורים תכופים", icon: "⏰" },
        { id: "absence", value: 1, label: "היעדרויות ללא הסבר", icon: "❌" },
      ],
    },
    {
      id: "behavior",
      title: "שינויים התנהגותיים",
      question: "האם הבחנתם בשינויים בהתנהגות?",
      options: [
        { id: "anger", value: 1, label: "עצבנות או תוקפנות", icon: "😤" },
        { id: "isolation", value: 1, label: "הסתגרות ושתיקנות", icon: "🤐" },
        { id: "mood", value: 1, label: "שינויים פתאומיים במצב רוח", icon: "😔" },
        { id: "secretive", value: 1, label: "התנהגות סודית", icon: "🔒" },
        { id: "lies", value: 1, label: "שקרים תכופים", icon: "🤥" },
      ],
    },
    {
      id: "social",
      title: "שינויים חברתיים",
      question: "האם הבחנתם בשינויים בתפקוד החברתי?",
      options: [
        { id: "old_friends", value: 1, label: "התרחקות מחברים ותיקים", icon: "👋" },
        { id: "new_friends", value: 1, label: "חברים חדשים מחוץ לבית הספר", icon: "👥" },
        { id: "lonely", value: 1, label: "בידוד בהפסקות", icon: "🚶" },
        { id: "activities", value: 1, label: "סירוב להשתתף בפעילויות", icon: "🎭" },
        { id: "conflicts", value: 1, label: "קונפליקטים עם תלמידים", icon: "⚡" },
      ],
    },
    {
      id: "physical",
      title: "סימנים פיזיים",
      question: "האם הבחנתם בסימנים פיזיים?",
      options: [
        { id: "eyes", value: 1, label: "עיניים אדומות או עייפות", icon: "👀" },
        { id: "hygiene", value: 1, label: "הזנחת היגיינה או הופעה", icon: "🚿" },
        { id: "weight", value: 1, label: "ירידה/עלייה במשקל", icon: "⚖️" },
        { id: "tired", value: 1, label: "עייפות קיצונית", icon: "😴" },
        { id: "smell", value: 1, label: "ריחות חריגים", icon: "👃" },
      ],
    },
    {
      id: "additional",
      title: "סימנים נוספים",
      question: "האם יש סימנים נוספים?",
      options: [
        { id: "interest", value: 1, label: "עניין מופרז בנושאי סמים/אלכוהול", icon: "💬" },
        { id: "objects", value: 1, label: "חפצים חשודים", icon: "🔍" },
        { id: "money", value: 1, label: "בקשות לכסף", icon: "💰" },
        { id: "calls", value: 1, label: "שיחות טלפון סודיות", icon: "📱" },
        { id: "reports", value: 1, label: "דיווחים מתלמידים אחרים", icon: "🗣" },
      ],
    },
  ],

  resultThresholds: [
    {
      min: 0,
      max: 4,
      title: "מעט סימנים",
      description: "הסימנים שציינתם בודדים. יש להמשיך לעקוב אך אין צורך בהתערבות מיידית.",
      color: "green",
      recommendations: [
        "תעדו את ההתרשמות ושמרו על קשב",
        "ניתן לשוחח עם התלמיד/ה באופן לא פורמלי",
      ],
      ctaLabel: "חזרה לדף הבית",
      ctaHref: "/education",
    },
    {
      min: 5,
      max: 10,
      title: "יש לשים לב",
      description: "מספר הסימנים מצדיק מעקב צמוד יותר ושיחה עם התלמיד/ה.",
      color: "yellow",
      recommendations: [
        "מומלץ לדווח ליועץ/ת ולתעד",
        "שקלו שיחה ראשונית עם התלמיד/ה",
      ],
      ctaLabel: "פרוטוקול שיחה ראשונית",
      ctaHref: "/education/protocols",
    },
    {
      min: 11,
      max: 17,
      title: "נדרשת התערבות",
      description: "הסימנים רבים ומצדיקים התערבות. יש לדווח ליועץ ולתעד.",
      color: "orange",
      recommendations: [
        "דווחו מיד ליועץ/ת בית הספר",
        "תעדו את כל הסימנים בכתב",
        "הכינו רקע לשיחת צוות",
      ],
      ctaLabel: "פרוטוקול דיווח",
      ctaHref: "/education/protocols",
    },
    {
      min: 18,
      max: 25,
      title: "דחוף - נדרשת פעולה מיידית",
      description: "ריכוז גבוה של סימנים. יש לפעול מיד לפי הפרוטוקול.",
      color: "red",
      recommendations: [
        "דווחו מיד להנהלה וליועץ/ת",
        "זמנו את ההורים בהקדם",
        "שקלו עירוב גורמי טיפול חיצוניים",
      ],
      ctaLabel: "פרוטוקול חירום",
      ctaHref: "/education/protocols",
    },
  ],

  completionMessage: "תודה על מילוי השאלון. הערכת הסיכון מבוססת על מספר הסימנים שזוהו.",
  backLabel: "הקודם",
  nextLabel: "הבא",
  submitLabel: "סיום והערכה",
  restartLabel: "התחל מחדש",
};

export default function EducationEarlySignsPage() {
  const router = useRouter();

  const handleComplete = (answers: Record<string, string | string[]>, score?: number) => {
    console.log("Assessment complete:", { answers, score });
  };

  return (
    <MasterWizard
      config={WIZARD_CONFIG}
      persona="education"
      onComplete={handleComplete}
    />
  );
}
