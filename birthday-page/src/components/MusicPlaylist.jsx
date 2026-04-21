import { useState, useRef, useEffect } from 'react'
import Abrazado from '../assets/playlist/Abrazado a Ti.mp3'
import Amarte from '../assets/playlist/Amarte Es Un Placer.mp3'
import AmorCompleto from '../assets/playlist/Amor Completo.mp3'
import Inolvidable from '../assets/playlist/Inolvidable.mp3'
import TeAmoyMas from '../assets/playlist/Te Amo Y Más.mp3'
import TeQuiero from '../assets/playlist/Te Quiero Tanto .mp3'
import Nadie from '../assets/playlist/nadie va pensar en ti mejor que yo .mp3'

const SONGS = [
  { id: 1, src: TeAmoyMas, title: 'Te Amo Y Más', artist: 'Libro de la Vida' },
  { id: 2, src: Abrazado, title: 'Abrazado a Ti', artist: 'Kevin Kaarl' },
  { id: 3, src: TeQuiero, title: 'Te Quiero Tanto', artist: 'Kevin Kaarl' },
  { id: 4, src: Inolvidable, title: 'Inolvidable', artist: 'Reik' },
  { id: 5, src: Amarte, title: 'Amarte Es Un Placer', artist: 'Luis Miguel' },
  { id: 6, src: Nadie, title: 'Nadie Va Pensar En Ti', artist: 'Ed Maverick' },
  { id: 7, src: AmorCompleto, title: 'Amor Completo', artist: 'Mon Laferte' },
]

function MusicPlaylist() {
  const audioRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  const togglePlay = (index, songSrc) => {
    const audio = audioRef.current
    if (!audio) return

    if (activeIndex === index) {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        audio.play()
        setIsPlaying(true)
      }
    } else {
      audio.src = songSrc
      audio.play()
      setActiveIndex(index)
      setIsPlaying(true)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
  }

  return (
    <section className="py-12 px-4">
      <audio ref={audioRef} onEnded={handleEnded} />
      
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
            {SONGS.map((song, index) => (
              <div
                key={song.id}
                onClick={() => togglePlay(index, song.src)}
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
                    {song.title.charAt(0)}
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
                    {song.artist}
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