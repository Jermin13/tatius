function Hero({ name, age, isUnlocked }) {
  return (
    <div className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5F0E1] via-[#FAF5E8] to-[#F5F0E1]" />
      
      <div className="relative z-10">
        <h1 className="font-vintage text-3xl md:text-5xl font-bold text-[#1e3a5f] mb-2">
          Hola Amor, estamos construyendo algo para ti,
        </h1>
        
        <h2 className="font-vintage text-2xl md:text-3xl text-[#D4A574] mb-2">
          proximamente.
        </h2>
        
        {isUnlocked && (
          <p className="text-xl md:text-2xl text-[#1e3a5f] font-vintage mt-4">
            {age} Años
          </p>
        )}
      </div>
    </div>
  );
}

export default Hero;