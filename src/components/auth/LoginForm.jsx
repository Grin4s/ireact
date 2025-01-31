import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, CodeInput } from '@/components/ui'
import { LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function LoginForm() {
  const navigate = useNavigate()
  const [token, setToken] = useState('')
  const [code2FA, setCode2FA] = useState('')
  const [needs2FA, setNeeds2FA] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [timerKey, setTimerKey] = useState(Date.now())

  const handle2FAComplete = (code) => {
    setCode2FA(code)
    if (code.length === 6) {
      handleSubmit(new Event('submit'))
    }
  }

  const handleTimeout = () => {
    setNeeds2FA(false)
    setToken('')
    setError('Время ввода кода истекло. Начните заново.')
    setTimeout(() => setError(''), 5000)
    setTimerKey(Date.now())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    setTimeout(() => {
      if (needs2FA) {
        if (code2FA === '123456') {
          navigate('/dashboard')
        } else {
          setError('Неверный код подтверждения')
          setTimeout(() => setError(''), 3000)
        }
      } else {
        if (/^[\w!@#$%^&*()-+=]{20,30}$/.test(token)) {
          setNeeds2FA(true)
        } else {
          setError('Токен должен содержать 20-30 символов (буквы, цифры, спецсимволы)')
          setTimeout(() => setError(''), 3000)
        }
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="max-w-md w-full mx-4 sm:mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-lg">
      {/* Заголовок */}
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

      {/* Форма */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
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
            pattern="^[\w!@#$%^&*()-+=]{20,30}$"
            required
            error={error}
            className="text-sm sm:text-base"
          />
        ) : (
          <div className="space-y-4" key={timerKey}>
            <CodeInput 
              onComplete={handle2FAComplete}
              error={error}
              onTimeout={handleTimeout}
            />
            <p className="text-xs sm:text-sm text-gray-500 text-center px-2">
              Откройте Google Authenticator для получения кода.
              Код действителен в течение 2 минут
            </p>
          </div>
        )}

        {/* Кнопка отправки */}
        <Button 
          type="submit" 
          isLoading={isLoading}
          variant={needs2FA ? 'primary' : 'outline'}
          className="w-full text-sm sm:text-base"
        >
          {needs2FA ? 'Подтвердить код' : 'Продолжить'}
        </Button>

        {/* Блок ошибок */}
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