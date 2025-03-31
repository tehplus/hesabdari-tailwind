/**
 * @file Banks Management Page
 * @description List and manage bank accounts
 * @author tehplus
 * @date 2025-03-31 15:23:20
 */

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  BanknotesIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

export default function BanksList() {
  const [loading, setLoading] = useState(true);
  const [banks, setBanks] = useState([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'accountNumber',
    direction: 'asc'
  });

  const [formData, setFormData] = useState({
    bankName: '',
    branchName: '',
    branchCode: '',
    accountNumber: '',
    cardNumber: '',
    ibanNumber: '',
    accountType: 'current',
    currency: 'IRR',
    description: '',
    isActive: true,
    openingBalance: '0',
    openingDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      setLoading(true);
      // در اینجا API call برای دریافت لیست حساب‌های بانکی
      // فعلاً داده تستی قرار می‌دهیم
      const mockBanks = [
        {
          id: 1,
          bankName: 'بانک ملت',
          branchName: 'شعبه مرکزی',
          branchCode: '4578',
          accountNumber: '1234567890',
          cardNumber: '6104337812345678',
          ibanNumber: 'IR123456789012345678901234',
          accountType: 'current',
          currency: 'IRR',
          balance: 1000000,
          isActive: true,
          lastTransaction: '2025-03-30'
        },
        {
          id: 2,
          bankName: 'بانک ملی',
          branchName: 'شعبه ونک',
          branchCode: '2356',
          accountNumber: '0987654321',
          cardNumber: '6037997812345678',
          ibanNumber: 'IR098765432109876543210987',
          accountType: 'savings',
          currency: 'IRR',
          balance: 2500000,
          isActive: true,
          lastTransaction: '2025-03-29'
        }
      ];
      setBanks(mockBanks);
    } catch (error) {
      toast.error('خطا در دریافت اطلاعات');
    } finally {
      setLoading(false);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // اعتبارسنجی فرم
    if (!formData.bankName) {
      toast.error('نام بانک اجباری است');
      return;
    }
    if (!formData.accountNumber) {
      toast.error('شماره حساب اجباری است');
      return;
    }
    if (formData.cardNumber && formData.cardNumber.length !== 16) {
      toast.error('شماره کارت باید 16 رقم باشد');
      return;
    }
    if (formData.ibanNumber && formData.ibanNumber.length !== 26) {
      toast.error('شماره شبا باید 26 کاراکتر باشد');
      return;
    }

    try {
      // در اینجا API call برای ذخیره حساب بانکی
      toast.success('حساب بانکی با موفقیت ثبت شد');
      setShowNewForm(false);
      setFormData({
        bankName: '',
        branchName: '',
        branchCode: '',
        accountNumber: '',
        cardNumber: '',
        ibanNumber: '',
        accountType: 'current',
        currency: 'IRR',
        description: '',
        isActive: true,
        openingBalance: '0',
        openingDate: new Date().toISOString().split('T')[0]
      });
      await fetchBanks();
    } catch (error) {
      toast.error('خطا در ثبت اطلاعات');
    }
  };

  const sortedBanks = [...banks].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const filteredBanks = sortedBanks.filter(
    bank =>
      bank.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.accountNumber.includes(searchTerm) ||
      bank.cardNumber.includes(searchTerm) ||
      bank.ibanNumber.includes(searchTerm)
  );

  const accountTypes = [
    { id: 'current', name: 'جاری' },
    { id: 'savings', name: 'پس‌انداز' },
    { id: 'short-term', name: 'کوتاه مدت' },
    { id: 'long-term', name: 'بلند مدت' }
  ];

  const currencies = [
    { id: 'IRR', name: 'ریال' },
    { id: 'USD', name: 'دلار' },
    { id: 'EUR', name: 'یورو' },
    { id: 'GBP', name: 'پوند' }
  ];

  return (
    <div className="space-y-6">
      {/* هدر صفحه */}
      <div className="pb-5 border-b border-gray-200">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              حساب‌های بانکی
            </h3>
            <p className="mt-2 max-w-4xl text-sm text-gray-500">
              مدیریت حساب‌های بانکی و مشاهده موجودی آن‌ها
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              onClick={() => setShowNewForm(!showNewForm)}
              className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              <PlusIcon className="ml-2 -mr-0.5 h-5 w-5" />
              حساب جدید
            </button>
          </div>
        </div>
      </div>

      {/* فرم ایجاد حساب جدید */}
      {showNewForm && (
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <form onSubmit={handleSubmit} className="px-4 py-6 sm:p-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* نام بانک */}
              <div className="sm:col-span-2">
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                  نام بانک <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    required
                    className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="بانک ملت">بانک ملت</option>
                    <option value="بانک ملی">بانک ملی</option>
                    <option value="بانک صادرات">بانک صادرات</option>
                    <option value="بانک تجارت">بانک تجارت</option>
                  </select>
                </div>
              </div>

              {/* نام شعبه */}
              <div className="sm:col-span-2">
                <label htmlFor="branchName" className="block text-sm font-medium text-gray-700">
                  نام شعبه
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="branchName"
                    value={formData.branchName}
                    onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                    className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* کد شعبه */}
              <div className="sm:col-span-2">
                <label htmlFor="branchCode" className="block text-sm font-medium text-gray-700">
                  کد شعبه
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="branchCode"
                    value={formData.branchCode}
                    onChange={(e) => setFormData({ ...formData, branchCode: e.target.value })}
                    className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* شماره حساب */}
              <div className="sm:col-span-2">
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                  شماره حساب <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    required
                    className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* شماره کارت */}
              <div className="sm:col-span-2">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  شماره کارت
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    maxLength={16}
                    className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* شماره شبا */}
              <div className="sm:col-span-2">
                <label htmlFor="ibanNumber" className="block text-sm font-medium text-gray-700">
                  شماره شبا
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="ibanNumber"
                    value={formData.ibanNumber}
                    onChange={(e) => setFormData({ ...formData, ibanNumber: e.target.value })}
                    maxLength={26}
                    className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* نوع حساب */}
              <div className="sm:col-span-2">
                <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
                  نوع حساب
                </label>
                <div className="mt-1">
                  <select
                    id="accountType"
                    value={formData.accountType}
                    onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                    className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    {accountTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ارز */}
              <div className="sm:col-span-2">
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                  ارز
                </label>
                <div className="mt-1">
                  <select
                    id="currency"
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    {currencies.map(currency => (
                      <option key={currency.id} value={currency.id}>
                        {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* موجودی اولیه */}
              <div className="sm:col-span-2">
                <label htmlFor="openingBalance" className="block text-sm font-medium text-gray-700">
                  موجودی اولیه
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="openingBalance"
                    value={formData.openingBalance}
                    onChange={(e) => setFormData({ ...formData, openingBalance: e.target.value })}
                    className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* تاریخ افتتاح */}
              <div className="sm:col-span-2">
                <label htmlFor="openingDate" className="block text-sm font-medium text-gray-700">
                  تاریخ افتتاح
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    id="openingDate"
                    value={formData.openingDate}
                    onChange={(e) => setFormData({ ...formData, openingDate: e.target.value })}
                    className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* وضعیت */}
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
                    <p className="text-gray-500">این حساب در سیستم فعال باشد</p>
                  </div>
                </div>
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
              </div>
            </div>

            {/* دکمه‌های فرم */}
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={() => setShowNewForm(false)}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                ذخیره
              </button>
            </div>
          </form>
        </div>
      )}

      {/* بخش جستجو */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <div className="px-4 py-5 sm:p-6">
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              placeholder="جستجو در حساب‌های بانکی..."
            />
          </div>
        </div>
      </div>

      {/* جدول حساب‌ها */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 cursor-pointer"
                  onClick={() => handleSort('bankName')}
                >
                  <div className="group inline-flex">
                    نام بانک
                    <span className="mr-2 flex-none rounded text-gray-400">
                      {sortConfig.key === 'bankName' ? (
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
                  onClick={() => handleSort('accountNumber')}
                >
                  <div className="group inline-flex">
                    شماره حساب
                    <span className="mr-2 flex-none rounded text-gray-400">
                      {sortConfig.key === 'accountNumber' ? (
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
                  شماره کارت
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                  شماره شبا
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 cursor-pointer"
                  onClick={() => handleSort('balance')}
                >
                  <div className="group inline-flex">
                    موجودی
                    <span className="mr-2 flex-none rounded text-gray-400">
                      {sortConfig.key === 'balance' ? (
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
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                  آخرین تراکنش
                </th>
                <th scope="col" className="relative py-3.5 pl-4 sm:pl-6">
                  <span className="sr-only">عملیات</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    در حال بارگذاری...
                  </td>
                </tr>
              ) : filteredBanks.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    موردی یافت نشد
                  </td>
                </tr>
              ) : (
                filteredBanks.map((bank) => (
                  <tr key={bank.id}>
                    <td className="whitespace-nowrap py-4 pr-4 text-sm font-medium text-gray-900 sm:pr-6">
                      {bank.bankName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-mono">
                      {bank.accountNumber}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-mono">
                      {bank.cardNumber}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-mono">
                      {bank.ibanNumber}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Intl.NumberFormat('fa-IR').format(bank.balance)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          bank.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {bank.isActive ? 'فعال' : 'غیرفعال'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {bank.lastTransaction}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-4 text-right text-sm font-medium sm:pl-6">
                      <button
                        type="button"
                        onClick={() => {/* ویرایش */}}
                        className="text-primary-600 hover:text-primary-900 ml-4"
                      >
                        ویرایش
                      </button>
                      <button
                        type="button"
                        onClick={() => {/* مشاهده تراکنش‌ها */}}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        تراکنش‌ها
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