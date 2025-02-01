import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Select = ({
  label,
  options,
  value,
  onChange,
  isMulti = false,
  icon: Icon = ChevronDownIcon,
  className = '',
}) => {
  const handleChange = (e) => {
    const selected = Array.from(e.target.selectedOptions)
      .map(option => option.value);
    onChange(isMulti ? selected : selected[0]);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <div className="relative">
        <select
          className="w-full p-2 pr-8 border border-gray-300 rounded-lg bg-white
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
          value={value}
          onChange={handleChange}
          multiple={isMulti}
        >
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
              className="checked:bg-blue-50"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Select;