function LilyDecorations() {
  const lilies = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${5 + i * 8}%`,
    top: `${10 + (i % 3) * 30}%`,
    scale: 0.6 + Math.random() * 0.5,
    rotation: -30 + Math.random() * 60,
    delay: i * 0.3,
    opacity: 0.15 + Math.random() * 0.15
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {lilies.map((lily) => (
        <div
          key={lily.id}
          className="absolute animate-fade-in"
          style={{
            left: lily.left,
            top: lily.top,
            transform: `scale(${lily.scale}) rotate(${lily.rotation}deg)`,
            animationDelay: `${lily.delay}s`,
            opacity: lily.opacity
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <path
              d="M40 75 Q35 55 40 35 Q45 55 40 75"
              fill="#B5C9A8"
            />
            <path
              d="M40 75 Q25 50 20 30 Q30 45 40 50"
              fill="#E8B4B8"
            />
            <path
              d="M40 75 Q55 50 60 30 Q50 45 40 50"
              fill="#E8B4B8"
            />
            <path
              d="M40 75 Q15 45 5 25 Q20 40 40 45"
              fill="#F5F0E1"
            />
            <path
              d="M40 75 Q65 45 75 25 Q60 40 40 45"
              fill="#F5F0E1"
            />
            <ellipse cx="40" cy="35" rx="4" ry="4" fill="#D4A574" />
            <ellipse cx="40" cy="35" rx="2" ry="2" fill="#2C3E50" opacity="0.5" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default LilyDecorations;