function Checkbox({ label, checked, onChange, ...props }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-brand-green-lime bg-gray-100 border-gray-300 rounded focus:ring-brand-green-lime focus:ring-2"
        {...props}
      />
      <label className="ml-2 text-sm text-brand-gray-medium">
        {label}
      </label>
    </div>
  )
}

export default Checkbox