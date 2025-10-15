import { useEffect } from 'react';
import { subscribeOnToast, ToastProps } from '@utils/domain/toastEventBus';
import { notification } from 'antd';

export const Toasts: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const addToast = ({
    description,
    type,
  }: ToastProps) => {
    if (type === 'error') {
      api.error({
        message: 'Error',
        description,
      });
    } else {
      api.success({
        message: 'Success',
        description,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeOnToast((payload) => {
      addToast(payload);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {contextHolder}
    </>
  );
};
