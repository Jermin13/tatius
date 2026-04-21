import { useState, useRef, useEffect } from 'react'
import audioSrc from '../assets/music/audio.m4a'
import portadaSrc from '../assets/music/portada.png'

function MusicPlayer() {
  const audioRef = useRef(null)
  const progressRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onLoadedMetadata = () => setDuration(audio.duration)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  useEffect(() => {
    return () => {
      const audio = audioRef.current
      if (audio) {
        audio.pause()
        audio.src = ''
      }
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    const bar = progressRef.current
    if (!audio || !bar) return
    const rect = bar.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    audio.currentTime = ratio * duration
    setCurrentTime(audio.currentTime)
  }

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <section className="py-16 px-4">
      <h2 style={{
        color: '#D4A574',
        fontFamily: 'serif',
        fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
        textAlign: 'center',
        marginBottom: '20px',
        letterSpacing: '0.05em',
      }}>
        🎵 Una canción para ti
      </h2>

      <div className="max-w-[560px] mx-auto" style={{
        backgroundColor: '#0d0d1a',
        border: '1px solid rgba(212, 165, 116, 0.3)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        padding: '24px',
      }}>
        <audio ref={audioRef} src={audioSrc} preload="metadata" />

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div
              className="w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden"
              style={{
                animation: isPlaying ? 'spin 12s linear infinite' : 'none',
                animationPlayState: isPlaying ? 'running' : 'paused',
              }}
            >
              <img
                src={portadaSrc}
                alt="Portada"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-[#FFF8DC]" style={{
              fontFamily: 'serif',
              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
              fontWeight: 'bold',
            }}>
              Una canción para ti
            </h3>
            <p className="text-[#D4A574]" style={{
              fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
              marginTop: '4px',
            }}>
              Jermin Shadin ♪ Especial para Tatiana
            </p>

            <div className="mt-4 sm:mt-6">
              <button
                onClick={togglePlay}
                className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, #1e3a5f, #0a1628)',
                  border: '2px solid #D4A574',
                  boxShadow: '0 0 16px rgba(212,165,116,0.4)',
                  margin: '0 auto',
                  cursor: 'pointer',
                  transition: 'filter 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.3)'}
                onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
              >
                <span style={{ fontSize: '20px' }}>
                  {isPlaying ? '⏸' : '▶'}
                </span>
              </button>
            </div>

            <div
              ref={progressRef}
              className="mt-4 sm:mt-6 flex items-center gap-3 cursor-pointer"
              style={{ width: '100%' }}
              onClick={handleSeek}
            >
              <span className="text-[rgba(255,248,220,0.6)]" style={{ fontSize: '11px', fontFamily: 'monospace' }}>
                {formatTime(currentTime)}
              </span>
              <div className="flex-1 relative h-[4px] rounded" style={{ background: 'rgba(212,165,116,0.2)' }}>
                <div
                  className="absolute h-full rounded"
                  style={{
                    width: `${progressPercent}%`,
                    background: '#D4A574',
                  }}
                />
                <div
                  className="absolute w-[12px] h-[12px] rounded-full"
                  style={{
                    background: '#D4A574',
                    left: `${progressPercent}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </div>
              <span className="text-[rgba(255,248,220,0.6)]" style={{ fontSize: '11px', fontFamily: 'monospace' }}>
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}

export default MusicPlayer