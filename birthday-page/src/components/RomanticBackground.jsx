import { useEffect, useState, useMemo } from 'react';

function YellowFlower({ position, delay, scale = 0.28 }) {
  return (
    <div 
      className="absolute transform-origin-bottom"
      style={{
        left: position.x,
        bottom: position.y,
        animationDelay: `${delay}s`,
        animation: `flower-sway 4s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      <div style={{ transform: `scale(${scale})` }}>
        <div className="flower-leafs">
          <div className="petal petal-1"></div>
          <div className="petal petal-2"></div>
          <div className="petal petal-3"></div>
          <div className="petal petal-4"></div>
          <div className="center-white"></div>
        </div>
        <div className="stem">
          <div className="stem-leaf leaf-1"></div>
          <div className="stem-leaf leaf-2"></div>
          <div className="stem-leaf leaf-3"></div>
          <div className="stem-leaf leaf-4"></div>
          <div className="stem-leaf leaf-5"></div>
          <div className="stem-leaf leaf-6"></div>
        </div>
      </div>
    </div>
  );
}

function GrassCluster({ position, delay, mirror }) {
  return (
    <div 
      className="absolute"
      style={{
        left: position.x,
        bottom: position.y,
        transform: mirror ? 'scaleX(-1)' : 'scaleX(1)',
        animation: `grass-sway 3s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      <div className="grass-cluster">
        <div className="grass-blade g-1"></div>
        <div className="grass-blade g-2"></div>
        <div className="grass-blade g-3"></div>
        <div className="grass-blade g-4"></div>
        <div className="grass-blade g-5"></div>
        <div className="grass-blade g-6"></div>
        <div className="grass-blade g-7"></div>
        <div className="grass-blade g-8"></div>
      </div>
    </div>
  );
}

function Fireflies() {
  const fireflies = useMemo(() => 
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 70 + 10,
      size: 2 + Math.random() * 3,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 10,
      opacity: 0.6 + Math.random() * 0.4
    }))
  , []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {fireflies.map((fly) => (
        <div
          key={fly.id}
          className="absolute rounded-full"
          style={{
            left: `${fly.x}%`,
            top: `${fly.y}%`,
            width: fly.size,
            height: fly.size,
            backgroundColor: '#ffffaa',
            boxShadow: `0 0 ${fly.size * 2}px ${fly.size}px rgba(255, 255, 100, 0.8)`,
            animation: `firefly-float ${fly.duration}s ease-in-out infinite`,
            animationDelay: `${fly.delay}s`,
            opacity: fly.opacity
          }}
        />
      ))}
    </div>
  );
}

