import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  MapPinIcon,
  BanknotesIcon,
  ClockIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';

export default function PersonNew() {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    // اطلاعات عمومی
    type: 'real', // real یا legal
    firstName: '',
    lastName: '',
    nationalCode: '',
    economicCode: '',
    registrationNumber: '',
    birthDate: '',
    mobile: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    postalCode: '',
    description: '',
    // اطلاعات مالی
    initialBalance: '0',
    creditLimit: '0',
    paymentDays: '0',
    bankAccounts: [],
    // تنظیمات
    isActive: true,
    sendSMS: false,
    sendEmail: false,
    allowPortal: false
  });

  const tabs = [
    { id: 'general', name: 'اطلاعات عمومی' },
    { id: 'financial', name: 'اطلاعات مالی' },
    { id: 'settings', name: 'تنظیمات' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // اینجا عملیات ذخیره‌سازی انجام می‌شود
      toast.success('اطلاعات با موفقیت ذخیره شد');
    } catch (error) {
      toast.error('خطا در ذخیره‌سازی اطلاعات');
    }
  };

  const renderGeneralInfo = () => (
    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-1 sm:col-span-2 lg:col-span-3">
        <div className="flex items-center">
          <div className="flex items-center">
            <input
              type="radio"
              id="type-real"
              name="type"
              value="real"
              checked={formData.type === 'real'}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="type-real" className="mr-2 block text-sm font-medium text-gray-700">
              شخص حقیقی
            </label>
          </div>
          <div className="flex items-center mr-6">
            <input
              type="radio"
              id="type-legal"
              name="type"
              value="legal"
              checked={formData.type === 'legal'}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="type-legal" className="mr-2 block text-sm font-medium text-gray-700">
              شخص حقوقی
            </label>
          </div>
        </div>
      </div>

      {formData.type === 'real' ? (
        <>
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              نام
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              نام خانوادگی
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="nationalCode" className="block text-sm font-medium text-gray-700">
              کد ملی
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <IdentificationIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="nationalCode"
                value={formData.nationalCode}
                onChange={(e) => setFormData({ ...formData, nationalCode: e.target.value })}
                className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                dir="ltr"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              نام شرکت
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="companyName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="economicCode" className="block text-sm font-medium text-gray-700">
              کد اقتصادی
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <IdentificationIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="economicCode"
                value={formData.economicCode}
                onChange={(e) => setFormData({ ...formData, economicCode: e.target.value })}
                className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
              شماره ثبت
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <IdentificationIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="registrationNumber"
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                dir="ltr"
              />
            </div>
          </div>
        </>
      )}

      <div>
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
          موبایل
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="tel"
            id="mobile"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          تلفن ثابت
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          ایمیل
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            dir="ltr"
          />
        </div>
      </div>

      <div className="col-span-1 sm:col-span-2 lg:col-span-3">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          آدرس
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute top-2 right-0 pr-3 flex items-center pointer-events-none">
            <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <textarea
            id="address"
            rows={3}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
          کد پستی
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            dir="ltr"
          />
        </div>
      </div>

      <div className="col-span-1 sm:col-span-2 lg:col-span-3">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          توضیحات
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute top-2 right-0 pr-3 flex items-center pointer-events-none">
            <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <textarea
            id="description"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );

  const renderFinancialInfo = () => (
    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <label htmlFor="initialBalance" className="block text-sm font-medium text-gray-700">
          مانده حساب اولیه
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <BanknotesIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="number"
            id="initialBalance"
            value={formData.initialBalance}
            onChange={(e) => setFormData({ ...formData, initialBalance: e.target.value })}
            className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label htmlFor="creditLimit" className="block text-sm font-medium text-gray-700">
          سقف اعتبار
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <BanknotesIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="number"
            id="creditLimit"
            value={formData.creditLimit}
            onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
            className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label htmlFor="paymentDays" className="block text-sm font-medium text-gray-700">
          مهلت تسویه (روز)
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ClockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="number"
            id="paymentDays"
            value={formData.paymentDays}
            onChange={(e) => setFormData({ ...formData, paymentDays: e.target.value })}
            className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            dir="ltr"
          />
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
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
          <p className="text-gray-500">این شخص در سیستم فعال باشد</p>
        </div>
      </div>

      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="sendSMS"
            type="checkbox"
            checked={formData.sendSMS}
            onChange={(e) => setFormData({ ...formData, sendSMS: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
        </div>
        <div className="mr-3 text-sm">
          <label htmlFor="sendSMS" className="font-medium text-gray-700">
            ارسال پیامک
          </label>
          <p className="text-gray-500">اطلاع‌رسانی از طریق پیامک انجام شود</p>
        </div>
      </div>

      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="sendEmail"
            type="checkbox"
            checked={formData.sendEmail}
            onChange={(e) => setFormData({ ...formData, sendEmail: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
        </div>
        <div className="mr-3 text-sm">
          <label htmlFor="sendEmail" className="font-medium text-gray-700">
            ارسال ایمیل
          </label>
          <p className="text-gray-500">اطلاع‌رسانی از طریق ایمیل انجام شود</p>
        </div>
      </div>

      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="allowPortal"
            type="checkbox"
            checked={formData.allowPortal}
            onChange={(e) => setFormData({ ...formData, allowPortal: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
        </div>
        <div className="mr-3 text-sm">
          <label htmlFor="allowPortal" className="font-medium text-gray-700">
            دسترسی به پورتال
          </label>
          <p className="text-gray-500">امکان ورود به پورتال مشتریان</p>
        </div>
      </div>
    </div>
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {formData.type === 'real' ? 'مشخصات شخص حقیقی' : 'مشخصات شخص حقوقی'}
        </h3>
      </div>

      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            انتخاب برگه
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4 space-x-reverse" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                } rounded-md px-3 py-2 text-sm font-medium`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === 'general' && renderGeneralInfo()}
        {activeTab === 'financial' && renderFinancialInfo()}
        {activeTab === 'settings' && renderSettings()}
      </div>

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