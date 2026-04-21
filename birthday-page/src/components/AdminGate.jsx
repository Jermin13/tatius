import { useState, useEffect, useCallback } from 'react';

const ADMIN_CODE = 'tatius';
const STORAGE_KEY = 'birthday_admin_auth';

function AdminGate({ children, onAdminChange, onAdminUnlock }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem(STORAGE_KEY);
    if (storedAuth === 'true') {
      setIsAdmin(true);
      if (onAdminUnlock) {
        onAdminUnlock();
      }
    }
    setIsChecking(false);
  }, [onAdminUnlock]);

  useEffect(() => {
    if (onAdminChange) {
      onAdminChange(isAdmin);
    }
  }, [isAdmin, onAdminChange]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setShowInput(false);
        setInputValue('');
        setError('');
      }
    };

    if (showInput) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [showInput]);

  useEffect(() => {
    const handleAdminKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowInput(true);
      }
    };

    window.addEventListener('keydown', handleAdminKey);
    return () => window.removeEventListener('keydown', handleAdminKey);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (inputValue.toLowerCase() === ADMIN_CODE) {
      setIsAdmin(true);
      localStorage.setItem(STORAGE_KEY, 'true');
      setError('');
      setShowInput(false);
      setInputValue('');
      if (onAdminUnlock) {
        onAdminUnlock();
      }
    } else {
      setError('Código incorrecto');
      setTimeout(() => setError(''), 2000);
    }
  }, [inputValue, onAdminUnlock]);

  const handleLogout = useCallback(() => {
    setIsAdmin(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  if (isChecking) {
    return null;
  }

  return (
    <>
      {children(isAdmin)}
      
      {isAdmin && (
        <div className="fixed top-4 right-4 z-50 bg-[#2C3E50] text-white px-4 py-2 rounded-lg text-sm font-mono">
          <span className="text-[#B5C9A8]">●</span> Modo Admin
          <button 
            onClick={handleLogout}
            className="ml-3 text-[#E8B4B8] hover:text-white underline"
          >
            Salir
          </button>
        </div>
      )}
      
      {showInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <form 
            onSubmit={handleSubmit}
            className="bg-[#F5F0E1] rounded-xl p-6 shadow-2xl max-w-sm w-full mx-4"
          >
            <h3 className="font-vintage text-xl text-[#2C3E50] mb-4">
              Acceso Administrador
            </h3>
            
            <input
              type="password"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ingresa el código"
              className="w-full px-4 py-3 border-2 border-[#D4A574]/30 rounded-lg focus:border-[#D4A574] focus:outline-none font-mono"
              autoFocus
            />
            
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            
            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => {
                  setShowInput(false);
                  setInputValue('');
                  setError('');
                }}
                className="flex-1 px-4 py-2 border-2 border-[#D4A574]/30 text-[#2C3E50] rounded-lg hover:bg-[#E8B4B8]/20 transition-colors"
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#2C3E50] text-white rounded-lg hover:bg-[#2C3E50]/90 transition-colors"
              >
                Acceder
              </button>
            </div>
            
            <p className="text-xs text-[#2C3E50]/50 mt-3 text-center">
              Presiona ESC para cancelar
            </p>
          </form>
        </div>
      )}
      
      <button
        onClick={() => setShowInput(true)}
        className="fixed bottom-4 right-4 w-10 h-10 bg-[#D4A574]/10 hover:bg-[#D4A574]/20 rounded-full flex items-center justify-center text-[#D4A574]/40 hover:text-[#D4A574] transition-all"
        aria-label="Admin"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </button>
    </>
  );
}

export default AdminGate;