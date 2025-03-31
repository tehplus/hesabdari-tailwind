/**
 * @file Print Multiple Products Barcodes Page
 * @description Print barcode labels for multiple products at once
 * @author tehplus
 * @date 2025-03-31 14:45:34
 */

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  MagnifyingGlassIcon,
  PrinterIcon,
  BarcodeIcon,
  ViewColumnsIcon,
  ViewfinderCircleIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';

export default function PrintBarcodes() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    searchTerm: '',
  });
  const [printSettings, setPrintSettings] = useState({
    template: '1',
    paperSize: 'A4',
    showPrice: true,
    showName: true,
    startPosition: 1,
  });
  const [selectAll, setSelectAll] = useState(false);

  const templates = [
    { id: '1', name: 'قالب استاندارد', width: 50, height: 30 },
    { id: '2', name: 'قالب کوچک', width: 35, height: 25 },
    { id: '3', name: 'قالب بزرگ', width: 70, height: 40 },
  ];

  const paperSizes = [
    { id: 'A4', name: 'A4 (210×297 میلی‌متر)' },
    { id: 'A5', name: 'A5 (148×210 میلی‌متر)' },
    { id: 'A6', name: 'A6 (105×148 میلی‌متر)' },
  ];

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
          barcode: '1234567890', 
          price: 100000,
          category: 'دسته 1',
          printCount: 1
        },
        { 
          id: 2, 
          code: '1002', 
          name: 'محصول تست 2', 
          barcode: '2345678901', 
          price: 150000,
          category: 'دسته 2',
          printCount: 1
        },
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

  const handleSettingChange = (name, value) => {
    setPrintSettings(prev => ({ ...prev, [name]: value }));
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

  const handlePrintCountChange = (productId, value) => {
    setProducts(prev => prev.map(product => {
      if (product.id === productId) {
        return { ...product, printCount: Math.max(1, parseInt(value) || 1) };
      }
      return product;
    }));
  };

  const handlePrint = () => {
    if (selectedProducts.length === 0) {
      toast.error('لطفاً حداقل یک محصول را انتخاب کنید');
      return;
    }

    const totalLabels = products
      .filter(p => selectedProducts.includes(p.id))
      .reduce((sum, p) => sum + p.printCount, 0);

    if (totalLabels === 0) {
      toast.error('تعداد برچسب‌های چاپی باید بیشتر از صفر باشد');
      return;
    }

    try {
      // در اینجا منطق چاپ بارکدها
      toast.success('بارکدها با موفقیت به صف چاپ اضافه شدند');
    } catch (error) {
      toast.error('خطا در چاپ بارکدها');
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
          چاپ گروهی بارکد
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          در این بخش می‌توانید برای چندین محصول به صورت همزمان، برچسب بارکد چاپ کنید.
        </p>
      </div>

      {/* تنظیمات چاپ */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* قالب چاپ */}
            <div className="sm:col-span-2">
              <label htmlFor="print-template" className="block text-sm font-medium text-gray-700">
                قالب چاپ
              </label>
              <div className="mt-1">
                <select
                  id="print-template"
                  value={printSettings.template}
                  onChange={(e) => handleSettingChange('template', e.target.value)}
                  className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name} ({template.width}×{template.height})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* اندازه کاغذ */}
            <div className="sm:col-span-2">
              <label htmlFor="paper-size" className="block text-sm font-medium text-gray-700">
                اندازه کاغذ
              </label>
              <div className="mt-1">
                <select
                  id="paper-size"
                  value={printSettings.paperSize}
                  onChange={(e) => handleSettingChange('paperSize', e.target.value)}
                  className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  {paperSizes.map((size) => (
                    <option key={size.id} value={size.id}>
                      {size.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* شروع از موقعیت */}
            <div className="sm:col-span-2">
              <label htmlFor="start-position" className="block text-sm font-medium text-gray-700">
                شروع از موقعیت
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="start-position"
                  min="1"
                  value={printSettings.startPosition}
                  onChange={(e) => handleSettingChange('startPosition', parseInt(e.target.value))}
                  className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
            </div>

            {/* گزینه‌های نمایش */}
            <div className="sm:col-span-6">
              <div className="flex space-x-8 space-x-reverse">
                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      id="show-price"
                      checked={printSettings.showPrice}
                      onChange={(e) => handleSettingChange('showPrice', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="mr-3 text-sm">
                    <label htmlFor="show-price" className="font-medium text-gray-700">
                      نمایش قیمت
                    </label>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      id="show-name"
                      checked={printSettings.showName}
                      onChange={(e) => handleSettingChange('showName', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="mr-3 text-sm">
                    <label htmlFor="show-name" className="font-medium text-gray-700">
                      نمایش نام
                    </label>
                  </div>
                </div>
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

            {/* دکمه چاپ */}
            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={handlePrint}
                disabled={selectedProducts.length === 0}
                className="w-full inline-flex justify-center items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <PrinterIcon className="ml-2 -mr-0.5 h-5 w-5" />
                چاپ بارکدها
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
                  بارکد
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                  قیمت
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                  تعداد چاپ
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
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-mono">
                      {product.barcode}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Intl.NumberFormat('fa-IR').format(product.price)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <input
                        type="number"
                        min="1"
                        value={product.printCount}
                        onChange={(e) => handlePrintCountChange(product.id, e.target.value)}
                        className="block w-20 rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      />
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