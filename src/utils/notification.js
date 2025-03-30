import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';

export const showSuccess = (message) => {
  toast.success(message);
};

export const showError = (message) => {
  toast.error(message);
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
    cancelButtonText: 'خیر'
  });

  return result.isConfirmed;
};

export const showAlert = (title, text, icon = 'info') => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'باشه'
  });
};