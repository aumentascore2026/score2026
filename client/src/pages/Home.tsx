import { useEffect, useState } from 'react';
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
  const [cpf, setCpf] = useState('');
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [scoreIncrease, setScoreIncrease] = useState(0);

  // Simulated user notifications
  const simulatedNotifications = [
    { name: 'Maria F.', increase: 400 },
    { name: 'Julia M.', increase: 450 },
    { name: 'Ricardo Alves', increase: 900 },
    { name: 'Ana Silva', increase: 350 },
    { name: 'Carlos Santos', increase: 550 },
    { name: 'Beatriz Costa', increase: 700 },
  ];

  // Generate random notifications
  useEffect(() => {
    if (!isLoading) return;

    const notificationInterval = setInterval(() => {
      const randomUser = simulatedNotifications[
        Math.floor(Math.random() * simulatedNotifications.length)
      ];
      
      const newNotification: Notification = {
        id: `${Date.now()}-${Math.random()}`,
        name: randomUser.name,
        scoreIncrease: randomUser.increase,
        timeAgo: 'agora',
      };

      setNotifications((prev) => [...prev, newNotification]);
    }, 2000);

    return () => clearInterval(notificationInterval);
  }, [isLoading]);

  // Handle CPF input
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 11);
    setCpf(value);
  };

  // Format CPF for display
  const formatCpf = (value: string) => {
    if (!value) return '';
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cpf.length < 11) {
      alert('Por favor, digite um CPF válido');
      return;
    }

    // Start simulation
    setIsLoading(true);
    setProgress(0);
    setScore(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 300);

    // Simulate score increase
    const scoreInterval = setInterval(() => {
      setScore((prev) => {
        if (prev >= 850) {
          clearInterval(scoreInterval);
          return 850;
        }
        return prev + Math.random() * 100;
      });
    }, 200);

    // Complete simulation after 6 seconds
    setTimeout(() => {
      clearInterval(progressInterval);
      clearInterval(scoreInterval);
      setProgress(100);
      setScore(850);
      setIsLoading(false);

      // Show success modal
      const increase = Math.floor(Math.random() * 400) + 200;
      setScoreIncrease(increase);
      setShowSuccessModal(true);
    }, 6000);
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
    setNotifications([]);
    setShowSuccessModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Background Image */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url(/images/hero-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'float 20s ease-in-out infinite',
          }}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        {/* Animated Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-8 h-8 text-cyan-400 glow-cyan" />
              <h1 className="text-4xl md:text-6xl font-bold font-mono text-white glow-text-cyan">
                SCORE 2026
              </h1>
              <Zap className="w-8 h-8 text-cyan-400 glow-cyan" />
            </div>
            <p className="text-lg md:text-xl text-cyan-300/80 font-light">
              Simulador de Score com Tecnologia Avançada
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
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="glass rounded-xl p-6 md:p-8 border border-cyan-400/30 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-cyan-300 mb-3">
                      Digite seu CPF
                    </label>
                    <input
                      type="text"
                      value={formatCpf(cpf)}
                      onChange={handleCpfChange}
                      placeholder="000.000.000-00"
                      disabled={isLoading}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-400/30 rounded-lg text-white placeholder-cyan-400/40 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 font-mono text-lg disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={isLoading || cpf.length < 11}
                      className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold rounded-lg transition-all duration-300 hover:shadow-2xl hover:glow-cyan disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 glow-cyan"
                    >
                      {isLoading ? 'Analisando...' : 'Simular Score'}
                    </button>

                    {showSuccessModal && (
                      <button
                        type="button"
                        onClick={handleReset}
                        className="w-full px-6 py-3 bg-slate-800/50 border border-cyan-400/30 text-cyan-300 font-semibold rounded-lg transition-all duration-300 hover:bg-slate-700/50 hover:border-cyan-400/50"
                      >
                        Nova Simulação
                      </button>
                    )}
                  </div>
                </div>
              </form>

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
                description: 'Consultamos todas as instituições financeiras',
                icon: '📊',
              },
              {
                title: 'Resultado Instantâneo',
                description: 'Receba seu score em segundos',
                icon: '⚡',
              },
              {
                title: 'Tecnologia Avançada',
                description: 'I.A de última geração para análise precisa',
                icon: '🤖',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="glass rounded-lg p-6 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">{item.title}</h3>
                <p className="text-sm text-cyan-200/60">{item.description}</p>
              </div>
            ))}
          </div>
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
      />
    </div>
  );
}
