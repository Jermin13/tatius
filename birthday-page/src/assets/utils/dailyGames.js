// src/utils/dailyGames.js
export const DAILY_GAMES = [
    { id: 1, title: 'Juego del día 🐝', name: 'Flappy Bee', path: '/game/flappy-bee' },
    { id: 2, title: 'Juego del día 2', name: 'Coming Soon', path: '/game/2' },
    { id: 3, title: 'Juego del día 3', name: 'Coming Soon', path: '/game/3' },
    { id: 4, title: 'Juego del día 4', name: 'Coming Soon', path: '/game/4' }
]

const START_DATE_ISO = '2026-04-17T00:00:00'

export function getCurrentDay(maxDays = DAILY_GAMES.length) {
    const now = new Date()
    const start = new Date(START_DATE_ISO)
    const diffTime = now.getTime() - start.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const day = diffDays + 1
    return Math.min(Math.max(day, 1), maxDays)
}

export function getTodayGame() {
    const currentDay = getCurrentDay()
    return {
        currentDay,
        game: DAILY_GAMES[currentDay - 1]
    }
}