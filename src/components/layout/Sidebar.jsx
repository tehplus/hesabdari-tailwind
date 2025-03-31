/**
 * @file Sidebar Navigation Component
 * @description Main navigation sidebar with expandable menus and active state highlighting
 * @date 2025-03-31 18:17:35
 */

import { useState, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import {
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  ShoppingCartIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

// تعریف منوهای اصلی برنامه
const navigation = [
  { 
    name: 'داشبورد', 
    href: '/', 
    icon: HomeIcon 
  },
  {
    name: 'اشخاص',
    icon: UsersIcon,
    children: [
      { name: 'شخص جدید', href: '/persons/new' },
      { name: 'اشخاص', href: '/persons' },
      { name: 'دریافت', href: '/persons/receive' },
      { name: 'لیست دریافت ها', href: '/persons/receives' },
      { name: 'پرداخت', href: '/persons/payment' },
      { name: 'لیست پرداخت ها', href: '/persons/payments' },
      { name: 'سهامداران', href: '/persons/shareholders' },
      { name: 'فروشندگان', href: '/persons/vendors' }
    ]
  },
  {
    name: 'کالاها و خدمات',
    icon: ArchiveBoxIcon,
    children: [
      { name: 'کالای جدید', href: '/products/new' },
      { name: 'خدمات جدید', href: '/services/new' },
      { name: 'کالاها و خدمات', href: '/products' },
      { name: 'به روز رسانی لیست قیمت', href: '/products/update-prices' },
      { name: 'چاپ بارکد', href: '/products/print-barcode' },
      { name: 'چاپ بارکد تعدادی', href: '/products/print-barcodes' },
      { name: 'صفحه لیست قیمت کالا', href: '/products/price-list' }
    ]
  },
  {
    name: 'بانکداری',
    icon: BanknotesIcon,
    children: [
      { name: 'بانک‌ها', href: '/banking/banks' },
      { name: 'صندوق‌ها', href: '/banking/funds' },
      { name: 'تنخواه‌گردان‌ها', href: '/banking/petty-cash' },
      { name: 'انتقال', href: '/banking/transfer' },
      { name: 'لیست انتقال‌ها', href: '/banking/transfers' },
      { name: 'لیست چک‌های دریافتی', href: '/banking/received-checks' },
      { name: 'لیست چک‌های پرداختی', href: '/banking/paid-checks' }
    ]
  },
  {
    name: 'فروش و درآمد',
    icon: CurrencyDollarIcon,
    children: [
      { name: 'فروش جدید', href: '/sales/new' },
      { name: 'فاکتور سریع', href: '/sales/quick' },
      { name: 'برگشت از فروش', href: '/sales/return' },
      { name: 'فاکتورهای فروش', href: '/sales/invoices' },
      { name: 'فاکتورهای برگشت از فروش', href: '/sales/return-invoices' },
      { name: 'درآمد', href: '/sales/income' },
      { name: 'لیست درآمدها', href: '/sales/incomes' },
      { name: 'قرارداد فروش اقساطی', href: '/sales/installment' },
      { name: 'لیست فروش اقساطی', href: '/sales/installments' },
      { name: 'اقلام تخفیف دار', href: '/sales/discounted' }
    ]
  },
  {
    name: 'خرید و هزینه',
    icon: ShoppingCartIcon,
    children: [
      { name: 'خرید جدید', href: '/purchases/new' },
      { name: 'برگشت از خرید', href: '/purchases/return' },
      { name: 'فاکتورهای خرید', href: '/purchases/invoices' },
      { name: 'فاکتورهای برگشت از خرید', href: '/purchases/return-invoices' },
      { name: 'هزینه', href: '/purchases/expense' },
      { name: 'لیست هزینه‌ها', href: '/purchases/expenses' },
      { name: 'ضایعات', href: '/purchases/waste' },
      { name: 'لیست ضایعات', href: '/purchases/wastes' }
    ]
  },
  {
    name: 'انبارداری',
    icon: BuildingOfficeIcon,
    children: [
      { name: 'انبارها', href: '/warehouse' },
      { name: 'حواله جدید', href: '/warehouse/new-transfer' },
      { name: 'رسید و حواله‌های انبار', href: '/warehouse/documents' },
      { name: 'موجودی کالا', href: '/warehouse/stock' },
      { name: 'موجودی تمامی انبارها', href: '/warehouse/all-stock' },
      { name: 'انبارگردانی', href: '/warehouse/inventory' }
    ]
  },
  {
    name: 'حسابداری',
    icon: DocumentChartBarIcon,
    children: [
      { name: 'سند جدید', href: '/accounting/new' },
      { name: 'لیست اسناد', href: '/accounting/documents' },
      { name: 'تراز افتتاحیه', href: '/accounting/opening-balance' },
      { name: 'بستن سال مالی', href: '/accounting/close-year' },
      { name: 'جدول حساب‌ها', href: '/accounting/chart' },
      { name: 'تجمیع اسناد', href: '/accounting/merge' }
    ]
  },
  {
    name: 'سایر',
    icon: Square3Stack3DIcon,
    children: [
      { name: 'آرشیو', href: '/others/archive' },
      { name: 'پنل پیامک', href: '/others/sms' },
      { name: 'استعلام', href: '/others/inquiry' },
      { name: 'دریافت سایر', href: '/others/receive' },
      { name: 'لیست دریافت‌ها', href: '/others/receives' },
      { name: 'پرداخت سایر', href: '/others/payment' },
      { name: 'لیست پرداخت‌ها', href: '/others/payments' },
      { name: 'سند تسعیر ارز', href: '/others/currency-exchange' },
      { name: 'سند توازن اشخاص', href: '/others/persons-balance' },
      { name: 'سند توازن کالاها', href: '/others/products-balance' },
      { name: 'سند حقوق', href: '/others/salary' }
    ]
  },
  {
    name: 'گزارش‌ها',
    icon: ChartBarIcon,
    children: [
      { name: 'تمام گزارش‌ها', href: '/reports' },
      { name: 'ترازنامه', href: '/reports/balance-sheet' },
      { name: 'بدهکاران و بستانکاران', href: '/reports/debtors-creditors' },
      { name: 'کارت حساب اشخاص', href: '/reports/persons-account' },
      { name: 'کارت حساب کالا', href: '/reports/products-account' },
      { name: 'فروش به تفکیک کالا', href: '/reports/sales-by-product' },
      { name: 'کارت پروژه', href: '/reports/project' }
    ]
  },
  {
    name: 'تنظیمات',
    icon: Cog6ToothIcon,
    children: [
      { name: 'پروژه‌ها', href: '/settings/projects' },
      { name: 'اطلاعات کسب و کار', href: '/settings/business' },
      { name: 'تنظیمات مالی', href: '/settings/financial' },
      { name: 'جدول تبدیل نرخ ارز', href: '/settings/exchange-rates' },
      { name: 'مدیریت کاربران', href: '/settings/users' },
      { name: 'تنظیمات چاپ', href: '/settings/print' },
      { name: 'فرم ساز', href: '/settings/form-builder' },
      { name: 'اعلانات', href: '/settings/notifications' }
    ]
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuToggle = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

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
                                      ? 'bg-primary-800 text-white'
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
                                    onClick={() => handleMenuToggle(item.name)}
                                    className={classNames(
                                      openMenu === item.name
                                        ? 'bg-primary-800 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                      'flex items-center w-full text-right rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold'
                                    )}
                                  >
                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                    {item.name}
                                    <span className="mr-auto">
                                      {openMenu === item.name ? (
                                        <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                                      ) : (
                                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                      )}
                                    </span>
                                  </button>
                                  {openMenu === item.name && (
                                    <div className="mt-1 space-y-1">
                                      {item.children.map((child) => (
                                        <Link
                                          key={child.name}
                                          to={child.href}
                                          className={classNames(
                                            location.pathname === child.href
                                              ? 'bg-primary-700 text-white'
                                              : 'text-gray-400 hover:text-white hover:bg-gray-700',
                                            'flex rounded-md py-2 pr-12 text-sm leading-6'
                                          )}
                                        >
                                          {child.name}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
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
                              ? 'bg-primary-800 text-white'
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
                            onClick={() => handleMenuToggle(item.name)}
                            className={classNames(
                              openMenu === item.name
                                ? 'bg-primary-800 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800',
                              'flex items-center w-full text-right rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold'
                            )}
                          >
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {item.name}
                            <span className="mr-auto">
                              {openMenu === item.name ? (
                                <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </button>
                          {openMenu === item.name && (
                            <div className="mt-1 space-y-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  to={child.href}
                                  className={classNames(
                                    location.pathname === child.href
                                      ? 'bg-primary-700 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-700',
                                    'flex rounded-md py-2 pr-12 text-sm leading-6'
                                  )}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          )}
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