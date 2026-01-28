"use client";

/**
 * User Self-Assessment - Using Master_Wizard
 * Route: /user/assessment
 * שאלון הערכה עצמית - Self-Assessment Wizard for Users
 */

import { useRouter } from "next/navigation";
import MasterWizard, {
  type WizardConfig,
} from "@/components/masters/Master_Wizard_v1.0";

const ASSESSMENT_CONFIG: WizardConfig = {
  title: "הערכה עצמית",
  subtitle: "שאלון קצר שיעזור לך להבין את המצב שלך טוב יותר",
  mode: "single-select",
  showProgressBar: true,
  allowSkip: false,

  steps: [
    {
      id: "frequency",
      title: "תדירות השימוש",
      question: "באיזו תדירות את/ה משתמש/ת בחומר או מבצע/ת את ההתנהגות?",
      options: [
        { id: "never", value: 0, label: "אף פעם או לעתים רחוקות", icon: "🟢" },
        { id: "weekly", value: 1, label: "פעם בשבוע או פחות", icon: "🟡" },
        { id: "several", value: 2, label: "מספר פעמים בשבוע", icon: "🟠" },
        { id: "daily", value: 3, label: "כמעט כל יום או כל יום", icon: "🔴" },
      ],
    },
    {
      id: "control",
      title: "שליטה",
      question: "האם את/ה מרגיש/ה שאת/ה יכול/ה לשלוט בכמות או בתדירות?",
      options: [
        { id: "full", value: 0, label: "כן, תמיד יש לי שליטה מלאה", icon: "🟢" },
        { id: "mostly", value: 1, label: "לרוב כן, אבל לפעמים קשה", icon: "🟡" },
        { id: "sometimes", value: 2, label: "לא תמיד, לעתים אני מאבד/ת שליטה", icon: "🟠" },
        { id: "none", value: 3, label: "לא, אין לי שליטה", icon: "🔴" },
      ],
    },
    {
      id: "impact",
      title: "השפעה על החיים",
      question: "האם זה משפיע על העבודה, הלימודים, או היחסים שלך?",
      options: [
        { id: "no_impact", value: 0, label: "לא, אין השפעה", icon: "🟢" },
        { id: "slight", value: 1, label: "לפעמים יש השפעה קלה", icon: "🟡" },
        { id: "significant", value: 2, label: "כן, יש השפעה משמעותית", icon: "🟠" },
        { id: "severe", value: 3, label: "כן, זה פוגע מאוד בחיים שלי", icon: "🔴" },
      ],
    },
    {
      id: "thoughts",
      title: "מחשבות",
      question: "כמה זמן ביום את/ה מוצא/ת את עצמך חושב/ת על זה?",
      options: [
        { id: "rarely", value: 0, label: "כמעט בכלל לא", icon: "🟢" },
        { id: "sometimes_think", value: 1, label: "לפעמים במהלך היום", icon: "🟡" },
        { id: "often", value: 2, label: "הרבה מהזמן", icon: "🟠" },
        { id: "always", value: 3, label: "כמעט כל הזמן", icon: "🔴" },
      ],
    },
    {
      id: "attempts",
      title: "ניסיונות להפסיק",
      question: "האם ניסית להפסיק או להפחית בעבר?",
      options: [
        { id: "no_need", value: 0, label: "לא הייתי צריך/ה", icon: "🟢" },
        { id: "easy", value: 1, label: "כן, והצלחתי בקלות", icon: "🟡" },
        { id: "hard", value: 2, label: "כן, אבל היה קשה", icon: "🟠" },
        { id: "failed", value: 3, label: "כן, וכשלתי כמה פעמים", icon: "🔴" },
      ],
    },
  ],

  resultThresholds: [
    {
      min: 0,
      max: 4,
      title: "מצב תקין",
      description: "לפי התשובות שלך, נראה שאין סימנים מדאיגים כרגע.",
      color: "green",
      recommendations: ["המשך/י לעקוב אחרי עצמך ושמור/י על איזון בריא"],
      ctaLabel: "חזרה לדף הבית",
      ctaHref: "/user",
    },
    {
      min: 5,
      max: 9,
      title: "כדאי לשים לב",
      description: "יש כמה סימנים שכדאי לשים אליהם לב. זה לא אומר שיש בעיה, אבל כדאי להיות מודע/ת.",
      color: "yellow",
      recommendations: ["שקול/י לקרוא עוד על הנושא או לדבר עם מישהו"],
      ctaLabel: "כלים לעזרה עצמית",
      ctaHref: "/user/resources",
    },
    {
      min: 10,
      max: 12,
      title: "מומלץ לפנות לעזרה",
      description: "התשובות שלך מצביעות על כך שייתכן שתרוויח/י מתמיכה מקצועית.",
      color: "orange",
      recommendations: ["פנייה לאיש מקצוע יכולה לעזור להבין את המצב"],
      ctaLabel: "מצא/י מטפל/ת",
      ctaHref: "/user/resources",
    },
    {
      min: 13,
      max: 15,
      title: "חשוב לפנות לעזרה",
      description: "התשובות שלך מצביעות על כך שכדאי מאוד לפנות לעזרה מקצועית.",
      color: "red",
      recommendations: ["אנחנו ממליצים לפנות לייעוץ מקצועי בהקדם. את/ה לא לבד."],
      ctaLabel: "התקשר/י עכשיו: *2631",
      ctaHref: "tel:*2631",
    },
  ],

  completionMessage: "שאלון זה מיועד להערכה עצמית ראשונית בלבד ואינו מהווה אבחון.",
  backLabel: "הקודם",
  nextLabel: "הבא",
  submitLabel: "סיום והערכה",
  restartLabel: "התחל מחדש",
};

export default function UserAssessmentPage() {
  const router = useRouter();

  const handleComplete = (answers: Record<string, string | string[]>, score?: number) => {
    console.log("Assessment completed:", { answers, score });
  };

  return (
    <MasterWizard
      config={ASSESSMENT_CONFIG}
      persona="user"
      onComplete={handleComplete}
    />
  );
}
