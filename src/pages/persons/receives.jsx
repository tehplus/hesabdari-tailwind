import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { showConfirm, showSuccess } from '../../utils/notification';

// داده‌های نمونه
const initialReceives = [
  { 
    id: 1, 
    person: 'علی محمدی', 
    amount: '1,000,000', 
    date: '1402/12/25',
    paymentMethod: 'cash',
    status: 'completed'
  },
  { 
    id: 2, 
    person: 'شرکت پارس', 
    amount: '5,000,000', 
    date: '1402/12/24',
    paymentMethod: 'cheque',
    status: 'pending'
  },
];

export default function PersonsReceiveList() {
  const [receives, setReceives] = useState(initialReceives);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id) => {
    const confirmed = await showConfirm('حذف دریافت', 'آیا از حذف این دریافت اطمینان دارید؟');
    if (confirmed) {
      setReceives(receives.filter(receive => receive.id !== id));
      showSuccess('دریافت مورد نظر با موفقیت حذف شد');
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'تکمیل شده';
      case 'pending':
        return 'در انتظار';
      default:
        return status;
    }
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'cash':
        return 'نقدی';
      case 'cheque':
        return 'چک';
      case 'transfer':
        return 'انتقال بانکی';
      default:
        return method;
    }
  };

  const filteredReceives = receives.filter(receive => 
    receive.person.includes(searchTerm) || 
    receive.amount.includes(searchTerm) || 
    receive.date.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">لیست دریافت‌ها</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:mr-16 sm:flex-none">
          <Link
            to="/persons/receive"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="ml-2 h-4 w-4" />
            دریافت جدید
          </Link>
        </div>
      </div>

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
                <th scope="col" className="py-3.5 pr-4 text-right text-sm font-semibold text-gray-900">شخص</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">مبلغ</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">تاریخ</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">روش پرداخت</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">وضعیت</th>
                <th scope="col" className="relative py-3.5 pl-3">
                  <span className="sr-only">عملیات</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReceives.map((receive) => (
                <tr key={receive.id}>
                  <td className="whitespace-nowrap py-4 pr-4 text-sm font-medium text-gray-900">{receive.person}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{receive.amount}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{receive.date}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {getPaymentMethodText(receive.paymentMethod)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeColor(receive.status)}`}>
                      {getStatusText(receive.status)}
                    </span>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium">
                    <Link
                      to={`/persons/receives/${receive.id}/edit`}
                      className="text-primary-600 hover:text-primary-900 ml-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(receive.id)}
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