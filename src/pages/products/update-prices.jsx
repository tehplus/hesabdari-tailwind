/**
 * @file Update Product Prices Page
 * @description Batch update prices for multiple products
 * @author tehplus
 * @date 2025-03-31 14:36:40
 */

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  CurrencyDollarIcon,
  PlusIcon,
  MinusIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline';

export default function UpdatePrices() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    searchTerm: '',
    priceRange: 'all'
  });
  const [updateMethod, setUpdateMethod] = useState('percentage'); // 'percentage' or 'fixed'
  const [updateValue, setUpdateValue] = useState('');
  const [updateType, setUpdateType] = useState('increase'); // 'increase' or 'decrease'
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // در اینجا API call برای دریافت لیست محصولات
      setLoading(false);
      // موقتاً داده تستی قرار می‌دهیم
      setProducts([
        {
          id: 1,
          code: '1001',
          name: 'محصول تست 1',
          category: 'دسته 1',
          unit: 'عدد',
          sellPrice: 100000,
          isActive: true
        },
        {
          id: 2,
          code: '1002',
          name: 'محصول تست 2',
          category: 'دسته 2',
          unit: 'عدد',
          sellPrice: 150000,
          isActive: true
        }
      ]);
    } catch (error) {
      toast.error('خطا در دریافت اطلاعات');
      setLoading(false);
    }
  };

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedProducts(products.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const calculateNewPrice = (currentPrice) => {
    const value = parseFloat(updateValue);
    if (isNaN(value) || value < 0) return currentPrice;

    if (updateMethod === 'percentage') {
      const multiplier = updateType === 'increase' ? (1 + value / 100) : (1 - value / 100);
      return Math.round(currentPrice * multiplier);
    } else {
      return updateType === 'increase' ? currentPrice + value : currentPrice - value;
    }
  };

  const handleUpdatePrices = async () => {
    if (selectedProducts.length === 0) {
      toast.error('لطفاً حداقل یک محصول را انتخاب کنید');
      return;
    }

    if (!updateValue || isNaN(parseFloat(updateValue)) || parseFloat(updateValue) < 0) {
      toast.error('لطفاً مقدار تغییر قیمت را به درستی وارد کنید');
      return;
    }

    try {
      // در اینجا API call برای به‌روزرسانی قیمت‌ها
      const updatedProducts = products.map(product => {
        if (selectedProducts.includes(product.id)) {
          return {
            ...product,
            sellPrice: calculateNewPrice(product.sellPrice)
          };
        }
        return product;
      });
      setProducts(updatedProducts);
      toast.success('قیمت‌ها با موفقیت به‌روزرسانی شد');
    } catch (error) {
      toast.error('خطا در به‌روزرسانی قیمت‌ها');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         product.code.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesCategory = !filters.category || product.category === filters.category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* هدر صفحه */}
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          به‌روزرسانی قیمت‌ها
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          در این بخش می‌توانید قیمت محصولات را به صورت گروهی تغییر دهید.
        </p>
      </div>

      {/* بخش تنظیمات تغییر قیمت */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            {/* نوع تغییر */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">نوع تغییر</label>
              <div className="mt-2 space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="increase"
                    name="updateType"
                    value="increase"
                    checked={updateType === 'increase'}
                    onChange={(e) => setUpdateType(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="increase" className="mr-3 block text-sm font-medium text-gray-700">
                    افزایش
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="decrease"
                    name="updateType"
                    value="decrease"
                    checked={updateType === 'decrease'}
                    onChange={(e) => setUpdateType(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="decrease" className="mr-3 block text-sm font-medium text-gray-700">
                    کاهش
                  </label>
                </div>
              </div>
            </div>

            {/* روش تغییر */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">روش تغییر</label>
              <div className="mt-2 space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="percentage"
                    name="updateMethod"
                    value="percentage"
                    checked={updateMethod === 'percentage'}
                    onChange={(e) => setUpdateMethod(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="percentage" className="mr-3 block text-sm font-medium text-gray-700">
                    درصدی
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="fixed"
                    name="updateMethod"
                    value="fixed"
                    checked={updateMethod === 'fixed'}
                    onChange={(e) => setUpdateMethod(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="fixed" className="mr-3 block text-sm font-medium text-gray-700">
                    مبلغ ثابت
                  </label>
                </div>
              </div>
            </div>

            {/* مقدار تغییر */}
            <div className="sm:col-span-2">
              <label htmlFor="updateValue" className="block text-sm font-medium text-gray-700">
                مقدار {updateMethod === 'percentage' ? 'درصد' : 'مبلغ'}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {updateMethod === 'percentage' ? (
                    <CalculatorIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <input
                  type="number"
                  id="updateValue"
                  value={updateValue}
                  onChange={(e) => setUpdateValue(e.target.value)}
                  className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder={updateMethod === 'percentage' ? 'مثال: 10' : 'مثال: 10000'}
                  dir="ltr"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* بخش فیلترها و جستجو */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            {/* جستجو */}
            <div className="sm:col-span-2">
              <div className="relative mt-2 rounded-md shadow-sm">
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

            {/* فیلتر دسته‌بندی */}
            <div className="sm:col-span-2">
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              >
                <option value="">همه دسته‌ها</option>
                <option value="1">دسته 1</option>
                <option value="2">دسته 2</option>
              </select>
            </div>

            {/* دکمه به‌روزرسانی */}
            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={handleUpdatePrices}
                className="w-full inline-flex justify-center items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                <ArrowPathIcon className="ml-2 -mr-0.5 h-5 w-5" />
                به‌روزرسانی قیمت‌ها
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* جدول محصولات */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                  <input
                    type="checkbox"
                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
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
                  قیمت فعلی
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                  قیمت جدید
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    در حال بارگذاری...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    موردی یافت نشد
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="relative px-7 sm:w-12 sm:px-6">
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                      />
                    </td>
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
                      {new Intl.NumberFormat('fa-IR').format(product.sellPrice)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {selectedProducts.includes(product.id) ? (
                        new Intl.NumberFormat('fa-IR').format(calculateNewPrice(product.sellPrice))
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}