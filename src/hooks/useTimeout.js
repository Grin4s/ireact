import { useState, useEffect, useRef } from 'react';

export const useTimeout = (initialTime, onTimeout) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const timerRef = useRef();

  const start = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeout?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const clear = () => {
    clearInterval(timerRef.current)
  }

  useEffect(() => {
    return () => clear()
  }, [])

  return { start, clear, timeLeft }
}