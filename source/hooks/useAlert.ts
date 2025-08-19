import Swal, { SweetAlertIcon } from 'sweetalert2';

type AlertOptions = {
  icon?: SweetAlertIcon;
  title?: string;
  text?: string;
  timer?: number;
  showConfirmButton?: boolean;
  position?: 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end';
};

const useAlert = () => {
  const showAlert = ({
    icon = 'info',
    title = '',
    text = '',
    timer = 1500,
    showConfirmButton = false,
    position = 'bottom-end',
  }: AlertOptions) => {
    Swal.fire({
      toast: true,
      icon,
      title,
      text,
      timer,
      showConfirmButton,
      position,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  };

  return showAlert;
};

export default useAlert;