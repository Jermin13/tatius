import { useEffect, useState } from 'react';

const BALLOON_COLORS = [
  '#E8B4B8',
  '#B5C9A8', 
  '#D4A574',
  '#F5F0E1',
  '#2C3E50',
  '#FF6B6B',
  '#4ECDC4',
  '#FFE66D'
];

function FloatingDecorations({ isActive }) {
  const [decorations, setDecorations] = useState([]);

  useEffect(() => {
    if (!isActive) return;

    const newDecorations = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 15,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      size: 20 + Math.random() * 30,
      type: Math.random() > 0.5 ? 'balloon' : 'confetti',
      rotation: Math.random() * 360,
      wobble: Math.random() * 50
    }));

    setDecorations(newDecorations);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {decorations.map((dec) => (
        <div
          key={dec.id}
          className="absolute animate-float"
          style={{
            left: `${dec.left}%`,
            bottom: '-50px',
            animationDelay: `${dec.delay}s`,
            animationDuration: `${dec.duration}s`,
            animationIterationCount: 'infinite'
          }}
        >
          {dec.type === 'balloon' ? (
            <svg
              width={dec.size}
              height={dec.size * 1.2}
              viewBox="0 0 40 48"
              className="animate-wobble"
              style={{
                animationDuration: `${dec.duration}s`,
                animationIterationCount: 'infinite'
              }}
            >
              <ellipse
                cx="20"
                cy="20"
                rx="18"
                ry="18"
                fill={dec.color}
                opacity="0.9"
              />
              <path
                d="M20 36 L20 48"
                stroke={dec.color}
                strokeWidth="2"
                opacity="0.7"
              />
              <ellipse
                cx="14"
                cy="16"
                rx="4"
                ry="6"
                fill="white"
                opacity="0.3"
                transform={`rotate(-30 14 16)`}
              />
            </svg>
          ) : (
            <div
              className="animate-confetti"
              style={{
                width: dec.size / 2,
                height: dec.size / 3,
                backgroundColor: dec.color,
                transform: `rotate(${dec.rotation}deg)`,
                animationDuration: `${dec.duration}s`,
                animationIterationCount: 'infinite'
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default FloatingDecorations;