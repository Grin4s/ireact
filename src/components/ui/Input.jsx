const Input = ({ 
  label, 
  error,
  description,
  icon: Icon,
  ...props 
}) => (
  <div>
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
    )}
    
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <input
        {...props}
        className={`w-full px-4 py-3 border-2 ${
          Icon ? 'pl-11' : 'pl-4'
        } rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
        transition-colors placeholder-gray-400/60 ${
          error ? 'border-red-500' : 'border-gray-200'
        }`}
      />
    </div>

    {description && !error && (
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    )}
    
    {error && (
      <p className="mt-2 text-sm text-red-600">{error}</p>
    )}
  </div>
)

export default Input