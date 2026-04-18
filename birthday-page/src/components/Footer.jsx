function Footer() {
  return (
    <footer className="py-8 text-center border-t border-[#D4A574]/20 mt-auto">
      <div className="mb-4">
        <span className="font-vintage text-[#2C3E50]/60">
          Con amor y celebración
        </span>
      </div>
      <div className="text-[#D4A574]/40 text-sm">
        © {new Date().getFullYear()} • Página de Cumpleaños
      </div>
    </footer>
  );
}

export default Footer;