import { ArrowRightIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { memo } from 'react';

const Button = memo(({ 
  children, 
  isLoading = false, 
  variant = 'primary',
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    'primary-loading': 'bg-blue-500 cursor-wait',
    'outline-loading': 'border-blue-400 text-blue-400 cursor-wait'
  };

  const getVariantClass = () => {
    if (isLoading) {
      return variant === 'outline' 
        ? variants['outline-loading'] 
        : variants['primary-loading'];
    }
    return variants[variant];
  };

  return (
    <button
      {...props}
      disabled={isLoading}
      className={`w-full font-medium py-3 px-6 rounded-xl transition-all 
        duration-200 flex items-center justify-center gap-2 
        disabled:opacity-80 disabled:cursor-not-allowed
        ${getVariantClass()} ${className}`}
    >
      {isLoading ? (
        <ArrowPathIcon className="h-5 w-5 animate-spin" />
      ) : (
        <>
          {children}
          {variant === 'primary' && <ArrowRightIcon className="h-5 w-5" />}
        </>
      )}
    </button>
  );
});

export default Button;