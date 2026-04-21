import { useState } from 'react'

const PLAYLIST = [
  { id: 1, letter: 'T', title: 'Te busco en cada pensamiento', subtitle: 'Cuando el día se hace largo...' },
  { id: 2, letter: 'A', title: 'Amor en silencio', subtitle: 'Mi corazón te tiene guardada' },
  { id: 3, letter: 'T', title: 'Teclado sin ti', subtitle: 'Escribir es diferente cuando no estás...' },
  { id: 4, letter: 'I', title: 'Ilusión constante', subtitle: 'Cada mañana trae tu recuerdo' },
  { id: 5, letter: 'A', title: 'Aurora de tu sonrisa', subtitle: 'Ilumina hasta lo más oscuro' },
  { id: 6, letter: 'N', title: 'Noche contigo', subtitle: ' Mi sueño favorito' },
  { id: 7, letter: 'A', title: 'Alma competa', subtitle: 'Encontré mi otra mitad' },
]

function MusicPlaylist() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = (index) => {
    if (activeIndex === index) {
      setIsPlaying(!isPlaying)
    } else {
      setActiveIndex(index)
      setIsPlaying(true)
    }
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-[560px] mx-auto">
        <h2 style={{
          color: '#D4A574',
          fontFamily: 'serif',
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          textAlign: 'center',
          marginBottom: '24px',
          letterSpacing: '0.05em',
        }}>
          🎶 Playlist: Tatiana
        </h2>

        <div style={{
          backgroundColor: '#0b0b17',
          border: '1px solid rgba(255, 248, 220, 0.08)',
          borderRadius: '18px',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255, 248, 220, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '10px',
              backgroundColor: '#050510',
              border: '1px solid rgba(212, 165, 116, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'serif',
                fontSize: '24px',
                color: '#D4A574',
                fontWeight: 'bold',
              }}>
                ♥
              </span>
            </div>
            <div>
              <p style={{
                color: '#D4A574',
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontFamily: 'serif',
              }}>
                Playlist
              </p>
              <h3 style={{
                color: '#FFF8DC',
                fontFamily: 'serif',
                fontSize: 'clamp(1rem, 3vw, 1.4rem)',
                fontWeight: '600',
                marginTop: '2px',
              }}>
                Canciones para Tatiana
              </h3>
            </div>
          </div>

          <div style={{ padding: '8px 0' }}>
            {PLAYLIST.map((song, index) => (
              <div
                key={song.id}
                onClick={() => togglePlay(index)}
                style={{
                  height: '64px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 20px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  backgroundColor: activeIndex === index ? 'rgba(212, 165, 116, 0.12)' : 'transparent',
                  borderLeft: activeIndex === index ? '2px solid #D4A574' : '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (activeIndex !== index) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeIndex !== index) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: '#050510',
                  border: '1px solid rgba(212, 165, 116, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: 'serif',
                    fontSize: '20px',
                    color: '#D4A574',
                    fontWeight: 'bold',
                  }}>
                    {song.letter}
                  </span>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    color: activeIndex === index ? '#D4A574' : '#FFF8DC',
                    fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                    fontWeight: '600',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {song.title}
                  </p>
                  <p style={{
                    color: 'rgba(255, 248, 220, 0.7)',
                    fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
                    margin: '4px 0 0',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {song.subtitle}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '12px' }}>
                  <button
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: '1px solid rgba(212, 165, 116, 0.5)',
                      backgroundColor: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#FFF8DC',
                      fontSize: '10px',
                      opacity: activeIndex === index ? 1 : 0.5,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {activeIndex === index && isPlaying ? '⏸' : '▶'}
                  </button>
                  <span style={{
                    color: 'rgba(255, 248, 220, 0.5)',
                    fontSize: '18px',
                    fontWeight: '300',
                  }}>
                    ...
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MusicPlaylist