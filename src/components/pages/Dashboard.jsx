// pages/Dashboard.jsx
import { useState } from 'react';
import Filters from '@/components/dashboard/Filters';
import SidebarMenu from "@/components/ui/SidebarMenu";
import FinancialMetrics from '@/components/dashboard/FinancialMetrics';

const Dashboard = () => {
  const [activeFilters, setActiveFilters] = useState(null);

  const handleFilter = (filters) => {
    // Здесь можно добавить логику запроса к API
    console.log('Applying filters:', filters);
    setActiveFilters(filters);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMenu />
      
      <main className="flex-1 p-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <Filters onFilterChange={handleFilter} />
          
          {/* Пример компонента с метриками */}
          <FinancialMetrics filters={activeFilters} />
          
          {/* Другие компоненты дашборда */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 