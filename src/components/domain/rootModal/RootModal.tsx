import { useModalStore } from '@stores/modal';
import { ModalsMap } from 'src/constants/modals';

export const RootModal: React.FC = () => {
  const { modalType, modalProps } = useModalStore();

  if (!modalType) {
    return null;
  }

  const Component = ModalsMap[modalType];

  return (
    <Component {...modalProps as any} />
  );
};