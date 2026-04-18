import { useState, useEffect } from 'react';

const GREETINGS = [
  { id: 1, title: "¡Feliz Cumpleaños!", message: "Tatiana, que este nuevo capítulo de tu vida esté lleno de alegría, éxitos y mucha felicidad. ¡25 años de gloria!", author: "Con amor" },
  { id: 2, title: "Recuerdos Lindos", message: "Celebramos tus momentos brillantes y esperamos muchos más juntos. ¡Eres única!", author: "Tu gente" },
  { id: 3, title: "Sueños Por Cumplir", message: "Que este año te depare cosas increíbles. Cada sueño está más cerca de ti.", author: "Con ilusión" },
  { id: 4, title: "Nueva Aventura", message: "25 años son solo el comienzo. Que cada día te traiga nuevas aventuras y aprendizajes.", author: "Con emoción" },
  { id: 5, title: "Brilla y Vibra", message: "Que tu luz brille más que nunca. ¡Hoy es tu día, disfruta cada momento!", author: "Con alegría" },
  { id: 6, title: "Felicidades Totales", message: "Te desean todos los que te quieren. ¡Que tengas un día tan especial como tú!", author: "Con cariño" }
];

function GreetingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => { goToNext(); }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % GREETINGS.length);
      setIsAnimating(false);
    }, 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + GREETINGS.length) % GREETINGS.length);
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 500);
  };

  const current = GREETINGS[currentIndex];

  return (
    <div className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-[#D4A574]/20">
          <div 
            className={`transition-all duration-500 ease-in-out transform ${
              isAnimating 
                ? 'opacity-0 scale-95 translate-x-full' 
                : 'opacity-100 scale-100 translate-x-0'
            }`}
          >
            <div className="p-8 md:p-12 text-center">
              <span className="inline-block px-3 py-1 bg-[#D4A574]/30 rounded-full text-[#D4A574] text-sm font-medium mb-4">
                {currentIndex + 1} / {GREETINGS.length}
              </span>
              
              <h3 className="font-vintage text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
                {current.title}
              </h3>
              
              <p className="text-lg text-[#1e3a5f]/80 mb-6 leading-relaxed">
                {current.message}
              </p>
              
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-8 bg-[#D4A574]/50"></div>
                <span className="text-[#1e3a5f] font-medium">
                  {current.author}
                </span>
                <div className="h-px w-8 bg-[#D4A574]/50"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          {GREETINGS.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-[#1e3a5f]' 
                  : 'bg-[#1e3a5f]/30 hover:bg-[#1e3a5f]/50'
              }`}
              aria-label={`Ir a mensaje ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={goToPrev}
            className="w-10 h-10 rounded-full border-2 border-[#1e3a5f]/30 text-[#1e3a5f] hover:bg-[#1e3a5f]/10 transition-colors flex items-center justify-center"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="w-10 h-10 rounded-full border-2 border-[#1e3a5f]/30 text-[#1e3a5f] hover:bg-[#1e3a5f]/10 transition-colors flex items-center justify-center"
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default GreetingCarousel;