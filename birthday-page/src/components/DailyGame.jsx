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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Juego del día 🐝
        </span>
      </button>
      <p className="text-white/50 text-sm mt-3">
        Día 1 de 4
      </p>
    </div>
  )
}

export default DailyGameButton