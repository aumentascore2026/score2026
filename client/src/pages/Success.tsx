import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Success() {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked, user can click to play
      });
    }
  }, [videoUrl]);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
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
          {/* Main Title */}
          <div className="text-center mb-12 animate-fade-in-up">
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

          {/* Video Section */}
          {videoUrl && (
            <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="glass rounded-2xl p-6 md:p-8 border border-blue-400/30 overflow-hidden">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-full rounded-lg"
                  style={{ maxHeight: '500px', objectFit: 'contain' }}
                />
              </div>
            </div>
          )}

          {/* Video Upload (for development) */}
          {!videoUrl && (
            <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="glass rounded-2xl p-6 md:p-8 border border-blue-400/30 text-center">
                <label className="cursor-pointer">
                  <div className="py-12">
                    <p className="text-blue-300 mb-4">Clique para enviar seu vídeo</p>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    <div className="text-4xl">🎬</div>
                  </div>
                </label>
              </div>
            </div>
          )}

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

              <button className="w-full px-8 py-4 md:py-6 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg md:text-2xl rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 glow-cyan">
                Quero aumentar meu score HOJE!!!
              </button>

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
