import { useState, useRef, useEffect } from 'react'
import LoveCoupons from './LoveCoupons'
import cofreImg from '../assets/cofre-del-tesoro.png'

function LoveChest() {
  const [password, setPassword] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState('')
  const [showChest, setShowChest] = useState(true)

  const handleUnlock = () => {
    if (password.trim().toUpperCase() === 'MOCHI') {
      setIsUnlocked(true)
      setError('')
    } else {
      setError('Mmm... esa no es la palabra secreta. Inténtalo de nuevo.')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUnlock()
    }
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-[640px] mx-auto text-center">
        {showChest && !isUnlocked && (
          <>
            <div
              style={{
                marginBottom: '24px',
                animation: 'float 3s ease-in-out infinite',
              }}
            >
              <img
                src={cofreImg}
                alt="Cofre del tesoro"
                style={{
                  display: 'block',
                  margin: '0 auto',
                  width: '180px',
                  height: 'auto',
                  filter: 'drop-shadow(0 0 20px rgba(212,165,116,0.3))',
                }}
              />
            </div>

            <h2 style={{
              color: '#D4A574',
              fontFamily: 'serif',
              fontSize: 'clamp(1.4rem, 4vw, 2rem)',
              marginBottom: '8px',
            }}>
              Cofre secreto
            </h2>

            <p style={{
              color: 'rgba(255, 248, 220, 0.7)',
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              marginBottom: '24px',
            }}>
              Introduce la contraseña secreta para abrirlo
            </p>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Contraseña..."
                style={{
                  padding: '12px 20px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(212, 165, 116, 0.4)',
                  backgroundColor: '#0b0b17',
                  color: '#FFF8DC',
                  width: '200px',
                  outline: 'none',
                  fontFamily: 'serif',
                }}
              />
              <button
                onClick={handleUnlock}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '2px solid #D4A574',
                  backgroundColor: 'transparent',
                  color: '#D4A574',
                  cursor: 'pointer',
                  fontFamily: 'serif',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#D4A574'
                  e.currentTarget.style.color = '#050510'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#D4A574'
                }}
              >
                Abrir
              </button>
            </div>

            {error && (
              <p style={{
                color: '#D4A574',
                marginTop: '16px',
                fontSize: '14px',
              }}>
                {error}
              </p>
            )}
          </>
        )}

        {isUnlocked && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <p style={{
              color: '#FFF8DC',
              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
              fontFamily: 'serif',
              marginBottom: '32px',
              fontStyle: 'italic',
            }}>
              ¡Tesoro desbloqueado! Estos cupones son solo para ti, Tatiana.
            </p>
            <LoveCoupons />
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

export default LoveChest