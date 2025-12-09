import { useEffect, useState } from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  scoreIncrease: number;
}

/**
 * SuccessModal Component
 * Design: Futuristic glassmorphism with celebration effects
 * Displays success message after score simulation
 */
export default function SuccessModal({ isOpen, onClose, scoreIncrease }: SuccessModalProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowContent(true);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        showContent ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={onClose}
    >
      <div
        className={`glass rounded-2xl p-8 md:p-12 max-w-md w-full border border-cyan-400/50 shadow-2xl transform transition-all duration-500 ${
          showContent
            ? 'scale-100 opacity-100'
            : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration Background */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-green-500/10" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-cyan-400 rounded-full blur-xl opacity-50 animate-pulse" />
              <CheckCircle className="w-20 h-20 text-green-400 glow-green relative" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white glow-text-cyan">
              Parabéns!
            </h2>
            <p className="text-lg text-green-300 font-semibold">
              Seu score pode subir <span className="text-green-400 glow-text-cyan">+{scoreIncrease} pontos</span> ainda hoje!
            </p>
          </div>

          {/* Description */}
          <div className="space-y-4 text-sm text-cyan-200/80">
            <p>
              Com base nas nossas informações coletadas, nosso sistema vai te ajudar a conseguir o tão sonhado <span className="text-cyan-300 font-semibold">score alto</span> e poder conseguir seu financiamento ou seu limite de crédito disponível.
            </p>
            <p className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Através de I.A conseguimos aumentar seu score com nossa tecnologia super avançada jamais vista na internet.</span>
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={onClose}
            className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold rounded-lg transition-all duration-300 hover:shadow-2xl hover:glow-cyan active:scale-95 glow-cyan"
          >
            Começar Agora
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-cyan-300/60 hover:text-cyan-300 text-sm transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
