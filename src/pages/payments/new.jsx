import PaymentForm from '../../components/forms/PaymentForm';

export default function NewPayment() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          ثبت پرداخت جدید
        </h1>
      </div>
      <PaymentForm />
    </div>
  );
}