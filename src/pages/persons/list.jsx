import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { showConfirm, showSuccess } from '../../utils/notification';

// داده‌های نمونه
const initialPeople = [
  { id: 1, name: 'علی محمدی', nationalCode: '1234567890', mobile: '09123456789', type: 'real' },
  { id: 2, name: 'شرکت پارس', nationalCode: '10861234567', mobile: '02188776655', type: 'legal' },
];

export default function PersonsList() {
  const [people, setPeople] = useState(initialPeople);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id) => {
    const confirmed = await showConfirm('حذف شخص', 'آیا از حذف این شخص اطمینان دارید؟');
    if (confirmed) {
      setPeople(people.filter(person => person.id !== id));
      showSuccess('شخص مورد نظر با موفقیت حذف شد');
    }
  };

  const filteredPeople = people.filter(person => 
    person.name.includes(searchTerm) || 
    person.nationalCode.includes(searchTerm) || 
    person.mobile.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">لیست اشخاص</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:mr-16 sm:flex-none">
          <Link
            to="/persons/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="ml-2 h-4 w-4" />
            افزودن شخص
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
                <th scope="col" className="py-3.5 pr-4 text-right text-sm font-semibold text-gray-900">نام</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">کد ملی / شناسه ملی</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">موبایل</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">نوع</th>
                <th scope="col" className="relative py-3.5 pl-3">
                  <span className="sr-only">عملیات</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPeople.map((person) => (
                <tr key={person.id}>
                  <td className="whitespace-nowrap py-4 pr-4 text-sm font-medium text-gray-900">{person.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.nationalCode}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" dir="ltr">{person.mobile}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {person.type === 'real' ? 'حقیقی' : 'حقوقی'}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium">
                    <Link
                      to={`/persons/${person.id}/edit`}
                      className="text-primary-600 hover:text-primary-900 ml-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(person.id)}
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