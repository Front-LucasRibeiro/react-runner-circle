function Textarea({ label, placeholder, value, onChange, rows = 4, ...props }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-brand-gray-medium mb-2">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-lime focus:border-transparent text-sm resize-vertical"
        {...props}
      />
    </div>
  )
}

export default Textarea