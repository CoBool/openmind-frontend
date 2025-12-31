let toasts = [];
let subscribers = [];
let count = 0;

const notify = () => {
  subscribers.forEach((fn) => fn(toasts));
};

const toastState = {
  subscribe(fn) {
    subscribers.push(fn);
    return () => {
      subscribers = subscribers.filter((subscriber) => subscriber !== fn);
    };
  },

  addToast(message, type = 'default', duration = 3000) {
    const id = ++count;

    const newToast = { id, message, type };
    toasts = [...toasts, newToast];

    notify();

    if (duration > 0) {
      setTimeout(() => {
        toasts.dismiss(id)
      }, duration)
    }

    return id;
  },

  dismiss(id) {
    toasts = toasts.filter((toast) => toast.id !== id);
    notify();
  }
}

export const toast = (message, options) => {
  return toastState.addToast(message, 'default', options?.duration);
};

toast.success = (message, options) => toastState.addToast(message, 'success', options?.duration);
toast.error   = (message, options) => toastState.addToast(message, 'error', options?.duration);
toast.info    = (message, options) => toastState.addToast(message, 'info', options?.duration);
toast.warning = (message, options) => toastState.addToast(message, 'warning', options?.duration);

toast.dismiss = (id) => toastState.dismiss(id);

export { toastState };