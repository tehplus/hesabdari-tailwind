import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';

export const showSuccess = (message) => {
  toast.success(message, {
    duration: 4000,
    position: 'top-center',
    style: {
      fontFamily: 'IRANSans',
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-center',
    style: {
      fontFamily: 'IRANSans',
    },
  });
};

export const showConfirm = async (title, text) => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'بله',
    cancelButtonText: 'خیر',
    customClass: {
      popup: 'font-iransans',
      title: 'text-lg font-bold',
      confirmButton: 'ml-2',
    }
  });

  return result.isConfirmed;
};

export const showAlert = (title, text, icon = 'info') => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'باشه',
    customClass: {
      popup: 'font-iransans',
      title: 'text-lg font-bold',
    }
  });
};

export const showLoading = (title = 'لطفاً صبر کنید...') => {
  Swal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
    customClass: {
      popup: 'font-iransans',
      title: 'text-lg',
    }
  });
};

export const closeLoading = () => {
  Swal.close();
};