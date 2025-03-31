/**
 * @file Products Price List Page
 * @description Shows and exports product prices in different formats
 * @author tehplus
 * @date 2025-03-31 14:55:00
 */

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  MagnifyingGlassIcon,
  PrinterIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  TableCellsIcon,
  QueueListIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';

export default function PriceList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    searchTerm: '',
    priceRange: 'all',
    inStock: false
  });
  const [view, setView] = useState('table'); // 'table', 'list', 'grid'

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // در اینجا API call برای دریافت لیست محصولات
      // فعلاً داده تستی قرار می‌دهیم
      const mockProducts = [
        {
          id: 1,
          code: '1001',
          name: 'محصول تست 1',
          category: 'دسته 1',
          unit: 'عدد',
          sellPrice: 100000,
          buyPrice: 80000,
          stock: 50,
          image: 'https://via.placeholder.com/150',
          isActive: true
        },
        {
          id: 2,
          code: '1002',
          name: 'محصول تست 2',
          category: 'دسته 2',
          unit: 'عدد',
          sellPrice: 150000,
          buyPrice: 120000,
          stock: 30,
          image: 'https://via.placeholder.com/150',
          isActive: true
        }
      ];
      setProducts(mockProducts);
    } catch (error) {
      toast.error('خطا در دریافت اطلاعات');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleExport = (format) => {
    try {
      // در اینجا منطق خروجی گرفتن
      toast.success(`لیست قیمت با فرمت ${format} با موفقیت دانلود شد`);
    } catch (error) {
      toast.error('خطا در دریافت خروجی');
    }
  };

  const handlePrint = () => {
    try {
      // در اینجا منطق چاپ
      toast.success('لیست قیمت به صف چاپ اضافه شد');
    } catch (error) {
      toast.error('خطا در چاپ لیست قیمت');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         product.code.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesStock = !filters.inStock || product.stock > 0;
    return matchesSearch && matchesCategory && matchesStock;
  });

  const renderTableView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6">
              کد
            </th>
            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
              نام کالا
            </th>
            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
              دسته‌بندی
            </th>
            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
              واحد
            </th>
            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
              قیمت خرید
            </th>
            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
              قیمت فروش
            </th>
            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
              موجودی
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="whitespace-nowrap py-4 pr-4 text-sm font-medium text-gray-900 sm:pr-6">
                {product.code}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {product.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {product.category}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {product.unit}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {new Intl.NumberFormat('fa-IR').format(product.buyPrice)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {new Intl.NumberFormat('fa-IR').format(product.sellPrice)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {new Intl.NumberFormat('fa-IR').format(product.stock)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderListView = () => (
    <div className="divide-y divide-gray-200">
      {filteredProducts.map((product) => (
        <div key={product.id} className="flex items-center py-4">
          <div className="flex-shrink-0 h-16 w-16">
            <img
              src={product.image}
              alt={product.name}
              className="h-16 w-16 rounded-lg object-cover"
            />
          </div>
          <div className="mr-4 flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.code}</p>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <p>{product.category}</p>
              <p>{product.unit}</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p className="text-gray-500">قیمت فروش: {new Intl.NumberFormat('fa-IR').format(product.sellPrice)}</p>
              <p className="text-gray-500">موجودی: {new Intl.NumberFormat('fa-IR').format(product.stock)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredProducts.map((product) => (
        <div key={product.id} className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200">
          <div className="aspect-w-3 aspect-h-2">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col space-y-2 p-4">
            <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.code}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{product.unit}</span>
              <span>موجودی: {new Intl.NumberFormat('fa-IR').format(product.stock)}</span>
            </div>
            <div className="mt-auto pt-4">
              <p className="text-base font-medium text-gray-900">
                {new Intl.NumberFormat('fa-IR').format(product.sellPrice)} ریال
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* هدر صفحه */}
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          لیست قیمت محصولات
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          در این بخش می‌توانید لیست قیمت محصولات را مشاهده و از آن خروجی تهیه کنید.
        </p>
      </div>

      {/* نوار ابزار */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            {/* فیلترها و جستجو */}
            <div className="flex flex-1 items-center space-x-4 space-x-reverse">
              <div className="w-full sm:w-64">
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={filters.searchTerm}
                    onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    placeholder="جستجو..."
                  />
                </div>
              </div>

              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 sm:w-48"
              >
                <option value="">همه دسته‌ها</option>
                <option value="1">دسته 1</option>
                <option value="2">دسته 2</option>
              </select>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={filters.inStock}
                  onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="inStock" className="mr-2 text-sm text-gray-700">
                  فقط موجود
                </label>
              </div>
            </div>

            {/* دکمه‌های عملیات */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setView('table')}
                  className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ${
                    view === 'table'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <TableCellsIcon className="ml-1.5 -mr-0.5 h-5 w-5" />
                  جدول
                </button>
                <button
                  type="button"
                  onClick={() => setView('list')}
                  className={`relative -mr-px inline-flex items-center px-3 py-2 text-sm font-semibold ${
                    view === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <QueueListIcon className="ml-1.5 -mr-0.5 h-5 w-5" />
                  لیست
                </button>
                <button
                  type="button"
                  onClick={() => setView('grid')}
                  className={`relative -mr-px inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ${
                    view === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Squares2X2Icon className="ml-1.5 -mr-0.5 h-5 w-5" />
                  شبکه‌ای
                </button>
              </div>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <PrinterIcon className="ml-1.5 -mr-0.5 h-5 w-5 text-gray-400" />
                چاپ
              </button>

              <div className="relative">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={() => document.getElementById('export-menu').classList.toggle('hidden')}
                >
                  <ArrowDownTrayIcon className="ml-1.5 -mr-0.5 h-5 w-5 text-gray-400" />
                  خروجی
                </button>
                <div
                  id="export-menu"
                  className="hidden absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <button
                    onClick={() => handleExport('excel')}
                    className="block w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Excel
                  </button>
                  <button
                    onClick={() => handleExport('pdf')}
                    className="block w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100"
                  >
                    PDF
                  </button>
                  <button
                    onClick={() => handleExport('csv')}
                    className="block w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100"
                  >
                    CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
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
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="mt-1 text-sm text-gray-500">موردی یافت نشد</p>
          </div>
        ) : (
          <div className="px-4 py-6 sm:px-6">
            {view === 'table' && renderTableView()}
            {view === 'list' && renderListView()}
            {view === 'grid' && renderGridView()}
          </div>
        )}
      </div>
    </div>
  );
}