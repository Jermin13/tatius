import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import foto1 from '../assets/fotos_collage/tatius/0429025c-a558-442e-84ea-e6f6e1a61b73.jpg'
import foto2 from '../assets/fotos_collage/tatius/050c7aaa-6d1e-4378-be7a-d35e60da56b6.jpg'
import foto3 from '../assets/fotos_collage/tatius/11024ced-aa9e-4dc8-8c6f-096b170f8d82.jpg'
import foto4 from '../assets/fotos_collage/tatius/177fb6f8-b5b4-42d2-b099-74520ce1e31b.jpg'
import foto5 from '../assets/fotos_collage/tatius/20d4b87e-6227-45cb-a781-c35f6435c964.jpg'
import foto6 from '../assets/fotos_collage/tatius/4a04fc4b-74ea-48b1-a125-f646532136aa.jpg'
import foto7 from '../assets/fotos_collage/tatius/90e32e73-5720-434b-bb17-c3881126979e.jpg'
import foto8 from '../assets/fotos_collage/tatius/9393f30a-ba1f-4e7a-8564-0f4f03fd2227.jpg'

const PHOTOS = [foto1, foto2, foto3, foto4, foto5, foto6, foto7, foto8]
const GRID_SIZE = 3

function getBoardSize() {
  if (typeof window === 'undefined') return 300
  const size = Math.min(400, window.innerWidth * 0.88, window.innerHeight * 0.60)
  return Math.max(200, size)
}

const SOLVED_STATE = [0, 1, 2, 3, 4, 5, 6, 7, null]

