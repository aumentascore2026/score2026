import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface LoadingStatusProps {
  isLoading: boolean;
  progress: number;
}

/**
 * LoadingStatus Component
 * Design: Futuristic glassmorphism with neon effects
 * Simulates financial institution queries with animated status messages
 */
export default function LoadingStatus({ isLoading, progress }: LoadingStatusProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    "Pesquisando instituições financeiras...",
    "Extraindo informações do Serasa...",
    "Extraindo informações do SPC Brasil...",
    "Extraindo informações da Boa Vista SCPC...",
    "Analisando histórico de crédito...",
    "Calculando score final...",
  ];

  useEffect(() => {
    if (!isLoading) {
      setCompletedSteps([]);
      return;
    }

    const stepsToComplete = Math.ceil((progress / 100) * steps.length);
    setCompletedSteps(Array.from({ length: stepsToComplete }, (_, i) => i));
  }, [progress, isLoading]);

  if (!isLoading && completedSteps.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8 space-y-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-mono text-blue-300">Progresso</span>
          <span className="text-sm font-mono text-blue-400 glow-text-cyan">{progress}%</span>
        </div>
        <div className="w-full h-2 glass rounded-full overflow-hidden border border-blue-400/30">
          <div
            className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 transition-all duration-300 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Status Messages */}
      <div className="space-y-3 mt-6">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isActive = index === completedSteps.length && isLoading;

          return (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 glass rounded-lg border transition-all duration-300 ${
                isCompleted
                  ? 'border-green-400/50 bg-green-500/10'
                  : isActive
                  ? 'border-blue-400/50 bg-blue-500/10'
                  : 'border-blue-400/20 bg-transparent opacity-40'
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 glow-green" />
              ) : isActive ? (
                <Loader2 className="w-5 h-5 text-blue-400 flex-shrink-0 animate-spin glow-cyan" />
              ) : (
                <div className="w-5 h-5 rounded-full border border-blue-400/30" />
              )}
              <span
                className={`text-sm font-mono ${
                  isCompleted
                    ? 'text-green-300'
                    : isActive
                    ? 'text-blue-300 glow-text-cyan'
                    : 'text-blue-300/50'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
