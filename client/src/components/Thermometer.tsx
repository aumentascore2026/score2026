import { useEffect, useState } from 'react';

interface ThermometerProps {
  score: number;
  isAnimating: boolean;
}

/**
 * Speedometer Component (Car Dashboard Style)
 * Design: Car speedometer gauge with animated needle
 * Displays score from 0 to 1000 with colors from logo (red to green)
 */
export default function Thermometer({ score, isAnimating }: ThermometerProps) {
  const [displayScore, setDisplayScore] = useState(0);
  
  // Calculate needle rotation: -135 to 135 degrees (270 degree range for 0-1000)
  const percentage = (displayScore / 1000) * 100;
  const rotation = -135 + (percentage / 100) * 270;

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

  // Get color based on score (red to green gradient)
  const getGaugeColor = () => {
    if (displayScore < 200) return '#ef4444'; // red
    if (displayScore < 400) return '#f97316'; // orange
    if (displayScore < 600) return '#eab308'; // yellow
    if (displayScore < 800) return '#84cc16'; // lime
    return '#22c55e'; // green
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Speedometer Container */}
      <div className="relative w-80 h-96 flex items-center justify-center">
        {/* SVG Gauge */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 300 350"
          style={{ filter: 'drop-shadow(0 10px 30px rgba(59, 130, 246, 0.2))' }}
        >
          {/* Outer circle */}
          <circle cx="150" cy="150" r="140" fill="rgba(30, 41, 59, 0.8)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" />
          
          {/* Gradient arc background */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="25%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="75%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          {/* Colored arc segments */}
          {[
            { start: -135, end: -45, color: '#ef4444' },
            { start: -45, end: 45, color: '#f97316' },
            { start: 45, end: 135, color: '#eab308' },
          ].map((segment, idx) => {
            const startRad = (segment.start * Math.PI) / 180;
            const endRad = (segment.end * Math.PI) / 180;
            const x1 = 150 + 120 * Math.cos(startRad);
            const y1 = 150 + 120 * Math.sin(startRad);
            const x2 = 150 + 120 * Math.cos(endRad);
            const y2 = 150 + 120 * Math.sin(endRad);
            const largeArc = Math.abs(segment.end - segment.start) > 180 ? 1 : 0;

            return (
              <path
                key={idx}
                d={`M ${x1} ${y1} A 120 120 0 ${largeArc} 1 ${x2} ${y2}`}
                fill="none"
                stroke={segment.color}
                strokeWidth="20"
                strokeLinecap="round"
              />
            );
          })}

          {/* Green arc (high scores) */}
          <path
            d="M 270 150 A 120 120 0 0 1 150 270"
            fill="none"
            stroke="#22c55e"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Tick marks and numbers */}
          {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((value) => {
            const angle = -135 + (value / 1000) * 270;
            const rad = (angle * Math.PI) / 180;
            const x1 = 150 + 115 * Math.cos(rad);
            const y1 = 150 + 115 * Math.sin(rad);
            const x2 = 150 + 130 * Math.cos(rad);
            const y2 = 150 + 130 * Math.sin(rad);
            const labelX = 150 + 95 * Math.cos(rad);
            const labelY = 150 + 95 * Math.sin(rad);

            return (
              <g key={value}>
                {/* Tick */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(148, 163, 184, 0.6)"
                  strokeWidth="2"
                />
                {/* Label */}
                {value % 200 === 0 && (
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-mono fill-blue-300/70"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {value}
                  </text>
                )}
              </g>
            );
          })}

          {/* Center circle */}
          <circle cx="150" cy="150" r="20" fill="#1e293b" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />
          <circle cx="150" cy="150" r="12" fill={getGaugeColor()} />

          {/* Needle */}
          <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '150px 150px', transition: isAnimating ? 'none' : 'transform 0.3s ease-out' }}>
            <line
              x1="150"
              y1="150"
              x2="150"
              y2="40"
              stroke={getGaugeColor()}
              strokeWidth="6"
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 8px ${getGaugeColor()})` }}
            />
          </g>
        </svg>

        {/* Score Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="text-5xl md:text-6xl font-bold font-mono text-white glow-text-cyan drop-shadow-lg">
            {displayScore}
          </div>
          <div className="text-xs text-blue-300/90 mt-1 font-mono">SCORE</div>
        </div>
      </div>

      {/* Info Below */}
      <div className="text-center mt-8">
        <p className="text-sm text-blue-300/80 font-mono">
          {displayScore < 300 && '🔴 Score baixo - Oportunidade de melhora'}
          {displayScore >= 300 && displayScore < 600 && '🟡 Score moderado - Bom progresso'}
          {displayScore >= 600 && displayScore < 800 && '🟢 Score bom - Excelente trabalho'}
          {displayScore >= 800 && '✅ Score excelente - Parabéns!'}
        </p>
      </div>
    </div>
  );
}
