function RadioGroup({ name, options, value, onChange, label }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-brand-gray-medium mb-3">
          {label}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-brand-green-lime border-gray-300 focus:ring-brand-green-lime"
            />
            <span className="ml-2 text-sm text-brand-gray-medium">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default RadioGroup