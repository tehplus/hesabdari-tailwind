/**
 * @file New Product Form Page
 * @description Create new product with details
 * @author tehplus
 * @date 2025-03-31 15:45:56
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  PhotoIcon,
  ArrowUpTrayIcon,
  CurrencyDollarIcon,
  ScaleIcon,
  CalculatorIcon,
  PlusIcon,
  MinusIcon,
  TagIcon,
  QrCodeIcon,
  BuildingOfficeIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

export default function ProductNew() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: '',
    description: '',
    unit: '',
    barcode: '',
    buyPrice: '',
    sellPrice: '',
    stock: '0',
    minStock: '0',
    hasTax: false,
    taxRate: '9',
    taxCode: '',
    isActive: true,
    image: null,
    additionalProperties: []
  });

  const categories = [
    { id: '1', name: 'دسته 1' },
    { id: '2', name: 'دسته 2' },
    { id: '3', name: 'دسته 3' }
  ];

  const units = [
    { id: 'piece', name: 'عدد' },
    { id: 'box', name: 'جعبه' },
    { id: 'kg', name: 'کیلوگرم' },
    { id: 'meter', name: 'متر' },
    { id: 'liter', name: 'لیتر' }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProperty = () => {
    setFormData(prev => ({
      ...prev,
      additionalProperties: [
        ...prev.additionalProperties,
        { key: '', value: '' }
      ]
    }));
  };

  const handleRemoveProperty = (index) => {
    setFormData(prev => ({
      ...prev,
      additionalProperties: prev.additionalProperties.filter((_, i) => i !== index)
    }));
  };

  const handlePropertyChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      additionalProperties: prev.additionalProperties.map((prop, i) => {
        if (i === index) {
          return { ...prop, [field]: value };
        }
        return prop;
      })
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code) {
      newErrors.code = 'کد محصول اجباری است';
    }

    if (!formData.name) {
      newErrors.name = 'نام محصول اجباری است';
    }

    if (!formData.category) {
      newErrors.category = 'دسته‌بندی اجباری است';
    }

    if (!formData.unit) {
      newErrors.unit = 'واحد اجباری است';
    }

    if (!formData.sellPrice) {
      newErrors.sellPrice = 'قیمت فروش اجباری است';
    } else if (Number(formData.sellPrice) <= 0) {
      newErrors.sellPrice = 'قیمت فروش باید بزرگتر از صفر باشد';
    }

    if (formData.barcode && formData.barcode.length !== 13) {
      newErrors.barcode = 'بارکد باید 13 رقم باشد';
    }

    if (formData.hasTax) {
      if (!formData.taxCode) {
        newErrors.taxCode = 'کد مالیاتی اجباری است';
      } else if (formData.taxCode.length !== 13) {
        newErrors.taxCode = 'کد مالیاتی باید 13 رقم باشد';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('لطفاً خطاهای فرم را برطرف کنید');
      return;
    }

    try {
      setLoading(true);

      // در اینجا API call برای ذخیره محصول

      toast.success('محصول با موفقیت ثبت شد');
      navigate('/products');
    } catch (error) {
      toast.error('خطا در ثبت محصول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          محصول جدید
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          اطلاعات محصول جدید را وارد کنید
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            تصویر محصول
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="تصویر محصول"
                  className="mx-auto h-32 w-32 object-cover rounded-md"
                />
              ) : (
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-400"
                  aria-hidden="true"
                />
              )}
              <div className="flex flex-col items-center text-sm text-gray-600">
                <label
                  htmlFor="image-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500"
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
                <p className="pl-1">یا بکشید و رها کنید</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG تا حجم 5MB
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  کد محصول <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    required
                    className={`block w-full rounded-md sm:text-sm ${
                      errors.code
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                  />
                </div>
                {errors.code && (
                  <p className="mt-2 text-sm text-red-600">{errors.code}</p>
                )}
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  نام محصول <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className={`block w-full rounded-md sm:text-sm ${
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

              <div className="sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  دسته‌بندی <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className={`block w-full rounded-md sm:text-sm ${
                      errors.category
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                  >
                    <option value="">انتخاب کنید</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div className="sm:col-span-3">
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
                    {units.map(unit => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.unit && (
                  <p className="mt-2 text-sm text-red-600">{errors.unit}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">
                  بارکد
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <QrCodeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="barcode"
                    value={formData.barcode}
                    onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                    maxLength={13}
                    className={`block w-full rounded-md pr-10 sm:text-sm ${
                      errors.barcode
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                    dir="ltr"
                  />
                </div>
                {errors.barcode && (
                  <p className="mt-2 text-sm text-red-600">{errors.barcode}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="buyPrice" className="block text-sm font-medium text-gray-700">
                  قیمت خرید
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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

              <div className="sm:col-span-2">
                <label htmlFor="sellPrice" className="block text-sm font-medium text-gray-700">
                  قیمت فروش <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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

              <div className="sm:col-span-2">
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                  موجودی
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="minStock" className="block text-sm font-medium text-gray-700">
                  حداقل موجودی
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
              </div>

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
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
          </div>
        </div>

        {/* ویژگی‌های اضافی */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  ویژگی‌های اضافی
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  ویژگی‌های دلخواه برای این محصول
                </p>
              </div>

              <div className="space-y-4">
                {formData.additionalProperties.map((property, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={property.key}
                        onChange={(e) => handlePropertyChange(index, 'key', e.target.value)}
                        placeholder="نام ویژگی"
                        className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={property.value}
                        onChange={(e) => handlePropertyChange(index, 'value', e.target.value)}
                        placeholder="مقدار ویژگی"
                        className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveProperty(index)}
                      className="rounded-md bg-red-50 p-2 text-red-600 hover:bg-red-100"
                    >
                      <MinusIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddProperty}
                  className="inline-flex items-center rounded-md bg-primary-50 px-3 py-2 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-100"
                >
                  <PlusIcon className="ml-1.5 -mr-0.5 h-5 w-5" />
                  افزودن ویژگی
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* دکمه‌های فرم */}
        <div className="flex justify-end space-x-3 space-x-reverse">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'در حال ذخیره...' : 'ذخیره'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}
                                  
                 