const CONFETTI_SEED = [
  { id: 0, left: 5, delay: 0.1, duration: 2.5, color: '#D4A574', size: 8 },
  { id: 1, left: 12, delay: 0.8, duration: 3.1, color: '#FFF8DC', size: 6 },
  { id: 2, left: 18, delay: 1.2, duration: 2.8, color: '#FFD700', size: 10 },
  { id: 3, left: 25, delay: 0.3, duration: 3.5, color: '#D4A574', size: 7 },
  { id: 4, left: 32, delay: 1.5, duration: 2.2, color: '#FFF8DC', size: 9 },
  { id: 5, left: 40, delay: 0.6, duration: 3.8, color: '#FFD700', size: 6 },
  { id: 6, left: 48, delay: 0.9, duration: 2.4, color: '#D4A574', size: 8 },
  { id: 7, left: 55, delay: 1.1, duration: 3.2, color: '#FFF8DC', size: 7 },
  { id: 8, left: 62, delay: 0.4, duration: 2.9, color: '#FFD700', size: 10 },
  { id: 9, left: 70, delay: 1.7, duration: 3.0, color: '#D4A574', size: 6 },
  { id: 10, left: 78, delay: 0.2, duration: 2.6, color: '#FFF8DC', size: 9 },
  { id: 11, left: 85, delay: 1.3, duration: 3.4, color: '#FFD700', size: 7 },
  { id: 12, left: 92, delay: 0.7, duration: 2.3, color: '#D4A574', size: 8 },
  { id: 13, left: 8, delay: 1.0, duration: 3.6, color: '#FFF8DC', size: 6 },
  { id: 14, left: 22, delay: 0.5, duration: 2.7, color: '#FFD700', size: 10 },
  { id: 15, left: 35, delay: 1.4, duration: 3.3, color: '#D4A574', size: 7 },
  { id: 16, left: 45, delay: 0.8, duration: 2.1, color: '#FFF8DC', size: 9 },
  { id: 17, left: 58, delay: 1.6, duration: 3.9, color: '#FFD700', size: 6 },
  { id: 18, left: 68, delay: 0.3, duration: 2.5, color: '#D4A574', size: 8 },
  { id: 19, left: 75, delay: 1.1, duration: 3.1, color: '#FFF8DC', size: 7 },
  { id: 20, left: 82, delay: 0.6, duration: 2.8, color: '#FFD700', size: 10 },
  { id: 21, left: 15, delay: 1.8, duration: 3.0, color: '#D4A574', size: 6 },
  { id: 22, left: 28, delay: 0.4, duration: 2.4, color: '#FFF8DC', size: 9 },
  { id: 23, left: 38, delay: 1.2, duration: 3.5, color: '#FFD700', size: 7 },
  { id: 24, left: 52, delay: 0.9, duration: 2.2, color: '#D4A574', size: 8 },
  { id: 25, left: 60, delay: 1.5, duration: 3.7, color: '#FFF8DC', size: 6 },
  { id: 26, left: 72, delay: 0.1, duration: 2.9, color: '#FFD700', size: 10 },
  { id: 27, left: 88, delay: 1.0, duration: 3.2, color: '#D4A574', size: 7 },
  { id: 28, left: 2, delay: 0.7, duration: 2.6, color: '#FFF8DC', size: 9 },
  { id: 29, left: 95, delay: 1.3, duration: 3.4, color: '#FFD700', size: 6 },
  { id: 30, left: 30, delay: 0.5, duration: 2.3, color: '#D4A574', size: 8 },
  { id: 31, left: 42, delay: 1.7, duration: 3.8, color: '#FFF8DC', size: 7 },
  { id: 32, left: 65, delay: 0.2, duration: 2.1, color: '#FFD700', size: 10 },
  { id: 33, left: 20, delay: 1.4, duration: 3.0, color: '#D4A574', size: 6 },
  { id: 34, left: 50, delay: 0.8, duration: 2.7, color: '#FFF8DC', size: 9 },
  { id: 35, left: 80, delay: 1.1, duration: 3.3, color: '#FFD700', size: 7 },
  { id: 36, left: 10, delay: 0.6, duration: 2.5, color: '#D4A574', size: 8 },
  { id: 37, left: 33, delay: 1.6, duration: 3.9, color: '#FFF8DC', size: 6 },
  { id: 38, left: 56, delay: 0.3, duration: 2.2, color: '#FFD700', size: 10 },
  { id: 39, left: 76, delay: 0.9, duration: 3.1, color: '#D4A574', size: 7 },
  { id: 40, left: 90, delay: 1.2, duration: 2.8, color: '#FFF8DC', size: 9 },
  { id: 41, left: 4, delay: 0.5, duration: 3.4, color: '#FFD700', size: 6 },
  { id: 42, left: 25, delay: 1.8, duration: 2.3, color: '#D4A574', size: 8 },
  { id: 43, left: 48, delay: 0.1, duration: 3.6, color: '#FFF8DC', size: 7 },
  { id: 44, left: 70, delay: 1.0, duration: 2.9, color: '#FFD700', size: 10 },
  { id: 45, left: 90, delay: 0.7, duration: 3.2, color: '#D4A574', size: 6 },
  { id: 46, left: 16, delay: 1.5, duration: 2.4, color: '#FFF8DC', size: 9 },
  { id: 47, left: 36, delay: 0.4, duration: 3.5, color: '#FFD700', size: 7 },
  { id: 48, left: 58, delay: 1.3, duration: 2.6, color: '#D4A574', size: 8 },
  { id: 49, left: 84, delay: 0.8, duration: 3.0, color: '#FFF8DC', size: 6 }
]

const FIREFLY_SEED = [
  { id: 0, left: 10, top: 15, delay: 0 },
  { id: 1, left: 25, top: 30, delay: 0.5 },
  { id: 2, left: 40, top: 20, delay: 1.0 },
  { id: 3, left: 55, top: 45, delay: 1.5 },
  { id: 4, left: 70, top: 25, delay: 2.0 },
  { id: 5, left: 85, top: 50, delay: 2.5 },
  { id: 6, left: 15, top: 60, delay: 3.0 },
  { id: 7, left: 60, top: 70, delay: 3.5 }
]

function getSolvedPuzzle() {
  return [...SOLVED_STATE]
}

function getEmptyIndex(pieces) {
  return pieces.indexOf(null)
}

function getAdjacents(emptyIdx) {
  const row = Math.floor(emptyIdx / GRID_SIZE)
  const col = emptyIdx % GRID_SIZE
  const adj = []
  if (row > 0) adj.push(emptyIdx - GRID_SIZE)
  if (row < GRID_SIZE - 1) adj.push(emptyIdx + GRID_SIZE)
  if (col > 0) adj.push(emptyIdx - 1)
  if (col < GRID_SIZE - 1) adj.push(emptyIdx + 1)
  return adj
}

