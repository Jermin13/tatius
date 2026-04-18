import { useBirthdayTimer } from '../hooks/useBirthdayTimer';

function CountdownTimer({ targetDate, showBlockingMessage = true }) {
  const { timeLeft, isUnlocked, isClient } = useBirthdayTimer(targetDate);

  if (!isClient) {
    return (
      <div className="py-12 flex justify-center">
        <div className="animate-pulse bg-[#D4A574]/20 rounded-lg p-8 w-64">
          <div className="h-4 bg-[#D4A574]/30 rounded w-3/4 mx-auto mb-4"></div>
          <div className="flex gap-4 justify-center">
            <div className="h-12 w-16 bg-[#D4A574]/20 rounded"></div>
            <div className="h-12 w-16 bg-[#D4A574]/20 rounded"></div>
            <div className="h-12 w-16 bg-[#D4A574]/20 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: 'Días' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Min' },
    { value: timeLeft.seconds, label: 'Seg' }
  ];

  return (
    <div className="py-12">
      <h2 className="font-vintage text-2xl text-[#D4A574] text-center mb-8">
        {isUnlocked ? '¡Es el gran día!' : 'Cuenta Regresiva'}
      </h2>
      
      {!isUnlocked && showBlockingMessage && (
        <p className="text-center text-white/80 mb-6 max-w-md mx-auto text-base leading-relaxed">
          Los saludos y mensajes están bloquados hasta la fecha del cumpleaños.<br/>
          ¡Vuelve pronto para ver las sorpresas!
        </p>
      )}
      
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {timeUnits.map((unit, index) => (
          <div 
            key={index}
            className={`relative border-2 rounded-lg p-4 md:p-6 min-w-[80px] md:min-w-[100px] text-center transition-all duration-500 ${
              isUnlocked 
                ? 'border-emerald-400/50 bg-emerald-900/30' 
                : 'border-[#D4A574]/30 bg-[#F5F0E1]/50'
            }`}
          >
            <div className="font-vintage text-3xl md:text-4xl font-bold text-[#D4A574]">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-sm text-[#D4A574]/70 uppercase tracking-wider mt-2">
              {unit.label}
            </div>
            
            {isUnlocked && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountdownTimer;