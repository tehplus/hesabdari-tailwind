/**
 * @file Dashboard Page
 * @description Main dashboard with charts and statistics
 * @date 2025-03-31 15:43:05
 */

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ScaleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// ثبت اجزای مورد نیاز چارت
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// آپشن‌های پیش‌فرض برای چارت‌ها
const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      rtl: true,
      labels: {
        font: {
          family: 'IRANSans'
        }
      }
    }
  }
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalPurchases: 0,
    totalCustomers: 0,
    totalProducts: 0,
    salesGrowth: 0,
    profitGrowth: 0,
    stockValue: 0,
    accountsReceivable: 0
  });

  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: []
  });

  const [purchasesData, setPurchasesData] = useState({
    labels: [],
    datasets: []
  });

  const [productsData, setProductsData] = useState({
    labels: [],
    datasets: []
  });

  const [customersData, setCustomersData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // در اینجا API call برای دریافت اطلاعات داشبورد
      // فعلاً داده تستی قرار می‌دهیم

      // آمار کلی
      setStats({
        totalSales: 12500000,
        totalPurchases: 8700000,
        totalCustomers: 156,
        totalProducts: 342,
        salesGrowth: 12.5,
        profitGrowth: 8.3,
        stockValue: 45600000,
        accountsReceivable: 3200000
      });

      // داده‌های نمودار فروش
      setSalesData({
        labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
        datasets: [
          {
            label: 'فروش',
            data: [1200000, 1900000, 1600000, 2500000, 2100000, 3200000],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'هزینه',
            data: [800000, 1300000, 1100000, 1800000, 1500000, 2300000],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.4,
            fill: true
          }
        ]
      });

      // داده‌های نمودار خرید
      setPurchasesData({
        labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
        datasets: [{
          label: 'خرید',
          data: [750000, 1200000, 900000, 1500000, 1300000, 1800000],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
          ]
        }]
      });

      // داده‌های نمودار محصولات
      setProductsData({
        labels: ['موجود', 'رو به اتمام', 'ناموجود'],
        datasets: [{
          data: [250, 65, 27],
          backgroundColor: [
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(255, 99, 132, 0.8)'
          ]
        }]
      });

      // داده‌های نمودار مشتریان
      setCustomersData({
        labels: ['دائمی', 'موردی', 'جدید'],
        datasets: [{
          data: [85, 45, 26],
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(153, 102, 255, 0.8)'
          ]
        }]
      });

    } catch (error) {
      toast.error('خطا در دریافت اطلاعات');
    } finally {
      setLoading(false);
    }
  };

  // کارت‌های آماری
  const stats_cards = [
    {
      name: 'فروش کل',
      value: new Intl.NumberFormat('fa-IR').format(stats.totalSales),
      unit: 'ریال',
      icon: CurrencyDollarIcon,
      change: stats.salesGrowth,
      changeType: 'positive'
    },
    {
      name: 'خرید کل',
      value: new Intl.NumberFormat('fa-IR').format(stats.totalPurchases),
      unit: 'ریال',
      icon: ShoppingCartIcon,
      change: 4.2,
      changeType: 'negative'
    },
    {
      name: 'تعداد مشتریان',
      value: new Intl.NumberFormat('fa-IR').format(stats.totalCustomers),
      unit: 'نفر',
      icon: UserGroupIcon,
      change: 12,
      changeType: 'positive'
    },
    {
      name: 'تعداد محصولات',
      value: new Intl.NumberFormat('fa-IR').format(stats.totalProducts),
      unit: 'عدد',
      icon: ScaleIcon,
      change: 3,
      changeType: 'positive'
    },
    {
      name: 'ارزش موجودی',
      value: new Intl.NumberFormat('fa-IR').format(stats.stockValue),
      unit: 'ریال',
      icon: ArrowTrendingUpIcon,
      change: 5.6,
      changeType: 'positive'
    },
    {
      name: 'مطالبات',
      value: new Intl.NumberFormat('fa-IR').format(stats.accountsReceivable),
      unit: 'ریال',
      icon: BanknotesIcon,
      change: 2.3,
      changeType: 'negative'
    }
  ];

  return (
    <div className="space-y-6">
      {/* هدر صفحه */}
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          داشبورد
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          گزارش کلی از وضعیت کسب و کار
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-primary-500 transition ease-in-out duration-150 cursor-not-allowed">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            در حال بارگذاری...
          </div>
        </div>
      ) : (
        <>
          {/* کارت‌های آماری */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stats_cards.map((card) => (
              <div
                key={card.name}
                className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
              >
                <dt>
                  <div className="absolute rounded-md bg-primary-500 p-3">
                    <card.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <p className="mr-16 truncate text-sm font-medium text-gray-500">{card.name}</p>
                </dt>
                <dd className="mr-16 flex items-baseline pb-6 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {card.value} {card.unit}
                  </p>
                  <p
                    className={classNames(
                      card.changeType === 'positive' ? 'text-green-600' : 'text-red-600',
                      'mr-2 flex items-baseline text-sm font-semibold'
                    )}
                  >
                    {card.changeType === 'positive' ? (
                      <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                    ) : (
                      <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {card.changeType === 'positive' ? 'افزایش' : 'کاهش'} به میزان
                    </span>
                    {card.change}%
                  </p>
                </dd>
              </div>
            ))}
          </div>

          {/* نمودارها */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* نمودار فروش و هزینه */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                نمودار فروش و هزینه
              </h3>
              <div className="h-80">
                <Line 
                  data={salesData} 
                  options={{
                    ...commonOptions,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: function(value) {
                            return new Intl.NumberFormat('fa-IR').format(value);
                          }
                        }
                      }
                    }
                  }} 
                />
              </div>
            </div>

            {/* نمودار خرید */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                نمودار خرید
              </h3>
              <div className="h-80">
                <Bar 
                  data={purchasesData}
                  options={{
                    ...commonOptions,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: function(value) {
                            return new Intl.NumberFormat('fa-IR').format(value);
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* نمودار وضعیت محصولات */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                وضعیت محصولات
              </h3>
              <div className="h-80">
                <Doughnut 
                  data={productsData}
                  options={commonOptions}
                />
              </div>
            </div>

            {/* نمودار وضعیت مشتریان */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                وضعیت مشتریان
              </h3>
              <div className="h-80">
                <Pie 
                  data={customersData}
                  options={commonOptions}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// تابع کمکی برای کلاس‌های پویا
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}