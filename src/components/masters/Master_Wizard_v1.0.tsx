'use client';

import React, { useState } from 'react';

// ============================================================================
// MASTER WIZARD v1.0
// ============================================================================
// A flexible step-by-step wizard template supporting assessment flows
// and checklists across all personas.
//
// MODES:
// - single-select: One answer per question (radio buttons) - Assessment flows
// - checklist: Multiple answers per question (checkboxes) - Signs checklists
//
// USAGE:
// - מתמודד/ת: Assessment flow (single-select)
// - משפחות: Signs_Checklist (checklist)
// - חינוך: Early_Signs (checklist)
// ============================================================================

// Types - Exported for use in page components
export type WizardMode = 'single-select' | 'checklist';
export type PersonaTheme = 'therapist' | 'user' | 'family' | 'education';

export interface AnswerOption {
  id: string;
  label: string;
  description?: string;
  value?: number; // For scoring
  icon?: string;
}

export interface WizardStep {
  id: string;
  title: string;
  subtitle?: string;
  question: string;
  helpText?: string;
  options: AnswerOption[];
  required?: boolean;
}

export interface ResultThreshold {
  min: number;
  max: number;
  title: string;
  description: string;
  color: 'green' | 'yellow' | 'orange' | 'red';
  recommendations?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface WizardConfig {
  title: string;
  subtitle?: string;
  description?: string;
  steps: WizardStep[];
  mode: WizardMode;
  showProgressBar?: boolean;
  showStepNumbers?: boolean;
  allowSkip?: boolean;
  resultThresholds?: ResultThreshold[];
  completionMessage?: string;
  backLabel?: string;
  nextLabel?: string;
  submitLabel?: string;
  restartLabel?: string;
}

interface MasterWizardProps {
  config: WizardConfig;
  persona: PersonaTheme;
  onComplete?: (answers: Record<string, string | string[]>, score?: number) => void;
  onStepChange?: (stepIndex: number) => void;
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

// Header with logo and persona indicator
function Header({ persona }: { persona: PersonaTheme }) {
  const personaLabels: Record<PersonaTheme, string> = {
    therapist: 'מטפלים',
    user: 'מתמודדים/ות',
    family: 'משפחות',
    education: 'חינוך',
  };

  return (
    <header className="h-16 border-b border-gray-300 bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
          לוגו
        </div>
        <span className="text-sm text-gray-600">מרכז הידע של עמותת ער&quot;ן</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-blue-600 font-medium">{personaLabels[persona]}</span>
        <button className="text-sm text-gray-600 hover:text-gray-800">יציאה</button>
      </div>
    </header>
  );
}

// Progress bar component
function ProgressBar({
  currentStep,
  totalSteps,
  showStepNumbers
}: {
  currentStep: number;
  totalSteps: number;
  showStepNumbers?: boolean;
}) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">
          {showStepNumbers && `שלב ${currentStep + 1} מתוך ${totalSteps}`}
        </span>
        <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Step indicator dots
function StepIndicators({
  currentStep,
  totalSteps,
  answers
}: {
  currentStep: number;
  totalSteps: number;
  answers: Record<string, string | string[]>;
}) {
  return (
    <div className="flex justify-center gap-2 mb-6">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepId = `step-${index}`;
        const isCompleted = answers[stepId] !== undefined;
        const isCurrent = index === currentStep;

        return (
          <div
            key={index}
            className={`
              w-3 h-3 rounded-full transition-all
              ${isCurrent ? 'bg-blue-500 ring-2 ring-blue-200' : ''}
              ${isCompleted && !isCurrent ? 'bg-green-500' : ''}
              ${!isCompleted && !isCurrent ? 'bg-gray-300' : ''}
            `}
          />
        );
      })}
    </div>
  );
}

// Single select option (radio style)
function SingleSelectOption({
  option,
  isSelected,
  onSelect,
}: {
  option: AnswerOption;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full p-4 rounded-lg border-2 text-right transition-all
        ${isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`
          w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5
          flex items-center justify-center
          ${isSelected ? 'border-blue-500' : 'border-gray-300'}
        `}>
          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
        </div>
        <div className="flex-1">
          <div className="font-medium text-gray-900">{option.label}</div>
          {option.description && (
            <div className="text-sm text-gray-500 mt-1">{option.description}</div>
          )}
        </div>
        {option.icon && (
          <span className="text-2xl">{option.icon}</span>
        )}
      </div>
    </button>
  );
}

