import logoColors from '../../assets/logo-colors.svg'

function Header() {
  return (
    <header className="bg-brand-graphite text-white p-4">
      {/* Desktop layout */}
      <div className="hidden md:flex items-center">
        <img src={logoColors} alt="Runner Circle" className="h-8" />
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex items-center">
        <img src={logoColors} alt="Runner Circle" className="h-8" />
      </div>
    </header>
  )
}

export default Header