import { eventBusFactory } from '@shared/utils/eventBusFactory';

export type ToastProps = {
  description: string;
  type?: 'success' | 'error';
}

type ToastEventBus = {
  addToast: ToastProps;
}

const toastEventBus = eventBusFactory<ToastEventBus>();

export const subscribeOnToast = (callback: (props: ToastProps) => void) =>
  toastEventBus.on('addToast', (props) => callback(props));

export const addToast = (props: ToastProps) =>
  toastEventBus.emit('addToast', props);
