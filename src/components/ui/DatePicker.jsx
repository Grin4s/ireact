import ReactDatePicker from 'react-datepicker';
import { CalendarIcon } from '@heroicons/react/24/outline';
import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = ({
  selectsRange = false,
  startDate,
  endDate,
  onChange,
  isClearable = false,
  placeholderText,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <ReactDatePicker
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        selectsRange={selectsRange}
        isClearable={isClearable}
        placeholderText={placeholderText}
        className="w-full p-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 
          focus:ring-blue-500 focus:border-blue-500"
        dateFormat="dd.MM.yyyy"
      />
      <div className="absolute right-2 top-2.5 text-gray-400">
        <CalendarIcon className="w-5 h-5" />
      </div>
    </div>
  );
};

export default DatePicker;