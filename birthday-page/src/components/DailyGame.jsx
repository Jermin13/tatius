import { useNavigate } from 'react-router-dom'

function DailyGameButton() {
  const navigate = useNavigate()
  
  return (
    <div className="py-8 text-center relative z-10">
      <button
        onClick={() => navigate('/juego')}
        className="group px-10 py-4 bg-gradient-to-r from-[#FFD700] to-[#D4A574] text-white font-vintage text-xl rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
      >
        <span className="inline-flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          Rompecabezas
        </span>
      </button>
      <p className="text-white/50 text-sm mt-3">
        Día 1 de 4
      </p>
    </div>
  )
}

export default DailyGameButton