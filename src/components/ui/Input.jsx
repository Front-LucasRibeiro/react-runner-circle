function Input({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  required = false,
  ...props 
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-gray-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-lime focus:border-transparent text-sm"
        {...props}
      />
    </div>
  )
}

export default Input