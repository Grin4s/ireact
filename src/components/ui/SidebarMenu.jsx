import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ChartBarIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  BanknotesIcon, // Замена CashIcon на BanknotesIcon
  ExclamationTriangleIcon,
  ChatBubbleOvalLeftIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'Статистика', icon: ChartBarIcon, path: '/dashboard' },
  { name: 'Трейдеры', icon: UserGroupIcon, path: '/traders' },
  { name: 'Мерчанты', icon: ShoppingCartIcon, path: '/merchants' },
  { name: 'Платежи', icon: CreditCardIcon, path: '/payments' },
  { name: 'Выплаты', icon: BanknotesIcon, path: '/payouts' }, // Исправлено здесь
  { name: 'Споры', icon: ExclamationTriangleIcon, path: '/disputes' },
  { name: 'Сообщения', icon: ChatBubbleOvalLeftIcon, path: '/messages' },
  { name: 'Чат', icon: ChatBubbleLeftRightIcon, path: '/chat' },
  { name: 'Финансы', icon: CurrencyDollarIcon, path: '/finance' },
  { name: 'Настройки', icon: Cog6ToothIcon, path: '/settings' },
];


const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 p-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white shadow-md"
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <nav 
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-40`}
      >
        <div className="p-6 mb-4">
          <h1 className="text-2xl font-bold text-blue-600">Личный кабинет</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center px-6 py-3 text-gray-700 transition-colors
                hover:bg-blue-50 hover:text-blue-600 
                ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-500' : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full"
                src="https://via.placeholder.com/40"
                alt="User avatar"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Иван Иванов</p>
              <p className="text-xs text-gray-500">Администратор</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SidebarMenu;