function shufflePieces(moves = 100) {
  let current = getSolvedPuzzle()
  for (let i = 0; i < moves; i++) {
    const emptyIdx = getEmptyIndex(current)
    const adjacents = getAdjacents(emptyIdx)
    const randIdx = Math.floor(Math.random() * adjacents.length)
    const swapIdx = adjacents[randIdx]
    const temp = current[emptyIdx]
    current[emptyIdx] = current[swapIdx]
    current[swapIdx] = temp
  }
  return current
}

function isSolved(pieces) {
  return pieces.every((val, idx) => val === SOLVED_STATE[idx])
}

function Confetti() {
  const particles = useMemo(() => CONFETTI_SEED, [])
  return (
    <>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-20px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: '50%',
            animation: `confettiFall ${p.duration}s linear ${p.delay}s infinite`,
            boxShadow: `0 0 ${p.size}px ${p.color}`
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </>
  )
}

function FloatingDecorations() {
  const fireflies = useMemo(() => FIREFLY_SEED, [])

  return (
    <>
      {fireflies.map(f => (
        <div
          key={f.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: '#FFF8DC',
            boxShadow: '0 0 8px #FFF8DC, 0 0 16px #FFD700',
            animation: `fireflyFloat 4s ease-in-out ${f.delay}s infinite`,
            left: `${f.left}%`,
            top: `${f.top}%`
          }}
        />
      ))}
      <style>{`
        @keyframes fireflyFloat {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          25% { transform: translate(10px, -15px); opacity: 0.8; }
          50% { transform: translate(-5px, -25px); opacity: 0.5; }
          75% { transform: translate(15px, -10px); opacity: 0.9; }
        }
      `}</style>
    </>
  )
}

