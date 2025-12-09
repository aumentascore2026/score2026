import { useRef, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import FloatingNotification, { Notification } from '@/components/FloatingNotification';

export default function Success() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);

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

  // Timer for promotional price
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      // Reset timer after 3 seconds
      const resetTimer = setTimeout(() => {
        setTimeLeft(300);
        setIsExpired(false);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Auto-play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked, user can click to play
      });
    }
  }, []);

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
        // Keep ONLY 1 notification at a time
        return [newNotification];
      });

      // Schedule next notification (every 25 seconds)
      const nextTimer = setTimeout(addNotification, 25000);
      timers.push(nextTimer);
    };

    // Start first notification after 8 seconds
    const initialTimer = setTimeout(addNotification, 8000);
    timers.push(initialTimer);

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [notifications]);

  // Remove notification
  const handleRemoveNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
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
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'linear-gradient(45deg, transparent 48%, rgba(59, 130, 246, 0.5) 49%, rgba(59, 130, 246, 0.5) 51%, transparent 52%)',
            backgroundSize: '100px 100px'
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          {/* Video Section - Top Priority */}
          <div className="mb-12 animate-fade-in-up">
            <div className="glass rounded-2xl p-2 md:p-4 border border-blue-400/30 overflow-hidden shadow-2xl" style={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)' }}>
              <video
                ref={videoRef}
                src="/videos/guiascorereportagemJN.mp4"
                controls
                autoPlay
                loop
                className="w-full rounded-xl"
                style={{ maxHeight: '600px', objectFit: 'contain', backgroundColor: '#000' }}
              />
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              PARABÉNS PELA ESCOLHA!
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              A SUA VIDA ESTÁ PRESTES A MUDAR
            </h2>
            <p className="text-xl md:text-2xl text-blue-300 font-semibold">
              COM APENAS 1 CLIQUE!!!
            </p>
          </div>

          {/* Benefits Section */}
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="glass rounded-2xl p-8 md:p-10 border border-blue-400/30 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📞</div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-300 mb-2">
                      Os bancos vão começar te ligar
                    </h3>
                    <p className="text-blue-200/80">
                      Para te disponibilizar cartão de crédito com limites altos
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl">✅</div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-300 mb-2">
                      Seu financiamento vai ser aprovado
                    </h3>
                    <p className="text-blue-200/80">
                      Com as melhores taxas do mercado
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl">🎉</div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-300 mb-2">
                      Sua vida vai mudar!!!
                    </h3>
                    <p className="text-blue-200/80">
                      Comece agora mesmo a jornada para o sucesso financeiro
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="glass rounded-2xl p-8 md:p-10 border border-blue-400/30 text-center space-y-6">
              <p className="text-lg md:text-xl text-blue-300 leading-relaxed">
                Clique no botão abaixo e adquira agora
              </p>

              <div className="space-y-2">
                <p className="text-sm text-blue-200/60 line-through">
                  de R$ 299,99
                </p>
                <p className="text-4xl md:text-5xl font-bold text-green-400">
                  por apenas R$ 49,90
                </p>
              </div>

              <a
                href="https://pay.frequenciaboa.shop/2wq7Gr7Den8gBAN"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block px-8 py-4 md:py-6 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg md:text-2xl rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 glow-cyan text-center"
              >
                Quero aumentar meu score HOJE!!!
              </a>

              {/* Promotional Timer */}
              <div className={`text-center py-4 px-6 rounded-lg transition-all duration-300 ${
                isExpired 
                  ? 'bg-red-500/20 border border-red-400/50' 
                  : 'bg-green-500/20 border border-green-400/50'
              }`}>
                <p className="text-sm text-blue-200/80 mb-2">
                  {isExpired ? '⏰ Promoção expirada! Reiniciando...' : '⏱️ Promoção válida por:'}
                </p>
                <p className={`text-3xl md:text-4xl font-bold font-mono ${
                  isExpired ? 'text-red-400' : 'text-green-400'
                }`}>
                  {formatTime(timeLeft)}
                </p>
                <p className="text-xs text-blue-200/60 mt-2">
                  {isExpired ? 'A promoção será reiniciada em breve' : 'Aproveite este preço especial!'}
                </p>
              </div>

              <p className="text-xl font-bold text-blue-300">
                Seja feliz ainda hoje 🎊
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center animate-bounce">
            <ChevronDown className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Floating Notifications */}
      <FloatingNotification
        notifications={notifications}
        onRemove={handleRemoveNotification}
      />

      {/* CSS for animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .glow-cyan {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }

        .glass {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
}
