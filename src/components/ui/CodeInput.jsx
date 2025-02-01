import { useState, useEffect, useRef, useCallback } from 'react';
import { useTimeout } from "@/hooks/useTimeout";

const CodeInput = ({ 
  length = 6,
  onComplete,
  error,
  onTimeout
}) => {
  const [codes, setCodes] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);
  const [isLocked, setIsLocked] = useState(false);

  // Таймер обратного отсчета
  const { 
    start: startTimer, 
    clear: clearTimer, 
    timeLeft 
  } = useTimeout(120, onTimeout);

  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, [startTimer, clearTimer]);

  useEffect(() => {
    if (!error && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [error]);

  const handleChange = useCallback((index, value) => {
    if (isLocked || !/^\d$/.test(value)) return;
    
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newCodes.every(c => c)) {
      setIsLocked(true);
      onComplete(newCodes.join(''));
    }
  }, [codes, length, onComplete, isLocked]);

  const handleKeyDown = useCallback((index, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newCodes = [...codes];
      
      if (codes[index]) {
        newCodes[index] = '';
      } else if (index > 0) {
        newCodes[index - 1] = '';
        inputsRef.current[index - 1]?.focus();
      }
      
      setCodes(newCodes);
    }
  }, [codes]);

  const handlePaste = useCallback(async (e) => {
    e.preventDefault();
    try {
      const text = await navigator.clipboard.readText();
      const cleanedText = text.replace(/\D/g, ''); // Удаляем все нецифровые символы
      
      if (cleanedText.length === length) {
        const newCodes = cleanedText.split('').slice(0, length);
        setCodes(newCodes);
        
        // Заполняем инпуты визуально
        newCodes.forEach((code, index) => {
          if (inputsRef.current[index]) {
            inputsRef.current[index].value = code;
          }
        });
        
        // Фокус на последний инпут
        inputsRef.current[length - 1]?.focus();
        
        // Автоматическая отправка если все заполнено
        if (newCodes.every(c => c)) {
          onComplete(newCodes.join(''));
        }
      }
    } catch (error) {
      console.error('Ошибка вставки:', error);
    }
  }, [length, onComplete]);

  const getInputStyle = useCallback((index) => {
    let style = 'input-2fa transition-all duration-150 text-center ';
    if (error) style += 'shake-animation border-red-500 ';
    if (codes[index]) style += 'bg-blue-50 border-blue-400 ';
    return style;
  }, [error, codes]);

  return (
    <div className="space-y-4">
      <div className="px-2 w-full max-w-[360px] mx-auto">
        <div className="grid grid-cols-6 gap-2 justify-items-center">
          {codes.map((code, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={code}
              className={getInputStyle(index)}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={(e) => e.target.select()}
              onContextMenu={(e) => e.preventDefault()}
              style={{ minWidth: '44px', height: '44px' }}
            />
          ))}
        </div>

        {/* Исправленная кнопка вставки */}
        <div className="flex justify-end mt-2">
          <button
            onClick={handlePaste}
            className="text-sm text-blue-600 hover:text-blue-700 underline transition-colors"
            type="button"
          >
            Вставить код
          </button>
        </div>
      </div>

      <div className="text-center">
        <div className="text-sm text-gray-600">
          Код действителен: 
          <span className="font-mono text-blue-600 ml-1">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CodeInput;