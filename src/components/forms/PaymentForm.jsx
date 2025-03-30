import { useState } from 'react';

export default function PaymentForm() {
  const [isAutoNumber, setIsAutoNumber] = useState(true);
  const [formData, setFormData] = useState({
    paymentNumber: '1000',
    date: new Date().toISOString().split('T')[0],
    project: '',
    description: '',
    currency: 'IRR',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // اینجا لاجیک ذخیره‌سازی رو اضافه می‌کنیم
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              اطلاعات پرداخت
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              جزئیات پرداخت را وارد کنید
            </p>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  شماره پرداخت
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={formData.paymentNumber}
                    disabled={isAutoNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentNumber: e.target.value })
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:bg-gray-100"
                  />
                </div>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={isAutoNumber}
                      onChange={(e) => setIsAutoNumber(e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                    <span className="mr-2 text-sm text-gray-600">
                      شماره اتوماتیک
                    </span>
                  </label>
                </div>
              </div>

              {/* سایر فیلدها */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          ذخیره
        </button>
      </div>
    </form>
  );
}