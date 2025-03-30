import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { showConfirm, showSuccess } from '../../utils/notification';

const initialVendors = [
  { 
    id: 1, 
    name: 'شرکت تولیدی البرز', 
    nationalCode: '10861234567',
    economicCode: '411456789123',
    registrationNumber: '12345',
    mobile: '09123456789',
    phone: '02188776655',
    address: 'تهران، خیابان ولیعصر',
    products: 'مواد اولیه تولید',
    credit: '100,000,000',
    contractDate: '1402/01/01',
    status: 'active'
  },
  { 
    id: 2, 
    name: 'بازرگانی پارس', 
    nationalCode: '10867654321',
    economicCode: '411987654321',
    registrationNumber: '54321',
    mobile: '09187654321',
    phone: '02177889944',
    address: 'تهران، خیابان مطهری',
    products: 'قطعات یدکی',
    credit: '50,000,000',
    contractDate: '1402/02/01',
    status: 'active'
  },
];

export default function Vendors() {
  const [vendors, setVendors] = useState(initialVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentVendor, setCurrentVendor] = useState({
    name: '',
    nationalCode: '',
    economicCode: '',
    registrationNumber: '',
    mobile: '',
    phone: '',
    address: '',
    products: '',
    credit: '',
    contractDate: new Date().toISOString().split('T')[0],
    status: 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentVendor.id) {
      // ویرایش فروشنده موجود
      setVendors(vendors.map(v => 
        v.id === currentVendor.id ? { ...currentVendor } : v
      ));
      showSuccess('فروشنده با موفقیت ویرایش شد');
    } else {
      // افزودن فروشنده جدید
      setVendors([...vendors, { 
        ...currentVendor, 
        id: vendors.length + 1 
      }]);
      showSuccess('فروشنده جدید با موفقیت اضافه شد');
    }
    setShowForm(false);
    setCurrentVendor({
      name: '',
      nationalCode: '',
      economicCode: '',
      registrationNumber: '',
      mobile: '',
      phone: '',
      address: '',
      products: '',
      credit: '',
      contractDate: new Date().toISOString().split('T')[0],
      status: 'active'
    });
  };

  const handleEdit = (vendor) => {
    setCurrentVendor(vendor);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = await showConfirm('حذف فروشنده', 'آیا از حذف این فروشنده اطمینان دارید؟');
    if (confirmed) {
      setVendors(vendors.filter(v => v.id !== id));
      showSuccess('فروشنده مورد نظر با موفقیت حذف شد');
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'فعال';
      case 'inactive':
        return 'غیرفعال';
      default:
        return status;
    }
  };

  const filteredVendors = vendors.filter(vendor => 
    vendor.name.includes(searchTerm) || 
    vendor.nationalCode.includes(searchTerm) ||
    vendor.mobile.includes(searchTerm) ||
    vendor.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">لیست فروشندگان</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:mr-16 sm:flex-none">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="ml-2 h-4 w-4" />
            فروشنده جدید
          </button>
        </div>
      </div>

      {/* فرم افزودن/ویرایش فروشنده */}
      {showForm && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-right shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    نام شرکت
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={currentVendor.name}
                    onChange={(e) => setCurrentVendor({ ...currentVendor, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="nationalCode" className="block text-sm font-medium text-gray-700">
                    شناسه ملی
                  </label>
                  <input
                    type="text"
                    id="nationalCode"
                    value={currentVendor.nationalCode}
                    onChange={(e) => setCurrentVendor({ ...currentVendor, nationalCode: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="economicCode" className="block text-sm font-medium text-gray-700">
                    کد اقتصادی
                  </label>
                  <input
                    type="text"
                    id="economicCode"
                    value={currentVendor.economicCode}
                    onChange={(e) => setCurrentVendor({ ...currentVendor, economicCode: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
                    شماره ثبت
                  </label>
                  <input
                    type="text"
                    id="registrationNumber"
                    value={currentVendor.registrationNumber}
                    onChange={(e) => setCurrentVendor({ ...currentVendor, registrationNumber: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                    موبایل
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    value={currentVendor.mobile}
                    onChange={(e) => setCurrentVendor({ ...currentVendor, mobile: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    dir="ltr"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    تلفن ثابت
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={currentVendor.phone}
                    onChange={(e) => setCurrentVendor({ ...currentVendor, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    dir="ltr"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    آدرس
                  </label>
                  <textarea
                    id="address"
                    value={currentVendor.address}
                    onChange={(e) => setCurrentVendor({ ...currentVendor, address: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="products" className="block text-sm font-medium text-gray-700">
                    محصولات/خدمات
                  </label>
                  <textarea
                    id="products"
                    value={currentVendor.products}
                    onChange={(e) => setCurrentVendor({ ...currentVendor, products: e.target.value })}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="credit" className="block text-sm font-medium text-gray-700">
                    اعتبار (ریال)
                  </label>
                  <input
                    type="text"
                    id="credit"
                    value={currentVendor.credit}
                    onChange={(e) => setCurrentVendor({ ...currentVendor, credit: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contractDate" className="block text-sm font-medium text-gray-700">
                    تاریخ قرارداد
                  </label>
                  <input
                    type="date"
                    id="contractDate"
                    value={currentVendor.contractDate}
                    onChange={(e) => setCurrentVendor({ ...currentVendor, contractDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    وضعیت
                  </label>
                  <select
                    id="status"
                    value={currentVendor.status}
                    onChange={(e) => setCurrentVendor({ ...currentVendor, status: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="active">فعال</option>
                    <option value="inactive">غیرفعال</option>
                  </select>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  >
                    {currentVendor.id ? 'ویرایش' : 'افزودن'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                  >
                    انصراف
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <input
          type="text"
          placeholder="جستجو..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pr-4 text-right text-sm font-semibold text-gray-900">نام شرکت</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">شناسه ملی</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">کد اقتصادی</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">تلفن</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">اعتبار</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">وضعیت</th>
                <th scope="col" className="relative py-3.5 pl-3">
                  <span className="sr-only">عملیات</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td className="whitespace-nowrap py-4 pr-4 text-sm font-medium text-gray-900">{vendor.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vendor.nationalCode}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vendor.economicCode}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" dir="ltr">{vendor.phone}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vendor.credit}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeColor(vendor.status)}`}>
                      {getStatusText(vendor.status)}
                    </span>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(vendor)}
                      className="text-primary-600 hover:text-primary-900 ml-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(vendor.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}