// Checklist option (checkbox style)
function ChecklistOption({
  option,
  isSelected,
  onToggle,
}: {
  option: AnswerOption;
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`
        w-full p-4 rounded-lg border-2 text-right transition-all
        ${isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`
          w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5
          flex items-center justify-center
          ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}
        `}>
          {isSelected && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <div className="font-medium text-gray-900">{option.label}</div>
          {option.description && (
            <div className="text-sm text-gray-500 mt-1">{option.description}</div>
          )}
        </div>
        {option.icon && (
          <span className="text-2xl">{option.icon}</span>
        )}
      </div>
    </button>
  );
}

// Question step component
function QuestionStep({
  step,
  mode,
  selectedAnswer,
  onAnswerChange,
}: {
  step: WizardStep;
  mode: WizardMode;
  selectedAnswer: string | string[] | undefined;
  onAnswerChange: (answer: string | string[]) => void;
}) {
  const handleSingleSelect = (optionId: string) => {
    onAnswerChange(optionId);
  };

  const handleChecklistToggle = (optionId: string) => {
    const currentSelections = (selectedAnswer as string[]) || [];
    if (currentSelections.includes(optionId)) {
      onAnswerChange(currentSelections.filter(id => id !== optionId));
    } else {
      onAnswerChange([...currentSelections, optionId]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Question header */}
      <div className="text-center mb-8">
        {step.subtitle && (
          <div className="text-sm text-blue-600 font-medium mb-2">{step.subtitle}</div>
        )}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{step.question}</h2>
        {step.helpText && (
          <p className="text-gray-500">{step.helpText}</p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3">
        {mode === 'single-select' ? (
          step.options.map(option => (
            <SingleSelectOption
              key={option.id}
              option={option}
              isSelected={selectedAnswer === option.id}
              onSelect={() => handleSingleSelect(option.id)}
            />
          ))
        ) : (
          step.options.map(option => (
            <ChecklistOption
              key={option.id}
              option={option}
              isSelected={(selectedAnswer as string[] || []).includes(option.id)}
              onToggle={() => handleChecklistToggle(option.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Results screen component
function ResultsScreen({
  config,
  answers,
  score,
  onRestart,
}: {
  config: WizardConfig;
  answers: Record<string, string | string[]>;
  score: number;
  onRestart: () => void;
}) {
  // Find matching threshold
  const result = config.resultThresholds?.find(
    t => score >= t.min && score <= t.max
  );

  const colorClasses: Record<string, string> = {
    green: 'bg-green-100 border-green-500 text-green-800',
    yellow: 'bg-yellow-100 border-yellow-500 text-yellow-800',
    orange: 'bg-orange-100 border-orange-500 text-orange-800',
    red: 'bg-red-100 border-red-500 text-red-800',
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Score display */}
      <div className="mb-8">
        <div className="text-6xl font-bold text-gray-900 mb-2">{score}</div>
        <div className="text-gray-500">נקודות מתוך {config.steps.length * 4}</div>
      </div>

      {/* Result card */}
      {result && (
        <div className={`p-6 rounded-xl border-2 mb-8 ${colorClasses[result.color]}`}>
          <h3 className="text-xl font-bold mb-2">{result.title}</h3>
          <p className="mb-4">{result.description}</p>

          {result.recommendations && result.recommendations.length > 0 && (
            <div className="text-right mt-4 pt-4 border-t border-current/20">
              <div className="font-medium mb-2">המלצות:</div>
              <ul className="space-y-1">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span>•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.ctaLabel && result.ctaHref && (
            <a
              href={result.ctaHref}
              className="inline-block mt-4 px-6 py-3 bg-white rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              {result.ctaLabel}
            </a>
          )}
        </div>
      )}

      {/* Completion message */}
      {config.completionMessage && !result && (
        <div className="p-6 rounded-xl bg-gray-100 mb-8">
          <p className="text-gray-700">{config.completionMessage}</p>
        </div>
      )}

      {/* Summary of answers (checklist mode) */}
      {config.mode === 'checklist' && (
        <div className="text-right mb-8">
          <h4 className="font-bold mb-3">סימנים שנבחרו:</h4>
          <div className="space-y-2">
            {Object.entries(answers).map(([stepId, answer]) => {
              const stepIndex = parseInt(stepId.split('-')[1]);
              const step = config.steps[stepIndex];
              const selectedOptions = (answer as string[]).map(
                id => step.options.find(o => o.id === id)?.label
              ).filter(Boolean);

              if (selectedOptions.length === 0) return null;

              return (
                <div key={stepId} className="text-sm text-gray-600">
                  <span className="font-medium">{step.title}:</span>{' '}
                  {selectedOptions.join(', ')}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onRestart}
          className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          {config.restartLabel || 'התחל מחדש'}
        </button>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          שמור תוצאות
        </button>
      </div>
    </div>
  );
}

// Navigation buttons
function NavigationButtons({
  currentStep,
  totalSteps,
  canProceed,
  allowSkip,
  isCompleted,
  backLabel,
  nextLabel,
  submitLabel,
  onBack,
  onNext,
  onSubmit,
}: {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  allowSkip?: boolean;
  isCompleted: boolean;
  backLabel: string;
  nextLabel: string;
  submitLabel: string;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}) {
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
      <button
        onClick={onBack}
        disabled={currentStep === 0}
        className={`
          px-6 py-3 rounded-lg font-medium transition-colors
          ${currentStep === 0
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
          }
        `}
      >
        {backLabel}
      </button>

      <div className="flex gap-3">
        {allowSkip && !canProceed && !isLastStep && (
          <button
            onClick={onNext}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
          >
            דלג
          </button>
        )}

        {isLastStep ? (
          <button
            onClick={onSubmit}
            disabled={!canProceed && !isCompleted}
            className={`
              px-8 py-3 rounded-lg font-medium transition-colors
              ${canProceed || isCompleted
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {submitLabel}
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!canProceed}
            className={`
              px-8 py-3 rounded-lg font-medium transition-colors
              ${canProceed
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  );
}

// SOS Button (floating)
function SOSButton() {
  return (
    <button className="fixed bottom-6 left-6 bg-red-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center gap-2 z-50">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span className="font-medium">צריך עזרה עכשיו?</span>
    </button>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function MasterWizard({
  config,
  persona,
  onComplete,
  onStepChange,
}: MasterWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const currentStepData = config.steps[currentStep];
  const stepKey = `step-${currentStep}`;
  const currentAnswer = answers[stepKey];

  // Check if current step can proceed
  const canProceed = config.mode === 'single-select'
    ? currentAnswer !== undefined
    : (currentAnswer as string[] || []).length > 0 || !currentStepData?.required;

  // Calculate score
  const calculateScore = (): number => {
    let score = 0;
    Object.entries(answers).forEach(([stepKey, answer]) => {
      const stepIndex = parseInt(stepKey.split('-')[1]);
      const step = config.steps[stepIndex];

      if (config.mode === 'single-select') {
        const selectedOption = step.options.find(o => o.id === answer);
        score += selectedOption?.value || 0;
      } else {
        (answer as string[]).forEach(optionId => {
          const option = step.options.find(o => o.id === optionId);
          score += option?.value || 1;
        });
      }
    });
    return score;
  };

  // Handlers
  const handleAnswerChange = (answer: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [stepKey]: answer,
    }));
  };

  const handleNext = () => {
    if (currentStep < config.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      onStepChange?.(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      onStepChange?.(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const score = calculateScore();
    setFinalScore(score);
    setIsCompleted(true);
    onComplete?.(answers, score);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
    setFinalScore(0);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 flex flex-col">
      <Header persona={persona} />

      <main className="flex-1 py-8 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Wizard header */}
          {!isCompleted && (
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
              {config.subtitle && (
                <p className="text-gray-600 mt-1">{config.subtitle}</p>
              )}
            </div>
          )}

          {/* Progress */}
          {!isCompleted && config.showProgressBar && (
            <ProgressBar
              currentStep={currentStep}
              totalSteps={config.steps.length}
              showStepNumbers={config.showStepNumbers}
            />
          )}

          {/* Step indicators */}
          {!isCompleted && (
            <StepIndicators
              currentStep={currentStep}
              totalSteps={config.steps.length}
              answers={answers}
            />
          )}

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            {isCompleted ? (
              <ResultsScreen
                config={config}
                answers={answers}
                score={finalScore}
                onRestart={handleRestart}
              />
            ) : (
              <>
                <QuestionStep
                  step={currentStepData}
                  mode={config.mode}
                  selectedAnswer={currentAnswer}
                  onAnswerChange={handleAnswerChange}
                />
                <NavigationButtons
                  currentStep={currentStep}
                  totalSteps={config.steps.length}
                  canProceed={canProceed}
                  allowSkip={config.allowSkip}
                  isCompleted={isCompleted}
                  backLabel={config.backLabel || 'הקודם'}
                  nextLabel={config.nextLabel || 'הבא'}
                  submitLabel={config.submitLabel || 'סיום'}
                  onBack={handleBack}
                  onNext={handleNext}
                  onSubmit={handleSubmit}
                />
              </>
            )}
          </div>
        </div>
      </main>

      {/* SOS Button */}
      <SOSButton />
    </div>
  );
}

// ============================================================================
// EXAMPLE CONFIGURATIONS
// ============================================================================

// Example: Assessment flow (single-select mode)
export const assessmentFlowExample: WizardConfig = {
  title: 'שאלון הערכה עצמית',
  subtitle: 'בוא/י נבדוק ביחד איך את/ה מרגיש/ה',
  mode: 'single-select',
  showProgressBar: true,
  showStepNumbers: true,
  steps: [
    {
      id: 'mood',
      title: 'מצב רוח',
      question: 'איך היית מתאר/ת את מצב הרוח שלך בשבועיים האחרונים?',
      helpText: 'בחר/י את התשובה שהכי מתארת אותך',
      options: [
        { id: 'great', label: 'מצוין', description: 'אני מרגיש/ה טוב רוב הזמן', value: 0, icon: '😊' },
        { id: 'ok', label: 'בסדר', description: 'יש עליות וירידות', value: 1, icon: '😐' },
        { id: 'low', label: 'לא כל כך טוב', description: 'יש תקופות קשות', value: 2, icon: '😔' },
        { id: 'bad', label: 'קשה לי', description: 'אני מתקשה לתפקד', value: 3, icon: '😢' },
      ],
    },
    {
      id: 'sleep',
      title: 'שינה',
      question: 'איך השינה שלך בתקופה האחרונה?',
      options: [
        { id: 'good', label: 'שינה טובה', description: 'ישן/ה היטב רוב הלילות', value: 0 },
        { id: 'some-issues', label: 'קשיים קלים', description: 'לפעמים קשה להירדם או מתעורר/ת', value: 1 },
        { id: 'poor', label: 'קשיים משמעותיים', description: 'הרבה לילות עם קושי', value: 2 },
        { id: 'severe', label: 'הפרעות שינה קשות', description: 'כמעט כל לילה קשה', value: 3 },
      ],
    },
  ],
  resultThresholds: [
    { min: 0, max: 2, title: 'מצב תקין', description: 'נראה שאת/ה מתמודד/ת טוב. המשך/י לשמור על עצמך!', color: 'green' },
    { min: 3, max: 4, title: 'קשיים קלים', description: 'יש כמה אתגרים. אולי כדאי לשקול לדבר עם מישהו.', color: 'yellow', recommendations: ['נסה/י טכניקות הרגעה', 'שמור/י על שגרה'] },
    { min: 5, max: 6, title: 'מומלץ לפנות לעזרה', description: 'נראה שאת/ה עובר/ת תקופה מאתגרת. פנייה לעזרה יכולה לעזור.', color: 'red', ctaLabel: 'מצא/י עזרה מקצועית', ctaHref: '/user/resources' },
  ],
};

// Example: Signs checklist (checklist mode)
export const signsChecklistExample: WizardConfig = {
  title: 'סימני אזהרה',
  subtitle: 'סמן/י את הסימנים שהבחנת בהם',
  description: 'השאלון הבא יעזור לך לזהות סימני אזהרה. סמן/י את כל הסימנים שהבחנת בהם.',
  mode: 'checklist',
  showProgressBar: true,
  allowSkip: true,
  steps: [
    {
      id: 'behavioral',
      title: 'סימנים התנהגותיים',
      question: 'האם הבחנת בשינויים התנהגותיים?',
      helpText: 'ניתן לבחור מספר תשובות',
      required: false,
      options: [
        { id: 'isolation', label: 'הסתגרות חברתית', description: 'נמנע/ת ממפגשים חברתיים', value: 1 },
        { id: 'sleep', label: 'שינויים בשינה', description: 'ישן/ה יותר מדי או פחות מדי', value: 1 },
        { id: 'appetite', label: 'שינויים בתיאבון', description: 'אוכל/ת הרבה יותר או פחות', value: 1 },
        { id: 'hygiene', label: 'הזנחת היגיינה', description: 'פחות מקפיד/ה על מראה חיצוני', value: 1 },
      ],
    },
    {
      id: 'emotional',
      title: 'סימנים רגשיים',
      question: 'האם הבחנת בשינויים רגשיים?',
      required: false,
      options: [
        { id: 'sadness', label: 'עצבות מתמשכת', description: 'נראה/ית עצוב/ה רוב הזמן', value: 1 },
        { id: 'anger', label: 'כעסים ותסכול', description: 'מתפרץ/ת בקלות', value: 1 },
        { id: 'hopeless', label: 'חוסר תקווה', description: 'מדבר/ת על העתיד בשליליות', value: 1 },
        { id: 'anxiety', label: 'חרדה', description: 'נראה/ית מודאג/ת ומתוח/ה', value: 1 },
      ],
    },
  ],
  completionMessage: 'תודה שמילאת את השאלון. אם זיהית מספר סימנים, שקול/י לפנות לייעוץ מקצועי.',
};
