/**
 * @file Products List Page
 * @description List and manage products with filters and actions
 * @author tehplus
 * @date 2025-03-31 15:43:05
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  PencilSquareIcon,
  TrashIcon,
  PhotoIcon,
  BanknotesIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  TagIcon,
  QrCodeIcon,
  CodeBracketSquareIcon
} from '@heroicons/react/24/outline';

export default function ProductsList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    searchTerm: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'code',
    direction: 'asc'
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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
          description: 'توضیحات تست برای محصول 1',
          unit: 'عدد',
          barcode: '1234567890',
          buyPrice: 80000,
          sellPrice: 100000,
          stock: 50,
          minStock: 10,
          image: 'https://via.placeholder.com/150',
          isActive: true,
          hasTax: true,
          taxRate: 9,
          taxCode: '1234567890123'
        },
        {
          id: 2,
          code: '1002',
          name: 'محصول تست 2',
          category: 'دسته 2',
          description: 'توضیحات تست برای محصول 2',
          unit: 'عدد',
          barcode: '2345678901',
          buyPrice: 120000,
          sellPrice: 150000,
          stock: 30,
          minStock: 5,
          image: 'https://via.placeholder.com/150',
          isActive: true,
          hasTax: true,
          taxRate: 9,
          taxCode: '2345678901234'
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

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    });
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

  const handleDeleteSelected = async () => {
    if (selectedProducts.length === 0) {
      toast.error('هیچ محصولی انتخاب نشده است');
      return;
    }

    if (!window.confirm('آیا از حذف محصولات انتخاب شده اطمینان دارید؟')) {
      return;
    }

    try {
      // در اینجا API call برای حذف محصولات
      toast.success('محصولات انتخاب شده با موفقیت حذف شدند');
      await fetchProducts();
      setSelectedProducts([]);
      setSelectAll(false);
    } catch (error) {
      toast.error('خطا در حذف محصولات');
    }
  };

  const handleExport = (format) => {
    try {
      // در اینجا منطق خروجی گرفتن
      toast.success(`لیست محصولات با فرمت ${format} با موفقیت دانلود شد`);
    } catch (error) {
      toast.error('خطا در دریافت خروجی');
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const filteredProducts = sortedProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      product.barcode.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesMinPrice = !filters.minPrice || product.sellPrice >= Number(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || product.sellPrice <= Number(filters.maxPrice);
    const matchesStock = !filters.inStock || product.stock > 0;

    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesStock;
  });

  return (
    <div className="space-y-6">
      {/* هدر صفحه */}
      <div className="pb-5 border-b border-gray-200">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              لیست محصولات
            </h3>
            <p className="mt-2 max-w-4xl text-sm text-gray-500">
              لیست کامل محصولات و مدیریت آن‌ها
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:flex-none">
            <Link
              to="/products/new"
              className="inline-flex items-center justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              <PlusIcon className="ml-2 -mr-0.5 h-5 w-5" />
              محصول جدید
            </Link>
          </div>
        </div>
      </div>

      {/* فیلترها و جستجو */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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

            <div className="sm:col-span-1">
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

            <div className="sm:col-span-1">
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                placeholder="حداقل قیمت"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="sm:col-span-1">
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                placeholder="حداکثر قیمت"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="sm:col-span-1 flex items-center">
              <input
                type="checkbox"
                id="inStock"
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="inStock" className="mr-2 block text-sm font-medium text-gray-700">
                فقط موجود
              </label>
            </div>
          </div>

          {selectedProducts.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-700">
                <span>{selectedProducts.length} محصول انتخاب شده</span>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <button
                  type="button"
                  onClick={handleDeleteSelected}
                  className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                >
                  <TrashIcon className="ml-2 -mr-0.5 h-5 w-5" />
                  حذف انتخاب شده
                </button>
              </div>
            </div>
          )}
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
                <th
                  scope="col"
                  className="py-3.5 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 cursor-pointer"
                  onClick={() => handleSort('code')}
                >
                  <div className="group inline-flex">
                    کد
                    <span className="mr-2 flex-none rounded text-gray-400">
                      {sortConfig.key === 'code' ? (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUpIcon className="h-5 w-5" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5" />
                        )
                      ) : (
                        <ChevronUpIcon className="h-5 w-5 invisible group-hover:visible" />
                      )}
                    </span>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                  تصویر
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="group inline-flex">
                    نام
                    <span className="mr-2 flex-none rounded text-gray-400">
                      {sortConfig.key === 'name' ? (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUpIcon className="h-5 w-5" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5" />
                        )
                      ) : (
                        <ChevronUpIcon className="h-5 w-5 invisible group-hover:visible" />
                      )}
                    </span>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                  دسته‌بندی
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                  واحد
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 cursor-pointer"
                  onClick={() => handleSort('sellPrice')}
                >
                  <div className="group inline-flex">
                    قیمت فروش
                    <span className="mr-2 flex-none rounded text-gray-400">
                      {sortConfig.key === 'sellPrice' ? (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUpIcon className="h-5 w-5" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5" />
                        )
                      ) : (
                        <ChevronUpIcon className="h-5 w-5 invisible group-hover:visible" />
                      )}
                    </span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 cursor-pointer"
                  onClick={() => handleSort('stock')}
                >
                  <div className="group inline-flex">
                    موجودی
                    <span className="mr-2 flex-none rounded text-gray-400">
                      {sortConfig.key === 'stock' ? (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUpIcon className="h-5 w-5" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5" />
                        )
                      ) : (
                        <ChevronUpIcon className="h-5 w-5 invisible group-hover:visible" />
                      )}
                    </span>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                  وضعیت
                </th>
                <th scope="col" className="relative py-3.5 pl-4 sm:pl-6">
                  <span className="sr-only">عملیات</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center py-4">
                    در حال بارگذاری...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-4 text-gray-500">
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
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
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
                      {new Intl.NumberFormat('fa-IR').format(product.stock)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          product.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.isActive ? 'فعال' : 'غیرفعال'}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-4 text-right text-sm font-medium sm:pl-6">
                      <button
                        type="button"
                        onClick={() => {/* ویرایش */}}
                        className="text-primary-600 hover:text-primary-900 ml-4"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {/* به‌روزرسانی قیمت */}}
                        className="text-primary-600 hover:text-primary-900 ml-4"
                      >
                        <BanknotesIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {/* چاپ بارکد */}}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <QrCodeIcon className="h-5 w-5" />
                      </button>
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