function GamePage() {
  const navigate = useNavigate()
  const [currentLevel, setCurrentLevel] = useState(1)
  const [unlockedLevels, setUnlockedLevels] = useState([1])
  const [pieces, setPieces] = useState([])
  const [gameState, setGameState] = useState('playing')
  const [moveCount, setMoveCount] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [collapseGap, setCollapseGap] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)
  const [boardSize, setBoardSize] = useState(300)

  const containerRef = useRef(null)

  useEffect(() => {
    const updateSize = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const newSize = Math.min(400, Math.floor(vw * 0.88), Math.floor(vh * 0.55))
      setBoardSize(Math.max(200, newSize))
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const currentPhoto = PHOTOS[currentLevel - 1]

  const saveSession = (newUnlocked, newLevel) => {
    try {
      sessionStorage.setItem('tatius_puzzle_session', JSON.stringify({
        unlockedLevels: newUnlocked,
        currentLevel: newLevel
      }))
    } catch (e) {
      // silently fail
    }
  }

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('tatius_puzzle_session')
      if (saved) {
        const data = JSON.parse(saved)
        if (data.unlockedLevels) setUnlockedLevels(data.unlockedLevels)
        if (data.currentLevel) setCurrentLevel(data.currentLevel)
      }
    } catch (e) {
      // silently fail en iframe sandboxeado
    }
  }, [])

  useEffect(() => {
    setPieces(shufflePieces(100))
    setMoveCount(0)
    setGameState('playing')
    setShowConfetti(false)
    setAnimating(false)
    setCollapseGap(false)
    setShowFullImage(false)
  }, [currentLevel])

  const handleVictory = useCallback(() => {
    setAnimating(true)
    setTimeout(() => {
      setCollapseGap(true)
    }, 400)
    setTimeout(() => {
      setShowFullImage(true)
    }, 800)
    setTimeout(() => {
      setGameState(prev => prev === 'playing' ? 'won' : prev)
      setShowConfetti(true)
    }, 1400)
  }, [])

  const canMove = useCallback((index, piecesArr) => {
    const emptyIdx = getEmptyIndex(piecesArr)
    const row = Math.floor(index / GRID_SIZE)
    const col = index % GRID_SIZE
    const emptyRow = Math.floor(emptyIdx / GRID_SIZE)
    const emptyCol = emptyIdx % GRID_SIZE

    return (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
           (Math.abs(col - emptyCol) === 1 && row === emptyRow)
  }, [])

  const movePiece = useCallback((index) => {
    if (gameState !== 'playing') return
    if (!canMove(index, pieces)) return

    const piecesCopy = [...pieces]
    const emptyIdx = getEmptyIndex(piecesCopy)

    const temp = piecesCopy[emptyIdx]
    piecesCopy[emptyIdx] = piecesCopy[index]
    piecesCopy[index] = temp

    setPieces(piecesCopy)
    setMoveCount(prev => prev + 1)

    if (isSolved(piecesCopy)) {
      let newUnlocked = unlockedLevels
      if (currentLevel === Math.max(...unlockedLevels)) {
        newUnlocked = [...new Set([...unlockedLevels, currentLevel + 1])]
        setUnlockedLevels(newUnlocked)
        saveSession(newUnlocked, currentLevel)
      }
      if (currentLevel === 8) {
        setGameState('completed')
      } else {
        handleVictory()
      }
    }
  }, [gameState, canMove, pieces, currentLevel, unlockedLevels])

  const nextLevel = useCallback(() => {
    if (currentLevel < 8) {
      const nextLvl = currentLevel + 1
      const newUnlocked = [...new Set([...unlockedLevels, nextLvl])]
      setUnlockedLevels(newUnlocked)
      setCurrentLevel(nextLvl)
      saveSession(newUnlocked, nextLvl)
      setGameState('playing')
      setPieces(shufflePieces(100))
      setMoveCount(0)
      setShowConfetti(false)
      setAnimating(false)
      setCollapseGap(false)
      setShowFullImage(false)
    }
  }, [currentLevel, unlockedLevels])

  const restartLevel = useCallback(() => {
    setPieces(shufflePieces(100))
    setGameState('playing')
    setMoveCount(0)
    setShowConfetti(false)
    setAnimating(false)
    setCollapseGap(false)
    setShowFullImage(false)
  }, [])

  const cellSize = (boardSize - 12) / GRID_SIZE
  const emptyIdx = pieces.length > 0 ? getEmptyIndex(pieces) : 4
  const emptyRow = Math.floor(emptyIdx / GRID_SIZE)
  const emptyCol = emptyIdx % GRID_SIZE

  return (
    <div className="w-screen min-h-screen bg-[#050510] flex flex-col relative overflow-hidden">
      <FloatingDecorations />
      {showConfetti && <Confetti />}

      <button
        type="button"
        onClick={() => navigate('/')}
        className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 p-2 sm:p-3 text-white/70 hover:text-white transition-colors text-base sm:text-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
      >
        ←
      </button>

      <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 py-8 sm:py-16 gap-3 sm:gap-6">
        <h1 className="font-vintage text-xl sm:text-2xl md:text-3xl font-bold text-[#D4A574] text-center px-2">
          Rompecabezas 😂
        </h1>

        <p className="text-white/60 text-center text-sm sm:text-base">
          Nivel {currentLevel} de 8
        </p>

        <div className="text-white/40 text-xs sm:text-sm">
          Movimientos: {moveCount}
        </div>

        <div
          className="grid grid-cols-3 gap-1 p-1"
          style={{
            width: boardSize,
            height: boardSize,
            backgroundColor: '#D4A574',
            borderRadius: '14px',
            boxShadow: '0 0 40px rgba(212, 165, 116, 0.4)',
            padding: collapseGap ? '0px' : '4px',
            gap: collapseGap ? '0px' : '4px',
            transition: 'gap 0.4s ease, padding 0.4s ease',
            opacity: showFullImage ? 0 : 1,
            transition: showFullImage ? 'opacity 0.3s ease' : 'gap 0.4s ease, padding 0.4s ease',
            position: 'relative'
          }}
        >
          {pieces.map((pieceIdx, cellIdx) => {
            const row = Math.floor(cellIdx / GRID_SIZE)
            const col = cellIdx % GRID_SIZE
            const canMoveThis = gameState === 'playing' && (
              (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
              (Math.abs(col - emptyCol) === 1 && row === emptyRow)
            )

            if (pieceIdx === null) {
              return (
                <div
                  key={cellIdx}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: '#0a0a1a',
                    backgroundImage: 'radial-gradient(circle, rgba(212,165,116,0.15) 1px, transparent 1px)',
                    backgroundSize: '12px 12px',
                    borderRadius: '6px'
                  }}
                />
              )
            }

            return (
              <button
                key={cellIdx}
                type="button"
                onClick={() => movePiece(cellIdx)}
                onTouchStart={(e) => {
                  e.preventDefault()
                  if (canMoveThis) movePiece(cellIdx)
                }}
                disabled={gameState !== 'playing' || !canMoveThis}
                className="relative touch-manipulation"
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundImage: `url(${currentPhoto})`,
                  backgroundSize: `${boardSize - 12}px ${boardSize - 12}px`,
                  backgroundPosition: `-${(pieceIdx % GRID_SIZE) * cellSize}px -${Math.floor(pieceIdx / GRID_SIZE) * cellSize}px`,
                  borderRadius: collapseGap ? '0px' : '6px',
                  overflow: 'hidden',
                  animation: animating ? 'pieceTremor 0.4s ease-out' : 'none',
                  cursor: canMoveThis ? 'pointer' : 'default',
                  transition: 'transform 0.12s ease, filter 0.12s ease, box-shadow 0.12s ease',
                  boxShadow: canMoveThis 
                    ? '0 0 0 1.5px rgba(212, 165, 116, 0.6), inset 0 0 10px rgba(0,0,0,0.35)' 
                    : 'inset 0 0 10px rgba(0,0,0,0.35)',
                  opacity: pieceIdx !== null ? 1 : 0.3
                }}
                onMouseEnter={(e) => {
                  if (canMoveThis) {
                    e.currentTarget.style.transform = 'scale(0.96)'
                    e.currentTarget.style.filter = 'brightness(1.15)'
                    e.currentTarget.style.boxShadow = 'inset 0 0 0 2px #D4A574, inset 0 0 10px rgba(0,0,0,0.2)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (canMoveThis) {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.filter = 'brightness(1)'
                    e.currentTarget.style.boxShadow = '0 0 0 1.5px rgba(212, 165, 116, 0.6), inset 0 0 10px rgba(0,0,0,0.35)'
                  }
                }}
              />
            )
          })}
        </div>

        {showFullImage && (
          <img
            src={currentPhoto}
            alt="Completo"
            style={{
              position: 'absolute',
              width: boardSize,
              height: boardSize,
              borderRadius: '14px',
              border: '2px solid #D4A574',
              boxShadow: '0 0 40px rgba(212, 165, 116, 0.6)',
              objectFit: 'cover',
              opacity: showFullImage ? 1 : 0,
              transition: 'opacity 0.5s ease',
              pointerEvents: 'none'
            }}
          />
        )}

        {gameState === 'playing' && (
          <div className="mt-4 text-center" style={{ marginTop: '16px' }}>
            <p style={{ color: '#D4A574', fontSize: '12px', marginBottom: '8px' }}>Referencia</p>
            <img
              src={currentPhoto}
              alt="Referencia"
              style={{
                width: Math.floor(boardSize * 0.32),
                height: Math.floor(boardSize * 0.32),
                borderRadius: '8px',
                border: '2px solid rgba(212, 165, 116, 0.6)',
                boxShadow: '0 0 16px rgba(212, 165, 116, 0.3)',
                opacity: 0.9,
                objectFit: 'cover'
              }}
            />
          </div>
        )}

        {gameState === 'won' && (
          <div className="text-center animate-fadeIn px-2">
            <p className="text-base sm:text-xl text-[#FFD700] font-vintage mb-3 sm:mb-4">
              ¡Armaste el recuerdo #{currentLevel}, Tatius! 🎉
            </p>
            {currentLevel < 8 ? (
              <button
                type="button"
                onClick={nextLevel}
                className="w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-3 bg-[#D4A574] text-[#050510] rounded-lg font-semibold hover:bg-[#FFD700] transition-colors min-h-[44px]"
              >
                Siguiente nivel →
              </button>
            ) : (
              <p className="text-[#FFF8DC] text-lg">
                🏆 ¡Completaste todos los recuerdos! 🏆
                <br />
                <span className="text-[#D4A574] text-2xl mt-2 block">M</span>
              </p>
            )}
          </div>
        )}

        {gameState === 'playing' && (
          <button
            type="button"
            onClick={restartLevel}
            className="text-white/50 hover:text-white/70 transition-colors text-xs sm:text-sm px-3 py-2 min-h-[44px]"
          >
            Reiniciar nivel
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes pieceTremor {
          0%   { transform: translate(0, 0) rotate(0deg); }
          20%  { transform: translate(-2px, 1px) rotate(-0.5deg); }
          40%  { transform: translate(2px, -1px) rotate(0.5deg); }
          60%  { transform: translate(-1px, 2px) rotate(-0.3deg); }
          80%  { transform: translate(1px, -2px) rotate(0.3deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
      `}</style>
    </div>
  )
}

export default GamePage