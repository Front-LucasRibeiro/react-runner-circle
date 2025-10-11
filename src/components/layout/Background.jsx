function Background({ children }) {
  return (
    <div className="min-h-screen bg-brand-green-light relative overflow-hidden">
      {/* Background diagonal stripes pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 60px,
            #B6FF02 60px,
            #B6FF02 100px
          )`
        }}></div>
        
        {/* Curved pattern overlay */}
        <div className="absolute top-0 right-0 w-full h-full">
          <svg viewBox="0 0 1440 900" className="absolute top-0 right-0 w-full h-full">
            <path d="M800,0 Q1200,300 1440,600 L1440,0 Z" fill="#B6FF02" opacity="0.3"/>
            <path d="M600,0 Q1000,400 1440,700 L1440,0 Z" fill="#DBFFB1" opacity="0.5"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default Background