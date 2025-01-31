import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { memo } from 'react'

const Button = memo(({ 
  children, 
  isLoading = false, 
  variant = 'primary',
  ...props 
}) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  }

  return (
    <button
      {...props}
      className={`w-full font-medium py-3 px-6 rounded-xl transition-all 
        duration-300 flex items-center justify-center gap-2 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}`}
    >
      {isLoading ? (
        <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin"/>
      ) : (
        <>
          {children}
          {variant === 'primary' && <ArrowRightIcon className="h-5 w-5" />}
        </>
      )}
    </button>
  )
})

export default Button