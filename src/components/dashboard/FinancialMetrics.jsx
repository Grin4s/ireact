const FinancialMetrics = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Финансовые метрики</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard title="Оборот" value="₽1 250 000" />
          <MetricCard title="Доход" value="₽150 000" />
          <MetricCard title="Транзакции" value="342" />
          <MetricCard title="Средний чек" value="₽3 650" />
        </div>
      </div>
    );
  };
  
  // Вспомогательный компонент для карточек метрик
  const MetricCard = ({ title, value }) => {
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center">
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <p className="text-lg font-bold">{value}</p>
      </div>
    );
  };
  
  export default FinancialMetrics;
  