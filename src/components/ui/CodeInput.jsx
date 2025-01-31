import { useEffect, useRef, useState } from 'react'

const CodeInput = ({ 
  length = 6,
  onComplete,
  error,
  onTimeout
}) => {
  const [codes, setCodes] = useState(Array(length).fill(''))
  const [timeLeft, setTimeLeft] = useState(120)
  const inputsRef = useRef([])
  const timeoutRef = useRef()

  // Запуск таймера
  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)
    return () => clearInterval(timeoutRef.current)
  }, [])

  // Автофокус на первом инпуте
  useEffect(() => {
    if (error) return
    inputsRef.current[0]?.focus()
  }, [error])

  // Обработчик изменения
  const handleChange = (index, value) => {
    if (!/^\d$/.test(value) && value !== '') return
    
    const newCodes = [...codes]
    newCodes[index] = value ? value.slice(-1) : ''
    setCodes(newCodes)

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }

    if (newCodes.every(c => c) && index === length - 1) {
      onComplete(newCodes.join(''))
    }
  }

  // Вставка из буфера
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (/^\d{6}$/.test(text)) {
        const pasteCodes = text.split('').slice(0, length)
        setCodes(pasteCodes)
        pasteCodes.forEach((code, i) => {
          inputsRef.current[i].value = code
          if (i === length - 1) inputsRef.current[i].focus()
        })
        onComplete(pasteCodes.join(''))
      }
    } catch (error) {
      console.error('Ошибка чтения буфера')
    }
  }

  // Сброс инпута
  const resetInput = (index) => {
    const newCodes = [...codes]
    newCodes[index] = ''
    setCodes(newCodes)
    inputsRef.current[index].value = ''
    inputsRef.current[index].focus()
  }

  return (
    <div className="space-y-4">
      {/* Контейнер для инпутов и кнопки */}
      <div className="relative px-4">
        <div className="flex justify-center space-x-2 sm:space-x-3">
          {codes.map((code, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={code}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !code && index > 0) {
                  inputsRef.current[index - 1]?.focus()
                }
                if (e.key === 'Enter' && code) {
                  resetInput(index)
                }
              }}
              onDoubleClick={() => resetInput(index)}
              ref={(el) => (inputsRef.current[index] = el)}
              className={`w-10 h-10 sm:w-12 sm:h-12 text-xl sm:text-2xl text-center 
                border-2 rounded-lg transition-all outline-none font-semibold
                ${error 
                  ? 'border-red-500 shake-animation' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}
                ${code && !error && 'border-green-500 bg-green-50'}`}
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          ))}
        </div>

        {/* Адаптивная кнопка вставки */}
        <button
          onClick={handlePaste}
          className="mt-4 sm:mt-0 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 
            text-sm text-blue-600 hover:text-blue-700 underline transition-colors
            w-full sm:w-auto text-center"
          type="button"
        >
          Вставить код
        </button>
      </div>

      {/* Таймер и подсказки */}
      <div className="text-center space-y-2 px-2">
        <div className="text-sm text-gray-600">
          <p>Введите код в течение</p>
          <div className="font-mono text-blue-600 mt-1">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Двойной клик по цифре для сброса
        </p>
      </div>
    </div>
  )
}

export default CodeInput