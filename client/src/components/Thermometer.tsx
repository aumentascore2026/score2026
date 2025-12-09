import { useEffect, useState } from 'react';

interface ThermometerProps {
  score: number;
  isAnimating: boolean;
}

/**
 * Thermometer Component
 * Design: Futuristic glassmorphism with neon cyan glow
 * Displays score from 0 to 1000 with smooth animation
 */
export default function Thermometer({ score, isAnimating }: ThermometerProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const percentage = (displayScore / 1000) * 100;

  useEffect(() => {
    if (!isAnimating) {
      setDisplayScore(score);
      return;
    }

    let animationFrame: NodeJS.Timeout;
    const startScore = displayScore;
    const endScore = score;
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      const currentScore = Math.floor(startScore + (endScore - startScore) * easeOutQuad);
      
      setDisplayScore(currentScore);

      if (progress < 1) {
        animationFrame = setTimeout(animate, 16);
      }
    };

    animationFrame = setTimeout(animate, 16);

    return () => clearTimeout(animationFrame);
  }, [score, isAnimating, displayScore]);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Thermometer Container */}
      <div className="relative w-32 h-96 md:w-40 md:h-[480px] mb-8">
        {/* Outer Glow */}
        <div className="absolute inset-0 rounded-full blur-3xl bg-gradient-to-b from-blue-500/20 to-purple-500/10 animate-pulse-glow" />

        {/* Main Thermometer */}
        <div className="relative w-full h-full glass rounded-3xl overflow-hidden border-2 border-blue-400/40 shadow-xl">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-blue-400 to-transparent" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-blue-400 to-transparent" />
          </div>

          {/* Score Labels */}
          <div className="absolute left-4 top-4 text-xs font-mono text-blue-400/70 space-y-2">
            <div className="text-right pr-2">1000</div>
          </div>
          <div className="absolute left-4 bottom-20 text-xs font-mono text-blue-400/70">
            <div className="text-right pr-2">500</div>
          </div>
          <div className="absolute left-4 bottom-4 text-xs font-mono text-blue-400/70">
            <div className="text-right pr-2">0</div>
          </div>

          {/* Fill Animation */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 via-purple-500 to-transparent opacity-60 transition-all duration-300 ease-out"
            style={{ height: `${percentage}%` }}
          />

          {/* Liquid Effect */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-400/30 to-transparent opacity-40"
            style={{ height: `${percentage}%` }}
          />

          {/* Center Indicator */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 glow-cyan shadow-lg" />

          {/* Score Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl md:text-5xl font-bold font-mono text-white glow-text-cyan drop-shadow-lg">
              {displayScore}
            </div>
            <div className="text-xs text-blue-300/90 mt-2 font-mono">SCORE</div>
          </div>
        </div>
      </div>

      {/* Score Info */}
      <div className="text-center mt-6">
        <p className="text-sm text-blue-300/80 font-mono">
          {displayScore < 300 && "Score baixo - Oportunidade de melhora"}
          {displayScore >= 300 && displayScore < 600 && "Score moderado - Bom progresso"}
          {displayScore >= 600 && displayScore < 800 && "Score bom - Excelente trabalho"}
          {displayScore >= 800 && "Score excelente - Parabéns!"}
        </p>
      </div>
    </div>
  );
}
