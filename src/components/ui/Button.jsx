function Button({ 
  children, 
  variant = "primary", 
  type = "button", 
  onClick, 
  className = "",
  ...props 
}) {
  const baseClasses = "w-full font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm"
  
  const variants = {
    primary: "bg-brand-green-lime text-brand-graphite hover:bg-brand-green-medium",
    secondary: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button