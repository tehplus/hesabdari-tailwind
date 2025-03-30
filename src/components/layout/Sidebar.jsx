import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ArchiveBoxIcon,
  CalculatorIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  ArchiveBoxArrowDownIcon,
  BuildingLibraryIcon,
  ClipboardDocumentListIcon,
  DocumentDuplicateIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  {
    name: 'داشبورد',
    href: '/',
    icon: HomeIcon,
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
      { name: 'فروشندگان', href: '/persons/vendors' },
    ],
  },
  {
    name: 'کالاها و خدمات',
    icon: ShoppingBagIcon,
    children: [
      { name: 'کالای جدید', href: '/products/new' },
      { name: 'خدمات جدید', href: '/services/new' },
      { name: 'کالاها و خدمات', href: '/products' },
      { name: 'به روز رسانی لیست قیمت', href: '/products/update-prices' },
      { name: 'چاپ بارکد', href: '/products/print-barcode' },
      { name: 'چاپ بارکد تعدادی', href: '/products/print-barcodes' },
      { name: 'صفحه لیست قیمت کالا', href: '/products/price-list' },
    ],
  },
  {
    name: 'بانکداری',
    icon: BuildingLibraryIcon,
    children: [
      { name: 'بانک‌ها', href: '/banking/banks' },
      { name: 'صندوق‌ها', href: '/banking/funds' },
      { name: 'تنخواه‌گردان‌ها', href: '/banking/petty-cash' },
      { name: 'انتقال', href: '/banking/transfer' },
      { name: 'لیست انتقال‌ها', href: '/banking/transfers' },
      { name: 'لیست چک‌های دریافتی', href: '/banking/received-checks' },
      { name: 'لیست چک‌های پرداختی', href: '/banking/paid-checks' },
    ],
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
      { name: 'اقلام تخفیف دار', href: '/sales/discounted' },
    ],
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
      { name: 'لیست ضایعات', href: '/purchases/wastes' },
    ],
  },
  {
    name: 'انبارداری',
    icon: ArchiveBoxIcon,
    children: [
      { name: 'انبارها', href: '/warehouse/list' },
      { name: 'حواله جدید', href: '/warehouse/new-transfer' },
      { name: 'رسید و حواله‌های انبار', href: '/warehouse/documents' },
      { name: 'موجودی کالا', href: '/warehouse/stock' },
      { name: 'موجودی تمامی انبارها', href: '/warehouse/all-stock' },
      { name: 'انبارگردانی', href: '/warehouse/inventory' },
    ],
  },
  {
    name: 'حسابداری',
    icon: CalculatorIcon,
    children: [
      { name: 'سند جدید', href: '/accounting/new' },
      { name: 'لیست اسناد', href: '/accounting/documents' },
      { name: 'تراز افتتاحیه', href: '/accounting/opening-balance' },
      { name: 'بستن سال مالی', href: '/accounting/close-year' },
      { name: 'جدول حساب‌ها', href: '/accounting/chart' },
      { name: 'تجمیع اسناد', href: '/accounting/merge' },
    ],
  },
  {
    name: 'سایر',
    icon: WrenchScrewdriverIcon,
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
      { name: 'سند حقوق', href: '/others/salary' },
    ],
  },
  {
    name: 'گزارش‌ها',
    icon: ChartBarIcon,
    children: [
      { name: 'تمام گزارش‌ها', href: '/reports/all' },
      { name: 'ترازنامه', href: '/reports/balance-sheet' },
      { name: 'بدهکاران و بستانکاران', href: '/reports/debtors-creditors' },
      { name: 'کارت حساب اشخاص', href: '/reports/persons-account' },
      { name: 'کارت حساب کالا', href: '/reports/products-account' },
      { name: 'فروش به تفکیک کالا', href: '/reports/sales-by-product' },
      { name: 'کارت پروژه', href: '/reports/project' },
    ],
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
      { name: 'اعلانات', href: '/settings/notifications' },
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <img className="h-8 w-auto" src="/logo.svg" alt="شرکت شما" />
          <span className="mr-3 text-xl font-bold text-white">حسابداری</span>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleMenu(item.name)}
                          className={`
                            flex w-full items-center gap-x-3 rounded-md p-2 text-sm leading-6
                            ${openMenus[item.name] ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}
                          `}
                        >
                          <item.icon className="h-6 w-6 shrink-0" />
                          {item.name}
                          <svg
                            className={`ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ${
                              openMenus[item.name] ? 'rotate-90' : ''
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {openMenus[item.name] && (
                          <ul role="list" className="mr-4 mt-1 space-y-1">
                            {item.children.map((subItem) => (
                              <li key={subItem.name}>
                                <Link
                                  to={subItem.href}
                                  className={`
                                    group flex gap-x-3 rounded-md p-2 text-sm leading-6
                                    ${location.pathname === subItem.href
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800'}
                                  `}
                                >
                                  <span className="truncate"> -{subItem.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className={`
                          group flex gap-x-3 rounded-md p-2 text-sm leading-6
                          ${location.pathname === item.href
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'}
                        `}
                      >
                        <item.icon className="h-6 w-6 shrink-0" />
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}