/**
 * @file Sidebar Navigation Component
 * @description Main navigation sidebar with menu items
 * @author tehplus
 * @date 2025-03-31 15:29:24
 */

import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import {
  XMarkIcon,
  HomeIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  ShoppingCartIcon,
  UsersIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ArrowsRightLeftIcon,
  ChartBarIcon,
  BriefcaseIcon,
  ServerStackIcon,
  ClockIcon,
  CreditCardIcon,
  Square3Stack3DIcon,
  UserGroupIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

// تعریف منوهای اصلی برنامه
const navigation = [
  { 
    name: 'داشبورد', 
    href: '/', 
    icon: HomeIcon 
  },
  {
    name: 'محصولات و خدمات',
    icon: ArchiveBoxIcon,
    children: [
      { name: 'لیست محصولات', href: '/products' },
      { name: 'محصول جدید', href: '/products/new' },
      { name: 'به‌روزرسانی قیمت‌ها', href: '/products/update-prices' },
      { name: 'چاپ بارکد تکی', href: '/products/print-barcode' },
      { name: 'چاپ بارکد گروهی', href: '/products/print-barcodes' },
      { name: 'لیست قیمت', href: '/products/price-list' },
      { name: 'لیست خدمات', href: '/services' },
      { name: 'خدمت جدید', href: '/services/new' }
    ]
  },
  {
    name: 'انبارداری',
    icon: ServerStackIcon,
    children: [
      { name: 'لیست انبارها', href: '/warehouse' },
      { name: 'حواله انبار', href: '/warehouse/new-transfer' },
      { name: 'اسناد انبار', href: '/warehouse/documents' },
      { name: 'کاردکس کالا', href: '/warehouse/stock' },
      { name: 'موجودی انبارها', href: '/warehouse/all-stock' },
      { name: 'انبارگردانی', href: '/warehouse/inventory' }
    ]
  },
  {
    name: 'حسابداری',
    icon: DocumentChartBarIcon,
    children: [
      { name: 'سند جدید', href: '/accounting/new' },
      { name: 'اسناد حسابداری', href: '/accounting/documents' },
      { name: 'افتتاحیه حساب‌ها', href: '/accounting/opening-balance' },
      { name: 'بستن حساب‌های موقت', href: '/accounting/close-year' },
      { name: 'نمودار حساب‌ها', href: '/accounting/chart' },
      { name: 'ادغام اسناد', href: '/accounting/merge' }
    ]
  },
  {
    name: 'بانک و صندوق',
    icon: BanknotesIcon,
    children: [
      { name: 'حساب‌های بانکی', href: '/banking/banks' },
      { name: 'صندوق‌ها', href: '/banking/funds' },
      { name: 'تنخواه‌گردان', href: '/banking/petty-cash' },
      { name: 'انتقال وجه', href: '/banking/transfer' },
      { name: 'لیست انتقالات', href: '/banking/transfers' },
      { name: 'چک‌های دریافتی', href: '/banking/received-checks' },
      { name: 'چک‌های پرداختی', href: '/banking/paid-checks' }
    ]
  },
  {
    name: 'فروش',
    icon: CurrencyDollarIcon,
    children: [
      { name: 'فاکتور فروش', href: '/sales/new' },
      { name: 'فروش سریع', href: '/sales/quick' },
      { name: 'برگشت از فروش', href: '/sales/return' },
      { name: 'فاکتورهای فروش', href: '/sales/invoices' },
      { name: 'برگشت از فروش‌ها', href: '/sales/return-invoices' },
      { name: 'دریافت', href: '/sales/income' },
      { name: 'لیست دریافت‌ها', href: '/sales/incomes' },
      { name: 'فروش اقساطی', href: '/sales/installment' },
      { name: 'لیست اقساط', href: '/sales/installments' },
      { name: 'کالاهای تخفیف خورده', href: '/sales/discounted' }
    ]
  },
  {
    name: 'خرید',
    icon: ShoppingCartIcon,
    children: [
      { name: 'فاکتور خرید', href: '/purchases/new' },
      { name: 'برگشت از خرید', href: '/purchases/return' },
      { name: 'فاکتورهای خرید', href: '/purchases/invoices' },
      { name: 'برگشت از خرید‌ها', href: '/purchases/return-invoices' },
      { name: 'پرداخت هزینه', href: '/purchases/expense' },
      { name: 'لیست هزینه‌ها', href: '/purchases/expenses' },
      { name: 'ضایعات', href: '/purchases/waste' },
      { name: 'لیست ضایعات', href: '/purchases/wastes' }
    ]
  },
  {
    name: 'اشخاص',
    icon: UsersIcon,
    children: [
      { name: 'شخص جدید', href: '/persons/new' },
      { name: 'لیست اشخاص', href: '/persons' },
      { name: 'دریافت از اشخاص', href: '/persons/receive' },
      { name: 'لیست دریافت‌ها', href: '/persons/receives' },
      { name: 'پرداخت به اشخاص', href: '/persons/payment' },
      { name: 'لیست پرداخت‌ها', href: '/persons/payments' },
      { name: 'سهامداران', href: '/persons/shareholders' },
      { name: 'تأمین‌کنندگان', href: '/persons/vendors' }
    ]
  },
  {
    name: 'گزارش‌ها',
    icon: ChartBarIcon,
    children: [
      { name: 'همه گزارش‌ها', href: '/reports' },
      { name: 'تراز آزمایشی', href: '/reports/balance-sheet' },
      { name: 'بدهکاران و بستانکاران', href: '/reports/debtors-creditors' },
      { name: 'گردش حساب اشخاص', href: '/reports/persons-account' },
      { name: 'گردش حساب کالاها', href: '/reports/products-account' },
      { name: 'فروش به تفکیک کالا', href: '/reports/sales-by-product' },
      { name: 'گزارش پروژه', href: '/reports/project' }
    ]
  },
  {
    name: 'تنظیمات',
    icon: Cog6ToothIcon,
    children: [
      { name: 'اطلاعات کسب و کار', href: '/settings/business' },
      { name: 'تنظیمات مالی', href: '/settings/financial' },
      { name: 'نرخ ارز', href: '/settings/exchange-rates' },
      { name: 'کاربران', href: '/settings/users' },
      { name: 'تنظیمات چاپ', href: '/settings/print' },
      { name: 'فرم‌ساز', href: '/settings/form-builder' },
      { name: 'پروژه‌ها', href: '/settings/projects' },
      { name: 'اعلان‌ها', href: '/settings/notifications' }
    ]
  },
  {
    name: 'سایر',
    icon: Square3Stack3DIcon,
    children: [
      { name: 'بایگانی اسناد', href: '/others/archive' },
      { name: 'پیامک', href: '/others/sms' },
      { name: 'استعلام', href: '/others/inquiry' },
      { name: 'دریافت متفرقه', href: '/others/receive' },
      { name: 'لیست دریافت‌ها', href: '/others/receives' },
      { name: 'پرداخت متفرقه', href: '/others/payment' },
      { name: 'لیست پرداخت‌ها', href: '/others/payments' },
      { name: 'تبدیل ارز', href: '/others/currency-exchange' },
      { name: 'مانده حساب اشخاص', href: '/others/persons-balance' },
      { name: 'مانده حساب کالاها', href: '/others/products-balance' },
      { name: 'حقوق و دستمزد', href: '/others/salary' }
    ]
  }
];

// تعریف اجزای کمکی برای نمایش منو
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  return (
    <>
      {/* موبایل */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          {/* اورلی تیره پشت منو */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          {/* پنل اصلی */}
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative ml-16 flex w-full max-w-xs flex-1">
                {/* دکمه بستن */}
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute right-0 top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">بستن</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>

                {/* منوی اصلی */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="/logo.png"
                      alt="Logo"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              {!item.children ? (
                                <Link
                                  to={item.href}
                                  className={classNames(
                                    location.pathname === item.href
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {item.name}
                                </Link>
                              ) : (
                                <div className="space-y-1">
                                  <button
                                    type="button"
                                    className={classNames(
                                      item.children.some(child => location.pathname === child.href)
                                        ? 'bg-gray-800 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                      'flex items-center w-full text-right rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold'
                                    )}
                                  >
                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                    {item.name}
                                  </button>
                                  <div className="mr-6 border-r border-gray-600">
                                    {item.children.map((child) => (
                                      <Link
                                        key={child.name}
                                        to={child.href}
                                        className={classNames(
                                          location.pathname === child.href
                                            ? 'bg-gray-800 text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                          'flex rounded-md py-2 pr-3 text-sm leading-6'
                                        )}
                                      >
                                        {child.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* دسکتاپ */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
          <div className="flex h-16 shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="/logo.png"
              alt="Logo"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      {!item.children ? (
                        <Link
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </Link>
                      ) : (
                        <div className="space-y-1">
                          <button
                            type="button"
                            className={classNames(
                              item.children.some(child => location.pathname === child.href)
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800',
                              'flex items-center w-full text-right rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold'
                            )}
                          >
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {item.name}
                          </button>
                          <div className="mr-6 border-r border-gray-600">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                to={child.href}
                                className={classNames(
                                  location.pathname === child.href
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                  'flex rounded-md py-2 pr-3 text-sm leading-6'
                                )}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}