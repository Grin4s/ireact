// components/dashboard/Filters.jsx
import { useState, useEffect } from 'react';
import { DatePicker, Select, Button } from '@/components/ui';
import { 
  ChevronDownIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    period: 'today',
    customDates: { start: null, end: null },
    merchants: [],
    traders: [],
    paymentMethods: [],
    banks: [],
    requisites: []
  });

  const [options, setOptions] = useState({
    merchants: [],
    traders: [],
    paymentMethods: ['Card', 'Bank Transfer', 'Crypto'],
    banks: ['Bank A', 'Bank B', 'Bank C']
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [merchantsRes, tradersRes] = await Promise.all([
          fetch('/api/merchants'),
          fetch('/api/traders')
        ]);
        
        if (!merchantsRes.ok) throw new Error('Merchants request failed');
        if (!tradersRes.ok) throw new Error('Traders request failed');
  
        const merchants = await merchantsRes.json();
        const traders = await tradersRes.json();
  
        setOptions(prev => ({
          ...prev,
          merchants,
          traders
        }));
      } catch (error) {
        console.error('Error fetching options:', error);
        // Можно добавить состояние для отображения ошибки
      }
    };
    
    fetchOptions();
  }, []);

  const handlePeriodChange = (period) => {
    setFilters(prev => ({
      ...prev,
      period,
      customDates: period === 'custom' ? prev.customDates : { start: null, end: null }
    }));
  };

  const handleDateChange = (dates) => {
    setFilters(prev => ({
      ...prev,
      customDates: { start: dates.startDate, end: dates.endDate }
    }));
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const activeFilters = {
      ...filters,
      dateRange: filters.period === 'custom' ? 
        filters.customDates : 
        getPredefinedRange(filters.period)
    };
    onFilterChange(activeFilters);
  };

  const resetFilters = () => {
    setFilters({
      period: 'today',
      customDates: { start: null, end: null },
      merchants: [],
      traders: [],
      paymentMethods: [],
      banks: [],
      requisites: []
    });
    onFilterChange(null);
  };

  const getPredefinedRange = (period) => {
    const now = new Date();
    const formatDate = date => date.toISOString().split('T')[0];
    
    switch(period) {
      case 'today': 
        return { 
          start: formatDate(now), 
          end: formatDate(now) 
        };
      case 'yesterday': 
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        return { 
          start: formatDate(yesterday), 
          end: formatDate(yesterday) 
        };
      case 'week': 
        const startWeek = new Date(now);
        startWeek.setDate(now.getDate() - 6);
        return { 
          start: formatDate(startWeek), 
          end: formatDate(now) 
        };
      case 'month': 
        const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return { 
          start: formatDate(startMonth), 
          end: formatDate(now) 
        };
      case 'last-month': 
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        return { 
          start: formatDate(lastMonth), 
          end: formatDate(endLastMonth) 
        };
      default: 
        return null;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Период */}
        <Select
          label="Период"
          value={filters.period}
          onChange={(e) => handlePeriodChange(e.target.value)}
          options={[
            { value: 'today', label: 'Сегодня' },
            { value: 'yesterday', label: 'Вчера' },
            { value: 'week', label: 'Неделя' },
            { value: 'month', label: 'Этот месяц' },
            { value: 'last-month', label: 'Прошлый месяц' },
            { value: 'custom', label: 'Произвольный период' }
          ]}
          icon={ChevronDownIcon}
        />

        {/* Кастомные даты */}
        {filters.period === 'custom' && (
          <DatePicker
            selectsRange
            startDate={filters.customDates.start}
            endDate={filters.customDates.end}
            onChange={handleDateChange}
            isClearable
            className="w-full"
            placeholderText="Выберите период"
          />
        )}

        {/* Мерчанты */}
        <Select
          label="Мерчанты"
          isMulti
          options={options.merchants.map(m => ({ 
            value: m.id, 
            label: m.name 
          }))}
          value={filters.merchants}
          onChange={(selected) => handleFilterChange('merchants', selected)}
        />

        {/* Трейдеры */}
        <Select
          label="Трейдеры"
          isMulti
          options={options.traders.map(t => ({ 
            value: t.id, 
            label: t.name 
          }))}
          value={filters.traders}
          onChange={(selected) => handleFilterChange('traders', selected)}
        />

        {/* Способы оплаты */}
        <Select
          label="Способы оплаты"
          isMulti
          options={options.paymentMethods.map(p => ({ 
            value: p, 
            label: p 
          }))}
          value={filters.paymentMethods}
          onChange={(selected) => handleFilterChange('paymentMethods', selected)}
        />

        {/* Банки */}
        <Select
          label="Банки"
          isMulti
          options={options.banks.map(b => ({ 
            value: b, 
            label: b 
          }))}
          value={filters.banks}
          onChange={(selected) => handleFilterChange('banks', selected)}
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Button
          variant="outline"
          onClick={resetFilters}
          className="flex items-center gap-2"
        >
          <XMarkIcon className="w-4 h-4" />
          Сбросить фильтры
        </Button>
        <Button 
          onClick={applyFilters}
          variant="primary"
        >
          Применить фильтры
        </Button>
      </div>
    </div>
  );
};

export default Filters;