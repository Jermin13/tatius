// src/pages/GamePage.jsx
import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import beeImgUrl from '../assets/abeja.png'
import cobijaImgUrl from '../assets/cobija.png'

const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 500
const BEE_SIZE = 10
const OBSTACLE_WIDTH = 10
const OBSTACLE_GAP = 140
const CLOTH_HEIGHT = 140
const GRAVITY = 0.5
const FLAP_STRENGTH = -8
const BEE_START_X = 30
const MAX_OBSTACLES = 4
const OBSTACLE_SPACING_FRAMES = 120
const GROUND_HEIGHT = 60

const cobijaImage = new Image()
cobijaImage.src = cobijaImgUrl
cobijaImage.crossOrigin = 'anonymous'

const beeImage = new Image()
beeImage.src = beeImgUrl
beeImage.crossOrigin = 'anonymous'

function drawBee(ctx, x, y) {
  ctx.save()
  ctx.translate(x - BEE_SIZE / 2, y - BEE_SIZE / 2)

  const scale = BEE_SIZE / 64
  ctx.scale(scale, scale)

  if (beeImage.complete && beeImage.naturalWidth > 0) {
    ctx.drawImage(beeImage, 0, 0)
  } else {
    ctx.fillStyle = '#FFD700'
    ctx.beginPath()
    ctx.ellipse(32, 32, 17, 15, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#000'
    ctx.beginPath()
    ctx.ellipse(32, 37, 12, 8, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(22, 26, 4, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(42, 26, 4, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.restore()
}

// Usa esta firma (la que te pasé antes)
function drawCloth(ctx, x, gapY, width, isTop) {
  if (cobijaImage.complete && cobijaImage.naturalWidth > 0) {
    const imgW = cobijaImage.naturalWidth;
    const imgH = cobijaImage.naturalHeight;

    // Escalamos la imagen para que tenga la altura de CLOTH_HEIGHT
    const scale = CLOTH_HEIGHT / imgH;
    const drawW = imgW * scale;
    const drawH = imgH * scale;

    // Centramos la cobija respecto al ancho del obstáculo
    const offsetX = x - (drawW - width) / 2;

    ctx.save();

    if (isTop) {
      // Rellenar de arriba hacia abajo hasta el borde del hueco
      let y = gapY - drawH;
      while (y > -drawH) {
        ctx.drawImage(cobijaImage, offsetX, y, drawW, drawH);
        y -= drawH;
      }
    } else {
      // Rellenar desde el borde inferior del hueco hacia abajo
      let y = gapY + OBSTACLE_GAP;
      while (y < CANVAS_HEIGHT) {
        ctx.drawImage(cobijaImage, offsetX, y, drawW, drawH);
        y += drawH;
      }
    }

    ctx.restore();
    return;
  }

  // Fallback con rectángulos si no carga la imagen
  ctx.save();
  ctx.fillStyle = '#E8DCC4';
  ctx.strokeStyle = '#D4A574';
  ctx.lineWidth = 2;

  if (isTop) {
    ctx.fillRect(x, 0, width, gapY);
    ctx.strokeRect(x, 0, width, gapY);
  } else {
    const bottomY = gapY + OBSTACLE_GAP;
    ctx.fillRect(x, bottomY, width, CANVAS_HEIGHT - bottomY);
    ctx.strokeRect(x, bottomY, width, CANVAS_HEIGHT - bottomY);
  }

  ctx.restore();
}

function GamePage() {
  const navigate = useNavigate()
  const canvasRef = useRef(null)

  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameState, setGameState] = useState('start') // start | playing | gameover

  const gameRef = useRef({
    beeX: BEE_START_X,
    beeY: CANVAS_HEIGHT / 2,
    beeVelocity: 0,
    obstacles: [],
    frame: 0,
    score: 0,
    animationId: null
  })

  const resetGame = useCallback(() => {
    gameRef.current = {
      beeX: BEE_START_X,
      beeY: CANVAS_HEIGHT / 2,
      beeVelocity: 0,
      obstacles: [],
      frame: 0,
      score: 0,
      animationId: null
    }
    setScore(0)
  }, [])

  const startGame = useCallback(() => {
    resetGame()
    setGameState('playing')
  }, [resetGame])

  const flap = useCallback(() => {
    if (gameState === 'playing') {
      gameRef.current.beeVelocity = FLAP_STRENGTH
    }
  }, [gameState])

  // Loop del juego
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT)
    gradient.addColorStop(0, '#87CEEB')
    gradient.addColorStop(0.5, '#E0F4FF')
    gradient.addColorStop(1, '#F5F0E1')

    const drawBackground = () => {
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      // Piso
      ctx.fillStyle = '#F5F0E1'
      ctx.fillRect(0, CANVAS_HEIGHT - GROUND_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT)

      ctx.fillStyle = '#14757a'
      ctx.fillRect(0, CANVAS_HEIGHT - GROUND_HEIGHT - 5, CANVAS_WIDTH, 8)

      // Casas
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = '#E8DCC4'
        ctx.fillRect(50 + i * 140, CANVAS_HEIGHT - 55, 80, 40)
      }
    }

    const loop = () => {
      const game = gameRef.current

      if (gameState !== 'playing') {
        drawBackground()
        if (gameState === 'start') {
          drawBee(ctx, BEE_START_X, CANVAS_HEIGHT / 2)
        } else if (gameState === 'gameover') {
          drawBee(ctx, game.beeX, game.beeY)
        }
        return
      }

      // Física
      game.beeVelocity += GRAVITY
      game.beeY += game.beeVelocity

      // Nuevos obstáculos
      if (game.frame % OBSTACLE_SPACING_FRAMES === 0 && game.obstacles.length < MAX_OBSTACLES) {
        const minGapY = 60
        const maxGapY = CANVAS_HEIGHT - 150
        const gapY = minGapY + Math.random() * (maxGapY - minGapY)
        game.obstacles.push({
          x: CANVAS_WIDTH,
          gapY,
          passed: false
        })
      }

      // Mover obstáculos
      game.obstacles.forEach((obs) => {
        obs.x -= 3
        if (!obs.passed && obs.x + OBSTACLE_WIDTH < game.beeX - BEE_SIZE / 2) {
          obs.passed = true
          game.score += 1
          setScore(game.score)
        }
      })

      // Limpiar obstáculos fuera de pantalla
      game.obstacles = game.obstacles.filter((obs) => obs.x > -OBSTACLE_WIDTH)

      // Colisiones con bordes
      const beeTop = game.beeY - BEE_SIZE / 2
      const beeBottom = game.beeY + BEE_SIZE / 2

      if (beeTop < 0 || beeBottom > CANVAS_HEIGHT) {
        setGameState('gameover')
        setHighScore((prev) => (game.score > prev ? game.score : prev))
        return
      }

      // Colisión con cobijas
      const beeLeft = game.beeX - BEE_SIZE / 2
      const beeRight = game.beeX + BEE_SIZE / 2

      for (const obs of game.obstacles) {
        const obsLeft = obs.x
        const obsRight = obs.x + OBSTACLE_WIDTH

        if (beeRight > obsLeft && beeLeft < obsRight) {
          const gapTop = obs.gapY
          const gapBottom = obs.gapY + OBSTACLE_GAP
          if (beeTop < gapTop || beeBottom > gapBottom) {
            setGameState('gameover')
            setHighScore((prev) => (game.score > prev ? game.score : prev))
            return
          }
        }
      }

      // Dibujar
      drawBackground()

      game.obstacles.forEach((obs) => {
        drawCloth(ctx, obs.x, obs.gapY, OBSTACLE_WIDTH, true)   // arriba
        drawCloth(ctx, obs.x, obs.gapY, OBSTACLE_WIDTH, false)  // abajo
      })

      drawBee(ctx, game.beeX, game.beeY)

      ctx.fillStyle = '#1e3a5f'
      ctx.font = 'bold 24px serif'
      ctx.textAlign = 'left'
      ctx.fillText(`🐝 ${game.score}`, 15, 35)

      game.frame += 1
      game.animationId = requestAnimationFrame(loop)
    }

    if (gameState === 'playing') {
      // Inicia loop
      gameRef.current.animationId = requestAnimationFrame(loop)
    } else {
      // Pintar pantalla estática
      drawBackground()
      drawBee(ctx, BEE_START_X, CANVAS_HEIGHT / 2)
    }

    return () => {
      if (gameRef.current.animationId) {
        cancelAnimationFrame(gameRef.current.animationId)
      }
    }
  }, [gameState])

  // Controles de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (gameState === 'start') {
          startGame()
        } else if (gameState === 'playing') {
          flap()
        } else if (gameState === 'gameover') {
          startGame()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState, startGame, flap])

  const handleCanvasClick = () => {
    if (gameState === 'start') {
      startGame()
    } else if (gameState === 'playing') {
      flap()
    } else if (gameState === 'gameover') {
      startGame()
    }
  }

  const currentDay = 1
  const game = { title: 'Juego del día 🐝' }

  return (
    <div className="w-screen h-screen bg-[#1a1a2e] flex flex-col">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="p-4 text-white/70 hover:text-white transition-colors"
      >
        ← Volver
      </button>

      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-[#FFD700]">Juego del día 🐝</h1>
        <p className="text-white/60">
          Día {currentDay} de 4
        </p>
        <p className="text-white/50 text-sm">
          Click o espacio para volar. ¡Esquiva las cobijas!
        </p>

        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={handleCanvasClick}
          className="bg-[#FFF8E7] rounded-xl shadow-lg"
        />

        <div className="text-center">
          <div className="text-lg font-semibold text-white">Puntos: {score}</div>
          {highScore > 0 && (
            <div className="text-sm text-[#FFD700]">Mejor: {highScore}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GamePage