import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* 
  https://fkhadra.github.io/react-toastify/introduction/
  
  Type: info(Blue), success(Green), warn(Yellow), error(Red), dark(Black), default(Rainbow);
  Position: top-left, top-right, top-center, bottom-left, bottom-right, bottom-center
*/

export const ToastCustom = (
  message,
  type = "success",
  position = "bottom-right"
) =>
  toast[type](message, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const ToastSuccess = (message, position = "bottom-right") =>
  toast.success(message, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const ToastWarning = (message, position = "bottom-right") =>
  toast.warn(message, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const ToastError = (message, position = "bottom-right") =>
  toast.error(message, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
