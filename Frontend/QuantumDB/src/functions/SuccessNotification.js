import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SuccessNotification = (theme, name) => toast.success(name, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
});