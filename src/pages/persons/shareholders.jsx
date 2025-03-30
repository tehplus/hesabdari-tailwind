import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { showConfirm, showSuccess } from '../../utils/notification';

const initialShareholders = [
  { 
    id: 1, 
    name: 'علی محمدی', 
    shares: '35%',
    nationalCode: '1234567890',
    investmentAmount: '350,000,000',
    date: '1402/01/01',
    status: 'active'
  },
  { 
    id: 2, 
    name: 'شرکت پارس', 
    shares: '45%',
    nationalCode: '10861234567',
    investmentAmount: '450,000,000',
    date: '1402/01/01',
    status: 'active'
  },
];

export default function Shareholders() {
  const [shareholders, setShareholders] = useState(initialShareholders);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentShareholder, setCurrentShareholder] = useState({
    name: '',
    shares: '',
    nationalCode: '',
    investmentAmount: '',
    date: new Date().toISOString().split('T')[0],
    status: 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentShareholder.id) {
      // ویرایش سهامدار موجود
      setShareholders(shareholders.map(sh => 
        sh.id === currentShareholder.id ? { ...currentShareholder } : sh
      ));
      showSuccess('سهامدار با موفقیت ویرایش شد');
    } else {
      // افزودن سهامدار جدید
      setShareholders([...shareholders, { 
        ...currentShareholder, 
        id: shareholders.length + 1 
      }]);
      showSuccess('سهامدار جدید با موفقیت اضافه شد');
    }
    setShowForm(false);
    setCurrentShareholder({
      name: '',
      shares: '',
      nationalCode: '',
      investmentAmount: '',
      date: new Date().toISOString().split('T')[0],
      status: 'active'
    });
  };

  const handleEdit = (shareholder) => {
    setCurrentShareholder(shareholder);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = await showConfirm('حذف سهامدار', 'آیا از حذف این سهامدار اطمینان دارید؟');
    if (confirmed) {
      setShareholders(shareholders.filter(sh => sh.id !== id));
      showSuccess('سهامدار مورد نظر با موفقیت حذف شد');
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

  const filteredShareholders = shareholders.filter(shareholder => 
    shareholder.name.includes(searchTerm) || 
    shareholder.nationalCode.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">لیست سهامداران</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:mr-16 sm:flex-none">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="ml-2 h-4 w-4" />
            سهامدار جدید
          </button>
        </div>
      </div>

      {/* فرم افزودن/ویرایش سهامدار */}
      {showForm && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-right shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    نام
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={currentShareholder.name}
                    onChange={(e) => setCurrentShareholder({ ...currentShareholder, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="shares" className="block text-sm font-medium text-gray-700">
                    درصد سهام
                  </label>
                  <input
                    type="text"
                    id="shares"
                    value={currentShareholder.shares}
                    onChange={(e) => setCurrentShareholder({ ...currentShareholder, shares: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="nationalCode" className="block text-sm font-medium text-gray-700">
                    کد ملی / شناسه ملی
                  </label>
                  <input
                    type="text"
                    id="nationalCode"
                    value={currentShareholder.nationalCode}
                    onChange={(e) => setCurrentShareholder({ ...currentShareholder, nationalCode: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700">
                    مبلغ سرمایه‌گذاری
                  </label>
                  <input
                    type="text"
                    id="investmentAmount"
                    value={currentShareholder.investmentAmount}
                    onChange={(e) => setCurrentShareholder({ ...currentShareholder, investmentAmount: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    تاریخ
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={currentShareholder.date}
                    onChange={(e) => setCurrentShareholder({ ...currentShareholder, date: e.target.value })}
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
                    value={currentShareholder.status}
                    onChange={(e) => setCurrentShareholder({ ...currentShareholder, status: e.target.value })}
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
                    {currentShareholder.id ? 'ویرایش' : 'افزودن'}
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
                <th scope="col" className="py-3.5 pr-4 text-right text-sm font-semibold text-gray-900">نام</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">درصد سهام</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">کد ملی</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">مبلغ سرمایه‌گذاری</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">تاریخ</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">وضعیت</th>
                <th scope="col" className="relative py-3.5 pl-3">
                  <span className="sr-only">عملیات</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredShareholders.map((shareholder) => (
                <tr key={shareholder.id}>
                  <td className="whitespace-nowrap py-4 pr-4 text-sm font-medium text-gray-900">{shareholder.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{shareholder.shares}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{shareholder.nationalCode}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{shareholder.investmentAmount}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{shareholder.date}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeColor(shareholder.status)}`}>
                      {getStatusText(shareholder.status)}
                    </span>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(shareholder)}
                      className="text-primary-600 hover:text-primary-900 ml-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(shareholder.id)}
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