/**
 * @file Print Product Barcode Page
 * @description Print barcode labels for a single product with options
 * @author tehplus
 * @date 2025-03-31 14:40:17
 */

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  MagnifyingGlassIcon,
  PrinterIcon,
  BarcodeIcon,
  ViewColumnsIcon,
  ViewfinderCircleIcon
} from '@heroicons/react/24/outline';

export default function PrintBarcode() {
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [printSettings, setPrintSettings] = useState({
    count: 1,
    startPosition: 1,
    showPrice: true,
    showName: true,
    template: '1',
    paperSize: 'A4',
  });

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
    if (searchQuery.length >= 2) {
      searchProducts();
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const searchProducts = async () => {
    try {
      // در اینجا API call برای جستجوی محصولات
      // فعلاً داده تستی قرار می‌دهیم
      const mockResults = [
        { id: 1, code: '1001', name: 'محصول تست 1', barcode: '1234567890', price: 100000 },
        { id: 2, code: '1002', name: 'محصول تست 2', barcode: '2345678901', price: 150000 },
      ];
      setSearchResults(mockResults);
      setShowSearchResults(true);
    } catch (error) {
      toast.error('خطا در جستجوی محصولات');
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSearchQuery(`${product.code} - ${product.name}`);
    setShowSearchResults(false);
  };

  const handleSettingChange = (name, value) => {
    setPrintSettings(prev => ({ ...prev, [name]: value }));
  };

  const handlePrint = () => {
    if (!selectedProduct) {
      toast.error('لطفاً یک محصول را انتخاب کنید');
      return;
    }

    if (printSettings.count < 1) {
      toast.error('تعداد چاپ باید حداقل 1 باشد');
      return;
    }

    try {
      // در اینجا منطق چاپ بارکد
      toast.success('بارکد با موفقیت به صف چاپ اضافه شد');
    } catch (error) {
      toast.error('خطا در چاپ بارکد');
    }
  };

  return (
    <div className="space-y-6">
      {/* هدر صفحه */}
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          چاپ بارکد
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          در این بخش می‌توانید برای یک محصول، برچسب بارکد چاپ کنید.
        </p>
      </div>

      {/* فرم چاپ */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* جستجو و انتخاب محصول */}
            <div className="sm:col-span-4">
              <label htmlFor="product-search" className="block text-sm font-medium text-gray-700">
                جستجوی محصول <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="product-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="نام یا کد محصول را وارد کنید..."
                />
                {/* نتایج جستجو */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                    <ul className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {searchResults.map((product) => (
                        <li
                          key={product.id}
                          className="relative cursor-pointer select-none py-2 px-3 hover:bg-gray-100"
                          onClick={() => handleProductSelect(product)}
                        >
                          <div className="flex items-center">
                            <span className="font-normal block truncate">
                              {product.code} - {product.name}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* تعداد چاپ */}
            <div className="sm:col-span-2">
              <label htmlFor="print-count" className="block text-sm font-medium text-gray-700">
                تعداد چاپ
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="print-count"
                  min="1"
                  value={printSettings.count}
                  onChange={(e) => handleSettingChange('count', parseInt(e.target.value))}
                  className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
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

            {/* گزینه‌های نمایش */}
            <div className="sm:col-span-4">
              <div className="space-y-4">
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
                    <p className="text-gray-500">قیمت محصول روی برچسب نمایش داده شود</p>
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
                    <p className="text-gray-500">نام محصول روی برچسب نمایش داده شود</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* پیش‌نمایش */}
        {selectedProduct && (
          <div className="px-4 py-6 sm:p-8 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900">پیش‌نمایش</h4>
            <div className="mt-4 p-4 border border-gray-300 rounded-md">
              <div className="flex flex-col items-center space-y-2">
                {printSettings.showName && (
                  <span className="text-sm font-medium">{selectedProduct.name}</span>
                )}
                <BarcodeIcon className="h-8 w-32 text-gray-800" />
                <span className="text-xs font-mono">{selectedProduct.barcode}</span>
                {printSettings.showPrice && (
                  <span className="text-sm">
                    {new Intl.NumberFormat('fa-IR').format(selectedProduct.price)} ریال
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* دکمه‌های عملیات */}
        <div className="px-4 py-3 bg-gray-50 text-left sm:px-6 rounded-b-xl">
          <button
            type="button"
            onClick={handlePrint}
            disabled={!selectedProduct}
            className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <PrinterIcon className="ml-2 -mr-0.5 h-5 w-5" />
            چاپ بارکد
          </button>
        </div>
      </div>
    </div>
  );
}