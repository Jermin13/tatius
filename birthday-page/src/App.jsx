import { Routes, Route } from 'react-router-dom'
import { useBirthdayTimer } from './hooks/useBirthdayTimer'
import Hero from './components/Hero'
import CountdownTimer from './components/CountdownTimer'
import GreetingCarousel from './components/GreetingCarousel'
import PhotoCollage from './components/PhotoCollage'
import MusicPlayer from './components/MusicPlayer'
import MusicPlaylist from './components/MusicPlaylist'
import FloatingDecorations from './components/FloatingDecorations'
import RomanticBackground from './components/RomanticBackground'
import AdminGate from './components/AdminGate'
import Footer from './components/Footer'
import DailyGameButton from './components/DailyGame'
import FloatingLetter from './components/FloatingLetter'
import GamePage from './pages/GamePage'
import CatchLiliesGame from './pages/CatchLiliesGame'

function HomePage() {
  const celebrantName = 'Tatiana Santander'
  const age = 25
  const birthdayDate = '2026-04-21T00:00:00'
  
  const { isUnlocked, isClient } = useBirthdayTimer(birthdayDate)

  const renderContent = (isAdmin) => {
    const showCarousel = (isUnlocked || isAdmin) && isClient

    return (
      <div className="min-h-screen flex flex-col relative">
        <RomanticBackground />
        <FloatingDecorations isActive={showCarousel} />
        <FloatingLetter />
        
        <Hero name={celebrantName} age={age} isUnlocked={showCarousel} />
        
        <CountdownTimer 
          targetDate={birthdayDate} 
          showBlockingMessage={!isUnlocked}
        />
        
        <DailyGameButton />
        
        <div className={`transition-all duration-700 ease-in-out ${
          showCarousel 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          {showCarousel && (
            <>
              <GreetingCarousel />
              <PhotoCollage />
              <MusicPlayer />
              <MusicPlaylist />
            </>
          )}
        </div>
        
        <Footer />
      </div>
    )
  }

  return <AdminGate>{renderContent}</AdminGate>
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/juego" element={<GamePage />} />
      <Route path="/juego-lirios" element={<CatchLiliesGame />} />
    </Routes>
  )
}

export default App