function RomanticBackground() {
  const flowerPositions = [
    { x: '8%', y: '2vmin' },
    { x: '22%', y: '4vmin' },
    { x: '38%', y: '1vmin' },
    { x: '52%', y: '5vmin' },
    { x: '68%', y: '3vmin' },
    { x: '82%', y: '2vmin' },
  ];

  const grassPositions = [
    { x: '10%', y: '0vmin', mirror: false },
    { x: '30%', y: '1vmin', mirror: true },
    { x: '50%', y: '0vmin', mirror: false },
    { x: '70%', y: '2vmin', mirror: true },
    { x: '90%', y: '1vmin', mirror: false },
  ];

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#0a1520] to-[#030308]" />
      
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="absolute inset-0">
        {flowerPositions.map((pos, i) => (
          <YellowFlower 
            key={i} 
            position={pos} 
            delay={i * 0.5}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {grassPositions.map((pos, i) => (
          <GrassCluster 
            key={i} 
            position={pos} 
            delay={1.5 + i * 0.3}
            mirror={pos.mirror}
          />
        ))}
      </div>

      <Fireflies />

      <style>{`
        .transform-origin-bottom {
          transform-origin: bottom center;
        }
        
        .flower-leafs {
          position: relative;
          animation: bloom 1.5s backwards;
        }
        
        .petal {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 8vmin;
          height: 11vmin;
          border-radius: 51% 49% 47% 53%/44% 45% 55% 69%;
          background: linear-gradient(135deg, #ffd700 0%, #ffb700 50%, #ff8c00 100%);
          transform-origin: bottom center;
          opacity: 0.92;
          box-shadow: inset 0 0 2vmin rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 215, 0, 0.4);
        }
        
        .petal-1 { transform: translate(-10%, 1%) rotateY(40deg) rotateX(-50deg); }
        .petal-2 { transform: translate(-50%, -4%) rotateX(40deg); }
        .petal-3 { transform: translate(-90%, 0%) rotateY(45deg) rotateX(50deg); }
        .petal-4 {
          width: 8vmin;
          height: 8vmin;
          transform-origin: bottom left;
          border-radius: 4vmin 10vmin 4vmin 4vmin;
          transform: translate(0%, 18%) rotateX(70deg) rotate(-43deg);
          background: linear-gradient(135deg, #b8860b 0%, #8b6914 100%);
          opacity: 0.85;
        }
        
        .center-white {
          position: absolute;
          left: -3.5vmin;
          top: -3vmin;
          width: 9vmin;
          height: 4vmin;
          border-radius: 50%;
          background: linear-gradient(135deg, #fffef0 0%, #fff8dc 100%);
          box-shadow: inset 0 0 3px rgba(255, 215, 0, 0.3);
        }
        
        .stem {
          height: 45vmin;
          width: 1vmin;
          background: linear-gradient(to right, rgba(0,0,0,0.2), transparent, rgba(255,255,255,0.3)), linear-gradient(to top, transparent 10%, #14757a, #2dd4bf);
          box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
          animation: grow-stem 3s backwards;
        }
        
        .stem-leaf {
          position: absolute;
          top: 20%;
          left: 90%;
          width: 7vmin;
          height: 9vmin;
          border-top-right-radius: 100%;
          border-bottom-left-radius: 100%;
          background: linear-gradient(to top, rgba(34, 197, 94, 0.6), #22c55e);
        }
        
        .leaf-1 { transform: rotate(70deg) rotateY(30deg); animation: bloom-leaf 0.6s 1.4s backwards; }
        .leaf-2 { top: 45%; transform: rotate(70deg) rotateY(30deg); animation: bloom-leaf 0.6s 1.2s backwards; }
        .leaf-3 { top: 12%; left: -460%; border-radius: 0; border-top-left-radius: 100%; transform: rotate(-70deg) rotateY(30deg); animation: bloom-leaf-left 0.6s 1s backwards; }
        .leaf-4 { top: 40%; transform: rotate(-70deg) rotateY(30deg); }
        .leaf-5 { top: 0%; transform: scale(0.6); }
        .leaf-6 { top: -2%; left: -450%; transform: scale(0.6); }
        
        .grass-cluster {
          display: flex;
          align-items: flex-end;
          transform-origin: bottom center;
        }
        
        .grass-blade {
          position: absolute;
          bottom: 0;
          width: 1.2vmin;
          height: 15vmin;
          background: linear-gradient(to top, transparent, #0d9488);
          transform-origin: bottom center;
          border-radius: 50% 50% 0 0;
        }
        
        .g-1 { transform: rotate(-15deg) scale(0.5); left: 0; }
        .g-2 { transform: rotate(-5deg) scale(0.6); left: 1vmin; }
        .g-3 { transform: rotate(5deg) scale(0.55); left: -1vmin; }
        .g-4 { transform: rotate(15deg) scale(0.45); left: 0.5vmin; }
        .g-5 { transform: rotate(-10deg) scale(0.4); left: 1.5vmin; }
        .g-6 { transform: rotate(8deg) scale(0.35); left: -0.5vmin; }
        .g-7 { transform: rotate(-5deg) scale(0.3); left: 2vmin; }
        .g-8 { transform: rotate(12deg) scale(0.25); left: -1.5vmin; }
        
        @keyframes flower-sway {
          0%, 100% { transform: rotate(-2deg) translateY(0); }
          50% { transform: rotate(2deg) translateY(-5px); }
        }
        
        @keyframes grass-sway {
          0%, 100% { transform: scaleX(var(--mirror, 1)) rotate(-1deg); }
          50% { transform: scaleX(var(--mirror, 1)) rotate(1deg); }
        }
        
        @keyframes bloom {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes grow-stem {
          0% { height: 0; }
        }
        
        @keyframes bloom-leaf {
          0% { transform-origin: left; transform: rotate(70deg) rotateY(30deg) scale(0); opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes bloom-leaf-left {
          0% { transform-origin: right; transform: rotate(-70deg) rotateY(30deg) scale(0); opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes firefly-float {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
            opacity: 0.3; 
          }
          25% { 
            transform: translate(10px, -15px) scale(1.2); 
            opacity: 0.8; 
          }
          50% { 
            transform: translate(-5px, -30px) scale(0.9); 
            opacity: 0.6; 
          }
          75% { 
            transform: translate(15px, -20px) scale(1.1); 
            opacity: 0.9; 
          }
        }
      `}</style>
    </div>
  );
}

export default RomanticBackground;