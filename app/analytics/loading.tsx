export default function AnalyticsLoading() {
  return (
    <div className='animate-pulse space-y-6'>
      {/* Generic loading skeleton for analytics */}
      <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-8'></div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className='bg-white dark:bg-card rounded-lg p-6'>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3'></div>
            <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-16'></div>
          </div>
        ))}
      </div>
      
      <div className='bg-white dark:bg-card rounded-lg p-6'>
        <div className='h-96 bg-gray-100 dark:bg-gray-800 rounded'></div>
      </div>
    </div>
  );
}