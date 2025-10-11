function SplitLayout({ leftContent, rightContent }) {
  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        {leftContent}
      </div>

      {/* Right side */}
      <div className="hidden lg:flex w-1/2 bg-brand-graphite relative">
        {rightContent}
      </div>
    </div>
  )
}

export default SplitLayout