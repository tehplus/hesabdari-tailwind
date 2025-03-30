import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { CurrencyDollarIcon, UsersIcon, ShoppingBagIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const stats = [
  { name: 'درآمد کل', value: '۱۲۳,۴۵۶,۷۸۹ تومان', icon: CurrencyDollarIcon, change: '+12.5%', changeType: 'increase' },
  { name: 'تعداد مشتریان', value: '۲,۳۴۵', icon: UsersIcon, change: '+3.2%', changeType: 'increase' },
  { name: 'موجودی کالا', value: '۱,۲۳۴', icon: ShoppingBagIcon, change: '-2.1%', changeType: 'decrease' },
  { name: 'سود خالص', value: '۴۵,۶۷۸,۹۰۱ تومان', icon: ArrowTrendingUpIcon, change: '+8.3%', changeType: 'increase' },
];

export default function Dashboard() {
  const [salesChart, setSalesChart] = useState({
    series: [{
      name: 'فروش',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 160, 180]
    }],
    options: {
      chart: {
        fontFamily: 'IRANSans, Vazir, system-ui',
        height: 350,
        type: 'line',
        toolbar: {
          show: false
        }
      },
      title: {
        text: 'نمودار فروش سالانه',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
        }
      },
      xaxis: {
        categories: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      },
      stroke: {
        curve: 'smooth'
      },
    },
  });

  return (
    <div className="space-y-6">
      {/* آمار کلی */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-primary-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="mr-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="mr-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p className={`mr-2 flex items-baseline text-sm font-semibold ${
                item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* نمودار فروش */}
      <div className="bg-white rounded-lg shadow p-6">
        <ReactApexChart 
          options={salesChart.options} 
          series={salesChart.series} 
          type="line" 
          height={350} 
        />
      </div>

      {/* نمودارهای دیگر و اطلاعات بیشتر */}
    </div>
  );
}