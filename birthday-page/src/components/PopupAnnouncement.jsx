import { useEffect, useRef } from 'react';
import popupImg from '../assets/popup.png';

function PopupAnnouncement({ isOpen, onClose }) {
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      
      const timer = setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }, 0); // Allow render to complete

      const handleKeydown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
        
        // Trap focus
        if (e.key === 'Tab') {
          if (!e.shiftKey && document.activeElement === closeButtonRef.current) {
            e.preventDefault();
            closeButtonRef.current.focus();
          } else if (e.shiftKey && document.activeElement === closeButtonRef.current) {
            e.preventDefault();
            closeButtonRef.current.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeydown);

      // Disable background scrolling
      document.body.style.overflow = 'hidden';

      return () => {
        clearTimeout(timer);
        document.removeEventListener('keydown', handleKeydown);
        document.body.style.overflow = '';
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85">
      <div
        className="relative max-w-md w-[90vw] max-h-[80vh] flex flex-col items-center"
        role="dialog"
        aria-modal="true"
        aria-label="Anuncio especial"
      >
        <img 
          src={popupImg} 
          alt="Anuncio especial para Tatiana" 
          className="w-[90vw] max-w-md max-h-[80vh] object-contain rounded-lg shadow-2xl" 
        />
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="mt-4 px-6 py-2 rounded-full bg-[#D4A574] text-[#050510] font-semibold md:text-base text-sm shadow-md hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-[#D4A574]/50 transition-all"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default PopupAnnouncement;
