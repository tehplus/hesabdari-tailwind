/**
 * @file New Service Page
 * @description Creates a new service with pricing and tax details
 * @author tehplus
 * @date 2025-03-31 14:34:26
 */

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  TagIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline';

export default function ServiceNew() {
  const [formData, setFormData] = useState({
    // اطلاعات اصلی
    accountingCode: '2001',
    isAutoCode: true,
    isActive: true,
    name: '',
    code: '',
    category: '',
    description: '',
    // اطلاعات مالی
    sellPrice: '',
    sellDescription: '',
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
      newErrors.name = 'نام خدمت اجباری است';
    }
    if (formData.name.length > 200) {
      newErrors.name = 'نام خدمت نمی‌تواند بیشتر از 200 کاراکتر باشد';
    }
    if (formData.code.length > 100) {
      newErrors.code = 'کد خدمت نمی‌تواند بیشتر از 100 کاراکتر باشد';
    }
    if (formData.description.length > 1000) {
      newErrors.description = 'توضیحات نمی‌تواند بیشتر از 1000 کاراکتر باشد';
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
      toast.success('خدمت جدید با موفقیت ایجاد شد');
    } catch (error) {
      toast.error('خطا در ثبت اطلاعات');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          خدمت جدید
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
              <p className="text-gray-500">این خدمت در سیستم فعال باشد</p>
            </div>
          </div>
        </div>

        {/* نام خدمت */}
        <div className="sm:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            نام خدمت <span className="text-red-500">*</span>
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

        {/* کد خدمت */}
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            کد خدمت
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
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              dir="ltr"
            />
          </div>
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
              className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          {errors.description && (
            <p className="mt-2 text-sm text-red-600">{errors.description}</p>
          )}
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
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              dir="ltr"
            />
          </div>
        </div>

        {/* توضیحات فروش */}
        <div>
          <label htmlFor="sellDescription" className="block text-sm font-medium text-gray-700">
            توضیحات فروش
          </label>
          <div className="mt-1">
            <textarea
              id="sellDescription"
              value={formData.sellDescription}
              onChange={(e) => setFormData({ ...formData, sellDescription: e.target.value })}
              rows={3}
              className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
        </div>

        {/* بخش مالیات */}
        <div className="sm:col-span-2">
          <div className="relative flex items-start mb-4">
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
              <p className="text-gray-500">مالیات برای این خدمت محاسبه شود</p>
            </div>
          </div>
        </div>

        {formData.hasTax && (
          <>
            {/* نرخ مالیات */}
            <div>
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
                  value={formData.taxRate}
                  onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                  className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  dir="ltr"
                />
              </div>
            </div>

            {/* نوع مالیات */}
            <div>
              <label htmlFor="taxType" className="block text-sm font-medium text-gray-700">
                نوع مالیات
              </label>
              <div className="mt-1">
                <select
                  id="taxType"
                  value={formData.taxType}
                  onChange={(e) => setFormData({ ...formData, taxType: e.target.value })}
                  className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="1">مالیات بر ارزش افزوده</option>
                  <option value="2">عوارض</option>
                </select>
              </div>
            </div>

            {/* کد مالیاتی */}
            <div>
              <label htmlFor="taxCode" className="block text-sm font-medium text-gray-700">
                کد مالیاتی
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
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
            <div>
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