/**
 * @file New Person Form Page
 * @description Create new person with details
 * @date 2025-03-31 15:45:56
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { PhotoIcon, ArrowUpTrayIcon, CurrencyDollarIcon, ScaleIcon, CalculatorIcon, PlusIcon, MinusIcon, TagIcon, QrCodeIcon, BuildingOfficeIcon, BanknotesIcon } from '@heroicons/react/24/outline';

export default function PersonNew() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
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
      additionalProperties: [...prev.additionalProperties, { key: '', value: '' }]
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
      navigate('/persons');
    } catch (error) {
      toast.error('خطا در ثبت محصول');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          ایجاد محصول جدید
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              کد محصول
            </label>
            <input
              type="text"
              name="code"
              id="code"
              value={formData.code}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
          </div>

          <div className="col-span-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              نام محصول
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="col-span-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              دسته‌بندی
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">انتخاب دسته‌بندی</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>

          <div className="col-span-1">
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
              واحد
            </label>
            <select
              name="unit"
              id="unit"
              value={formData.unit}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">انتخاب واحد</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
            {errors.unit && <p className="mt-1 text-sm text-red-600">{errors.unit}</p>}
          </div>

          <div className="col-span-1">
            <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">
              بارکد
            </label>
            <input
              type="text"
              name="barcode"
              id="barcode"
              value={formData.barcode}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.barcode && <p className="mt-1 text-sm text-red-600">{errors.barcode}</p>}
          </div>

          <div className="col-span-1">
            <label htmlFor="buyPrice" className="block text-sm font-medium text-gray-700">
              قیمت خرید
            </label>
            <input
              type="text"
              name="buyPrice"
              id="buyPrice"
              value={formData.buyPrice}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="sellPrice" className="block text-sm font-medium text-gray-700">
              قیمت فروش
            </label>
            <input
              type="text"
              name="sellPrice"
              id="sellPrice"
              value={formData.sellPrice}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.sellPrice && <p className="mt-1 text-sm text-red-600">{errors.sellPrice}</p>}
          </div>

          <div className="col-span-1">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              موجودی
            </label>
            <input
              type="text"
              name="stock"
              id="stock"
              value={formData.stock}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="minStock" className="block text-sm font-medium text-gray-700">
              حداقل موجودی
            </label>
            <input
              type="text"
              name="minStock"
              id="minStock"
              value={formData.minStock}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              name="hasTax"
              id="hasTax"
              checked={formData.hasTax}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="hasTax" className="ml-2 block text-sm font-medium text-gray-700">
              شامل مالیات
            </label>
          </div>

          {formData.hasTax && (
            <>
              <div className="col-span-1">
                <label htmlFor="taxCode" className="block text-sm font-medium text-gray-700">
                  کد مالیاتی
                </label>
                <input
                  type="text"
                  name="taxCode"
                  id="taxCode"
                  value={formData.taxCode}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.taxCode && <p className="mt-1 text-sm text-red-600">{errors.taxCode}</p>}
              </div>

              <div className="col-span-1">
                <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700">
                  نرخ مالیات (%)
                </label>
                <input
                  type="text"
                  name="taxRate"
                  id="taxRate"
                  value={formData.taxRate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-5 mt-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            ویژگی‌های اضافی
          </h3>
          <button
            type="button"
            onClick={handleAddProperty}
            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            افزودن ویژگی
          </button>
        </div>

        {formData.additionalProperties.length > 0 && (
          <div className="mt-5 space-y-6">
            {formData.additionalProperties.map((property, index) => (
              <div key={index} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-1">
                  <label htmlFor={`property-key-${index}`} className="block text-sm font-medium text-gray-700">
                    کلید
                  </label>
                  <input
                    type="text"
                    name={`property-key-${index}`}
                    id={`property-key-${index}`}
                    value={property.key}
                    onChange={(e) => handlePropertyChange(index, 'key', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-1">
                  <label htmlFor={`property-value-${index}`} className="block text-sm font-medium text-gray-700">
                    مقدار
                  </label>
                  <input
                    type="text"
                    name={`property-value-${index}`}
                    id={`property-value-${index}`}
                    value={property.value}
                    onChange={(e) => handlePropertyChange(index, 'value', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-1 flex items-end">
                  <button
                    type="button"
                    onClick={() => handleRemoveProperty(index)}
                    className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <MinusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'در حال ثبت...' : 'ثبت محصول'}
          </button>
        </div>
      </form>
    </div>
  );
}