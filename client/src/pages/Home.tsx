import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Zap } from 'lucide-react';
import Thermometer from '@/components/Thermometer';
import LoadingStatus from '@/components/LoadingStatus';
import FloatingNotification, { Notification } from '@/components/FloatingNotification';
import SuccessModal from '@/components/SuccessModal';

/**
 * Home Page - Score 2026 Simulator
 * Design: Futuristic cyberpunk with glassmorphism and neon effects
 * Features: Animated thermometer, loading simulation, floating notifications, success modal
 */
export default function Home() {
  // Keep Render awake with periodic ping
  useEffect(() => {
    const pingInterval = setInterval(async () => {
      try {
        await fetch(window.location.origin + '/api/ping', { method: 'HEAD' }).catch(() => {
          // Silently fail if endpoint doesn't exist
        });
      } catch (error) {
        // Silently handle errors
      }
    }, 60000); // Ping every 60 seconds (1 minute)

    return () => clearInterval(pingInterval);
  }, []);
  const [cpf, setCpf] = useState('');
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [scoreIncrease, setScoreIncrease] = useState(0);
  const [, setLocation] = useLocation();

  // Simulated user notifications
  const simulatedNotifications = [
    { name: 'Maria F.', scoreIncrease: 400 },
    { name: 'Julia M.', scoreIncrease: 450 },
    { name: 'Ricardo Alves', scoreIncrease: 900 },
    { name: 'Ana Silva', scoreIncrease: 350 },
    { name: 'Carlos Santos', scoreIncrease: 520 },
    { name: 'Fernanda Costa', scoreIncrease: 380 },
    { name: 'Bruno Oliveira', scoreIncrease: 650 },
    { name: 'Patricia Gomes', scoreIncrease: 420 },
    { name: 'Diego Martins', scoreIncrease: 750 },
    { name: 'Camila Rocha', scoreIncrease: 480 },
  ];

  // Generate random notifications (always active, slower and less frequent)
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    const addNotification = () => {
      const randomUser = simulatedNotifications[Math.floor(Math.random() * simulatedNotifications.length)];
      const newNotification: Notification = {
        id: Date.now().toString(),
        name: randomUser.name,
        scoreIncrease: randomUser.scoreIncrease,
      };

      setNotifications((prev) => {
        const updated = [...prev, newNotification];
        return updated.slice(-2); // Keep only last 2
      });

      // Schedule next notification (every 15 seconds)
      const nextTimer = setTimeout(addNotification, 15000);
      timers.push(nextTimer);
    };

    // Start first notification after 3 seconds
    const initialTimer = setTimeout(addNotification, 3000);
    timers.push(initialTimer);

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [notifications]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cpf.length < 11) return;

    setIsLoading(true);
    setProgress(0);
    setScore(0);

    // Simulate progress increase
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 800);

    // Simulate score increase (slower)
    const scoreInterval = setInterval(() => {
      setScore((prev) => {
        if (prev >= 850) {
          clearInterval(scoreInterval);
          return 850;
        }
        return prev + Math.random() * 50;
      });
    }, 400);

    // Complete simulation after 12 seconds (doubled duration)
    setTimeout(() => {
      clearInterval(progressInterval);
      clearInterval(scoreInterval);
      setProgress(100);
      setScore(850);
      setIsLoading(false);

      // Show success modal
      const increase = Math.floor(Math.random() * 450) + 500;
      setScoreIncrease(increase);
      setShowSuccessModal(true);
    }, 12000);
  };

  // Remove notification
  const handleRemoveNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Reset form
  const handleReset = () => {
    setCpf('');
    setScore(0);
    setProgress(0);
    setShowSuccessModal(false);
  };

  // Navigate to success page
  const handleGoToSuccess = () => {
    setLocation('/success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Diagonal Lines */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(45deg, transparent 48%, rgba(59, 130, 246, 0.5) 49%, rgba(59, 130, 246, 0.5) 51%, transparent 52%)',
              backgroundSize: '100px 100px',
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in-down">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img src="/images/logo.png" alt="Logo" className="h-16 md:h-20 w-auto" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Aumente seu Score
            </h1>
            <img src="/images/logo.png" alt="Logo" className="h-16 md:h-20 w-auto" />
          </div>
          <p className="text-lg md:text-xl text-blue-300 max-w-2xl mx-auto">
            Aumente ainda hoje o seu score com a maior tecnologia avançada
          </p>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Thermometer */}
          <div className="flex justify-center animate-slide-in-left">
            <Thermometer score={score} isAnimating={isLoading} />
          </div>

          {/* Right Column - Form and Status */}
          <div className="space-y-8 animate-slide-in-right">
            {/* Form - Hidden when loading */}
            {!isLoading && !showSuccessModal && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="glass rounded-xl p-6 md:p-8 border border-blue-400/30 space-y-6">
                  <div className="space-y-2 group">
                    <label className="text-sm font-semibold text-blue-300 group-focus-within:text-blue-200 transition-colors">
                      Digite seu CPF
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value.replace(/\D/g, '').slice(0, 11))}
                        placeholder="000.000.000-00"
                        maxLength={11}
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-blue-900/30 border border-blue-400/50 rounded-lg text-blue-100 placeholder-blue-400/50 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 disabled:opacity-50 group-focus-within:border-blue-200 group-focus-within:shadow-lg group-focus-within:shadow-blue-400/30"
                      />
                      {!isLoading && cpf.length === 0 && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-pulse">
                          <div className="text-2xl">👉</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={isLoading || cpf.length < 11}
                      className={`w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 relative overflow-hidden group ${
                        cpf.length === 0 && !isLoading ? 'animate-button-glow' : 'hover:animate-button-glow'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/0 via-blue-200/50 to-purple-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
                      <span className="relative z-10">{isLoading ? 'Analisando...' : 'Aumentar Agora'}</span>
                    </button>

                    {showSuccessModal && (
                      <button
                        type="button"
                        onClick={handleReset}
                        className="w-full px-6 py-3 bg-slate-800/50 border border-blue-400/30 text-blue-300 font-semibold rounded-lg transition-all duration-300 hover:bg-slate-700/50 hover:border-blue-400/50"
                      >
                        Nova Simulação
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}

            {/* Loading Status */}
            {isLoading && (
              <div className="animate-fade-in-up">
                <LoadingStatus isLoading={isLoading} progress={Math.min(progress, 100)} />
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Análise Completa',
              description: 'Fazemos uma varredura de todas suas dívidas nas instituições financeiras',
            },
            {
              title: 'Resultado Instantâneo',
              description: 'O seu score é aumentado em poucas horas',
            },
            {
              title: 'Tecnologia Avançada',
              description: 'I.A de ultima geração faz todo o trabalho para aumentar seu score',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="glass rounded-xl p-6 border border-blue-400/30 text-center space-y-3 hover:border-blue-300 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl">
                {index === 0 && '🔍'}
                {index === 1 && '⚡'}
                {index === 2 && '🤖'}
              </div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">{item.title}</h3>
              <p className="text-sm text-blue-200/60 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Notifications */}
      <FloatingNotification
        notifications={notifications}
        onRemove={handleRemoveNotification}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        scoreIncrease={scoreIncrease}
        onProceed={handleGoToSuccess}
      />

      {/* CSS Animations */}
      <style>{`
        @keyframes button-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.5);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-button-glow {
          animation: button-glow 2s ease-in-out infinite;
        }

        .animate-shine {
          animation: shine 3s infinite;
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .glass {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .glow-cyan {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}
