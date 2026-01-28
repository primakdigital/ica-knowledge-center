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

// =============================================================================
// WIZARD CONFIGURATION
// =============================================================================

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
      type: "single-select",
      options: [
        { value: 0, label: "אף פעם או לעתים רחוקות", icon: "🟢" },
        { value: 1, label: "פעם בשבוע או פחות", icon: "🟡" },
        { value: 2, label: "מספר פעמים בשבוע", icon: "🟠" },
        { value: 3, label: "כמעט כל יום או כל יום", icon: "🔴" },
      ],
    },
    {
      id: "control",
      title: "שליטה",
      question: "האם את/ה מרגיש/ה שאת/ה יכול/ה לשלוט בכמות או בתדירות?",
      type: "single-select",
      options: [
        { value: 0, label: "כן, תמיד יש לי שליטה מלאה", icon: "🟢" },
        { value: 1, label: "לרוב כן, אבל לפעמים קשה", icon: "🟡" },
        { value: 2, label: "לא תמיד, לעתים אני מאבד/ת שליטה", icon: "🟠" },
        { value: 3, label: "לא, אין לי שליטה", icon: "🔴" },
      ],
    },
    {
      id: "impact",
      title: "השפעה על החיים",
      question: "האם זה משפיע על העבודה, הלימודים, או היחסים שלך?",
      type: "single-select",
      options: [
        { value: 0, label: "לא, אין השפעה", icon: "🟢" },
        { value: 1, label: "לפעמים יש השפעה קלה", icon: "🟡" },
        { value: 2, label: "כן, יש השפעה משמעותית", icon: "🟠" },
        { value: 3, label: "כן, זה פוגע מאוד בחיים שלי", icon: "🔴" },
      ],
    },
    {
      id: "thoughts",
      title: "מחשבות",
      question: "כמה זמן ביום את/ה מוצא/ת את עצמך חושב/ת על זה?",
      type: "single-select",
      options: [
        { value: 0, label: "כמעט בכלל לא", icon: "🟢" },
        { value: 1, label: "לפעמים במהלך היום", icon: "🟡" },
        { value: 2, label: "הרבה מהזמן", icon: "🟠" },
        { value: 3, label: "כמעט כל הזמן", icon: "🔴" },
      ],
    },
    {
      id: "attempts",
      title: "ניסיונות להפסיק",
      question: "האם ניסית להפסיק או להפחית בעבר?",
      type: "single-select",
      options: [
        { value: 0, label: "לא הייתי צריך/ה", icon: "🟢" },
        { value: 1, label: "כן, והצלחתי בקלות", icon: "🟡" },
        { value: 2, label: "כן, אבל היה קשה", icon: "🟠" },
        { value: 3, label: "כן, וכשלתי כמה פעמים", icon: "🔴" },
      ],
    },
  ],

  resultThresholds: [
    {
      minScore: 0,
      maxScore: 4,
      level: "green",
      title: "מצב תקין",
      message: "לפי התשובות שלך, נראה שאין סימנים מדאיגים כרגע.",
      recommendation: "המשך/י לעקוב אחרי עצמך ושמור/י על איזון בריא.",
      actions: [
        { label: "חזרה לדף הבית", href: "/user" },
        { label: "קרא/י עוד על התמכרות", href: "/user/resources" },
      ],
    },
    {
      minScore: 5,
      maxScore: 9,
      level: "yellow",
      title: "כדאי לשים לב",
      message: "יש כמה סימנים שכדאי לשים אליהם לב. זה לא אומר שיש בעיה, אבל כדאי להיות מודע/ת.",
      recommendation: "שקול/י לקרוא עוד על הנושא או לדבר עם מישהו שאת/ה סומך/ת עליו.",
      actions: [
        { label: "כלים לעזרה עצמית", href: "/user/resources" },
        { label: "קווי סיוע", href: "/user/resources#help-lines" },
      ],
    },
    {
      minScore: 10,
      maxScore: 12,
      level: "orange",
      title: "מומלץ לפנות לעזרה",
      message: "התשובות שלך מצביעות על כך שייתכן שתרוויח/י מתמיכה מקצועית.",
      recommendation: "פנייה לאיש מקצוע יכולה לעזור לך להבין טוב יותר את המצב ולקבל כלים להתמודדות.",
      actions: [
        { label: "מצא/י מטפל/ת", href: "/user/resources#find-help" },
        { label: "דבר/י עם מישהו עכשיו", href: "tel:*2631" },
      ],
    },
    {
      minScore: 13,
      maxScore: 15,
      level: "red",
      title: "חשוב לפנות לעזרה",
      message: "התשובות שלך מצביעות על כך שכדאי מאוד לפנות לעזרה מקצועית.",
      recommendation: "אנחנו ממליצים לפנות לייעוץ מקצועי בהקדם. את/ה לא לבד בזה.",
      actions: [
        { label: "התקשר/י עכשיו: *2631", href: "tel:*2631", primary: true },
        { label: "מרפאות ICA", href: "https://ica.org.il/clinics" },
      ],
    },
  ],

  disclaimer: "שאלון זה מיועד להערכה עצמית ראשונית בלבד ואינו מהווה אבחון רפואי או פסיכולוגי. לאבחון מדויק יש לפנות לאיש מקצוע מוסמך.",
};

// =============================================================================
// COMPONENT
// =============================================================================

export default function UserAssessmentPage() {
  const router = useRouter();

  const handleComplete = (answers: Record<string, number>, totalScore: number) => {
    console.log("Assessment completed:", { answers, totalScore });
    // Could save to local storage or send to analytics
  };

  const handleStepChange = (stepIndex: number) => {
    console.log("Step changed to:", stepIndex);
  };

  return (
    <MasterWizard
      config={ASSESSMENT_CONFIG}
      persona="user"
      onComplete={handleComplete}
      onStepChange={handleStepChange}
    />
  );
}
