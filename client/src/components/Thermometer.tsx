import { useEffect, useState } from 'react';

interface ThermometerProps {
  score: number;
  isAnimating: boolean;
}

/**
 * Circular Thermometer Component
 * Design: Futuristic circular gauge with smooth animation
 * Displays score from 0 to 1000 with animated arc
 */
export default function Thermometer({ score, isAnimating }: ThermometerProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const percentage = (displayScore / 1000) * 100;
  const circumference = 2 * Math.PI * 90; // radius = 90
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

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

  // Determine color based on score
  const getScoreColor = () => {
    if (displayScore < 300) return '#ef4444'; // red
    if (displayScore < 600) return '#f59e0b'; // amber
    if (displayScore < 800) return '#3b82f6'; // blue
    return '#10b981'; // green
  };

  const getScoreLabel = () => {
    if (displayScore < 300) return 'Score baixo';
    if (displayScore < 600) return 'Score moderado';
    if (displayScore < 800) return 'Score bom';
    return 'Score excelente';
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Circular Thermometer */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Background Circle */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 200 200"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background arc */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(59, 130, 246, 0.1)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          
          {/* Progress arc */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={getScoreColor()}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: isAnimating ? 'none' : 'stroke-dashoffset 0.3s ease-out',
              filter: `drop-shadow(0 0 10px ${getScoreColor()})`,
            }}
          />

          {/* Markers */}
          {[0, 250, 500, 750, 1000].map((value, index) => {
            const angle = (index / 5) * 360 - 90;
            const x = 100 + 75 * Math.cos((angle * Math.PI) / 180);
            const y = 100 + 75 * Math.sin((angle * Math.PI) / 180);
            return (
              <text
                key={value}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-mono fill-blue-300/60"
                fontSize="10"
              >
                {value}
              </text>
            );
          })}
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="text-5xl md:text-6xl font-bold font-mono text-white glow-text-cyan drop-shadow-lg">
            {displayScore}
          </div>
          <div className="text-sm text-blue-300/90 mt-2 font-mono">SCORE</div>
          <div className="text-xs text-blue-300/70 mt-4 text-center font-semibold">
            {getScoreLabel()}
          </div>
        </div>
      </div>

      {/* Info Below */}
      <div className="text-center mt-8">
        <p className="text-sm text-blue-300/80 font-mono">
          {displayScore < 300 && '📊 Oportunidade de melhora'}
          {displayScore >= 300 && displayScore < 600 && '📈 Bom progresso'}
          {displayScore >= 600 && displayScore < 800 && '⭐ Excelente trabalho'}
          {displayScore >= 800 && '🎉 Parabéns!'}
        </p>
      </div>
    </div>
  );
}
