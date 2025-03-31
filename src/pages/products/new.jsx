/**
 * @file New Product Page
 * @description Creates a new product with full details
 * @author tehplus
 * @date 2025-03-31 14:56:56
 */

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  TagIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ScaleIcon,
  CalculatorIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function ProductNew() {
  const [formData, setFormData] = useState({
    // اطلاعات اصلی
    accountingCode: '1001',
    isAutoCode: true,
    isActive: true,
    name: '',
    code: '',
    category: '',
    unit: '',
    description: '',
    image: null,
    imagePreview: null,

    // اطلاعات قیمت‌گذاری
    buyPrice: '',
    sellPrice: '',
    minPrice: '',
    maxPrice: '',
    priceDescription: '',

    // موجودی و کنترل
    initialStock: '',
    minStock: '',
    maxStock: '',
    stockLocation: '',
    stockDescription: '',
    allowNegativeStock: false,

    // مالیات
    hasTax: true,
    taxRate: '9',
    taxType: '',
    taxCode: '',
    taxUnit: ''
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // اعتبارسنجی
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'نام محصول اجباری است';
    }
    if (formData.name.length > 200) {
      newErrors.name = 'نام محصول نمی‌تواند بیشتر از 200 کاراکتر باشد';
    }
    if (!formData.unit) {
      newErrors.unit = 'واحد محصول اجباری است';
    }
    if (formData.code.length > 100) {
      newErrors.code = 'کد محصول نمی‌تواند بیشتر از 100 کاراکتر باشد';
    }
    if (formData.description.length > 1000) {
      newErrors.description = 'توضیحات نمی‌تواند بیشتر از 1000 کاراکتر باشد';
    }
    if (formData.priceDescription.length > 500) {
      newErrors.priceDescription = 'توضیحات قیمت نمی‌تواند بیشتر از 500 کاراکتر باشد';
    }
    if (formData.stockDescription.length > 500) {
      newErrors.stockDescription = 'توضیحات موجودی نمی‌تواند بیشتر از 500 کاراکتر باشد';
    }
    if (formData.taxCode && formData.taxCode.length !== 13) {
      newErrors.taxCode = 'کد مالیاتی باید 13 رقم باشد';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('لطفاً خطاهای فرم را برطرف کنید');
      return;
    }

    try {
      // ارسال اطلاعات به سرور
      toast.success('محصول جدید با موفقیت ایجاد شد');
    } catch (error) {
      toast.error('خطا در ثبت اطلاعات');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('حجم تصویر نباید بیشتر از 2 مگابایت باشد');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          محصول جدید
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        {/* کد حسابداری */}
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <label htmlFor="accountingCode" className="block text-sm font-medium text-gray-700">
              کد حسابداری
            </label>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 ml-2">
                {formData.isAutoCode ? 'اتوماتیک' : 'دستی'}
              </span>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isAutoCode: !formData.isAutoCode })}
                className={`${
                  formData.isAutoCode ? 'bg-primary-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    formData.isAutoCode ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>
          </div>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <TagIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="accountingCode"
              value={formData.accountingCode}
              readOnly
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50"
              dir="ltr"
            />
          </div>
        </div>

        {/* وضعیت فعال */}
        <div className="sm:col-span-2">
          <div className="relative flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
            </div>
            <div className="mr-3 text-sm">
              <label htmlFor="isActive" className="font-medium text-gray-700">
                فعال
              </label>
              <p className="text-gray-500">این محصول در سیستم فعال باشد</p>
            </div>
          </div>
        </div>

        {/* نام محصول */}
        <div className="sm:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            نام محصول <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <DocumentTextIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              maxLength={200}
              required
              className={`block w-full rounded-md pr-10 sm:text-sm ${
                errors.name
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
              }`}
            />
          </div>
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* کد محصول */}
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            کد محصول
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <TagIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              maxLength={100}
              className={`block w-full rounded-md pr-10 sm:text-sm ${
                errors.code
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
              }`}
              dir="ltr"
            />
          </div>
          {errors.code && (
            <p className="mt-2 text-sm text-red-600">{errors.code}</p>
          )}
        </div>

        {/* واحد */}
        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
            واحد <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <select
              id="unit"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              required
              className={`block w-full rounded-md sm:text-sm ${
                errors.unit
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
              }`}
            >
              <option value="">انتخاب کنید</option>
              <option value="عدد">عدد</option>
              <option value="متر">متر</option>
              <option value="کیلوگرم">کیلوگرم</option>
              <option value="لیتر">لیتر</option>
            </select>
          </div>
          {errors.unit && (
            <p className="mt-2 text-sm text-red-600">{errors.unit}</p>
          )}
        </div>

        {/* دسته‌بندی */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            دسته‌بندی
          </label>
          <div className="mt-1">
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">انتخاب کنید</option>
              <option value="1">دسته 1</option>
              <option value="2">دسته 2</option>
              <option value="3">دسته 3</option>
            </select>
          </div>
        </div>

        {/* توضیحات */}
        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            توضیحات
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              maxLength={1000}
              className={`block w-full rounded-md sm:text-sm ${
                errors.description
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
              }`}
            />
          </div>
          {errors.description && (
            <p className="mt-2 text-sm text-red-600">{errors.description}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            حداکثر 1000 کاراکتر
          </p>
        </div>

        {/* تصویر */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            تصویر محصول
          </label>
          <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            {formData.imagePreview ? (
              <div className="relative">
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 inline-flex items-center rounded-full border border-gray-200 bg-white p-1 text-gray-400 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                <div className="mt-4 flex flex-col items-center text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="image-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500"
                  >
                    <span>آپلود تصویر</span>
                    <input
                      id="image-upload"
                      name="image-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG تا 2MB</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* بخش قیمت‌گذاری */}
        <div className="sm:col-span-2 pt-6 border-t border-gray-900/10">
          <h3 className="text-base font-semibold leading-7 text-gray-900">قیمت‌گذاری</h3>
        </div>

        {/* قیمت خرید */}
        <div>
          <label htmlFor="buyPrice" className="block text-sm font-medium text-gray-700">
            قیمت خرید
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="buyPrice"
              value={formData.buyPrice}
              onChange={(e) => setFormData({ ...formData, buyPrice: e.target.value })}
              min="0"
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              dir="ltr"
            />
          </div>
        </div>

        {/* قیمت فروش */}
        <div>
          <label htmlFor="sellPrice" className="block text-sm font-medium text-gray-700">
            قیمت فروش
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="sellPrice"
              value={formData.sellPrice}
              onChange={(e) => setFormData({ ...formData, sellPrice: e.target.value })}
              min="0"
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              dir="ltr"
            />
          </div>
        </div>

        {/* حداقل قیمت فروش */}
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
            حداقل قیمت فروش
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="minPrice"
              value={formData.minPrice}
              onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
              min="0"
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              dir="ltr"
            />
          </div>
        </div>

        {/* حداکثر قیمت فروش */}
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
            حداکثر قیمت فروش
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="maxPrice"
              value={formData.maxPrice}
              onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
              min="0"
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              dir="ltr"
            />
          </div>
        </div>

        {/* توضیحات قیمت */}
        <div className="sm:col-span-2">
          <label htmlFor="priceDescription" className="block text-sm font-medium text-gray-700">
            توضیحات قیمت‌گذاری
          </label>
          <div className="mt-1">
            <textarea
              id="priceDescription"
              value={formData.priceDescription}
              onChange={(e) => setFormData({ ...formData, priceDescription: e.target.value })}
              rows={2}
              maxLength={500}
              className={`block w-full rounded-md sm:text-sm ${
                errors.priceDescription
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
              }`}
            />
          </div>
          {errors.priceDescription && (
            <p className="mt-2 text-sm text-red-600">{errors.priceDescription}</p>
          )}
        </div>

        {/* بخش موجودی و کنترل */}
        <div className="sm:col-span-2 pt-6 border-t border-gray-900/10">
          <h3 className="text-base font-semibold leading-7 text-gray-900">موجودی و کنترل</h3>
        </div>

        {/* موجودی اولیه */}
        <div>
          <label htmlFor="initialStock" className="block text-sm font-medium text-gray-700">
            موجودی اولیه
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ScaleIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="initialStock"
              value={formData.initialStock}
              onChange={(e) => setFormData({ ...formData, initialStock: e.target.value })}
              min="0"
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              dir="ltr"
            />
          </div>
        </div>

        {/* حداقل موجودی */}
        <div>
          <label htmlFor="minStock" className="block text-sm font-medium text-gray-700">
            حداقل موجودی
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ScaleIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="minStock"
              value={formData.minStock}
              onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
              min="0"
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              dir="ltr"
            />
          </div>
        </div>

        {/* حداکثر موجودی */}
        <div>
          <label htmlFor="maxStock" className="block text-sm font-medium text-gray-700">
            حداکثر موجودی
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ScaleIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="stock"
              min="0"
              step="1"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              dir="ltr"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            تعداد موجودی اولیه محصول
          </p>
        </div>

        {/* قیمت خرید */}
        <div className="sm:col-span-2">
          <label htmlFor="buyPrice" className="block text-sm font-medium text-gray-700">
            قیمت خرید
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="buyPrice"
              min="0"
              value={formData.buyPrice}
              onChange={(e) => setFormData({ ...formData, buyPrice: e.target.value })}
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              dir="ltr"
            />
          </div>
        </div>

        {/* قیمت فروش */}
        <div className="sm:col-span-2">
          <label htmlFor="sellPrice" className="block text-sm font-medium text-gray-700">
            قیمت فروش <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="sellPrice"
              min="0"
              value={formData.sellPrice}
              onChange={(e) => setFormData({ ...formData, sellPrice: e.target.value })}
              required
              className={`block w-full rounded-md pr-10 sm:text-sm ${
                errors.sellPrice
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
              }`}
              dir="ltr"
            />
          </div>
          {errors.sellPrice && (
            <p className="mt-2 text-sm text-red-600">{errors.sellPrice}</p>
          )}
        </div>

        {/* حداقل موجودی */}
        <div className="sm:col-span-2">
          <label htmlFor="minStock" className="block text-sm font-medium text-gray-700">
            حداقل موجودی
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ScaleIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="minStock"
              min="0"
              value={formData.minStock}
              onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              dir="ltr"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            هشدار در صورت کمتر شدن موجودی از این مقدار
          </p>
        </div>

        {/* توضیحات */}
        <div className="sm:col-span-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            توضیحات
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            توضیحات تکمیلی درباره محصول
          </p>
        </div>

        {/* بخش مالیات */}
        <div className="sm:col-span-6">
          <div className="relative flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="hasTax"
                type="checkbox"
                checked={formData.hasTax}
                onChange={(e) => setFormData({ ...formData, hasTax: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
            </div>
            <div className="mr-3 text-sm">
              <label htmlFor="hasTax" className="font-medium text-gray-700">
                محاسبه مالیات
              </label>
              <p className="text-gray-500">مالیات برای این محصول محاسبه شود</p>
            </div>
          </div>
        </div>

        {formData.hasTax && (
          <>
            {/* نرخ مالیات */}
            <div className="sm:col-span-2">
              <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700">
                نرخ مالیات (٪)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <CalculatorIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="taxRate"
                  min="0"
                  max="100"
                  value={formData.taxRate}
                  onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                  className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  dir="ltr"
                />
              </div>
            </div>

            {/* کد مالیاتی */}
            <div className="sm:col-span-2">
              <label htmlFor="taxCode" className="block text-sm font-medium text-gray-700">
                کد مالیاتی
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="taxCode"
                  value={formData.taxCode}
                  onChange={(e) => setFormData({ ...formData, taxCode: e.target.value })}
                  maxLength={13}
                  className={`block w-full rounded-md sm:text-sm ${
                    errors.taxCode
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                  }`}
                  dir="ltr"
                />
              </div>
              {errors.taxCode && (
                <p className="mt-2 text-sm text-red-600">{errors.taxCode}</p>
              )}
            </div>

            {/* واحد مالیاتی */}
            <div className="sm:col-span-2">
              <label htmlFor="taxUnit" className="block text-sm font-medium text-gray-700">
                واحد مالیاتی
              </label>
              <div className="mt-1">
                <select
                  id="taxUnit"
                  value={formData.taxUnit}
                  onChange={(e) => setFormData({ ...formData, taxUnit: e.target.value })}
                  className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="1">واحد 1</option>
                  <option value="2">واحد 2</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>

      {/* دکمه‌های فرم */}
      <div className="flex justify-end space-x-3 space-x-reverse">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          ذخیره
        </button>
        <button
          type="button"
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          انصراف
        </button>
      </div>
    </form>
  );
}