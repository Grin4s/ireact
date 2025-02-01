import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, CodeInput } from '@/components/ui'
import { LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function LoginForm() {
  const navigate = useNavigate()
  const [token, setToken] = useState('')
  const [needs2FA, setNeeds2FA] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTimeout = () => {
    setNeeds2FA(false)
    setToken('')
    setError('Время ввода кода истекло. Начните заново.')
    setTimeout(() => setError(''), 5000)
  }

  const handleSubmit = async (e, code = '') => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    setTimeout(() => {
      if (needs2FA) {
        if (code === '123456') {
          navigate('/dashboard')
        } else {
          setError(code.length === 6 ? 'Неверный код подтверждения' : 'Введите все 6 цифр')
          setTimeout(() => setError(''), 3000)
        }
      } else {
        // Проверяем только длину токена
        if (token.length >= 20 && token.length <= 30) {
          setNeeds2FA(true)
          setError('')
        } else {
          setError('Токен должен содержать от 20 до 30 символов')
          setTimeout(() => setError(''), 3000)
        }
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="max-w-md w-full mx-4 sm:mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-lg">
      <div className="text-center space-y-3">
        <div className="mx-auto inline-block p-3 sm:p-4 bg-blue-100 rounded-2xl">
          <ShieldCheckIcon className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Secure Access
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          {needs2FA 
            ? 'Введите код двухфакторной аутентификации' 
            : 'Введите ваш секретный токен'}
        </p>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="mt-6 space-y-6">
        {!needs2FA ? (
          <Input
            label="Security Token"
            value={token}
            onChange={(e) => {
              setToken(e.target.value)
              setError('')
            }}
            placeholder="Введите 20-30 символов"
            icon={LockClosedIcon}
            required
            error={error}
            className="text-sm sm:text-base"
          />
        ) : (
          <CodeInput 
            onComplete={(code) => handleSubmit(new Event('submit'), code)}
            error={error}
            onTimeout={handleTimeout}
          />
        )}

        <Button 
          type="submit" 
          isLoading={isLoading}
          variant={needs2FA ? 'primary' : 'outline'}
          className="w-full text-sm sm:text-base"
        >
          {needs2FA ? 'Подтвердить код' : 'Продолжить'}
        </Button>

        {error && (
          <div className="px-2">
            <p className="text-red-600 text-xs sm:text-sm text-center animate-pulse">
              {error}
            </p>
          </div>
        )}
      </form>
    </div>
  )
}