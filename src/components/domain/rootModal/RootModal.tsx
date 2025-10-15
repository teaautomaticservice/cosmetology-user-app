import { ModalsMap } from '@components/domain/rootModal/constants';
import { useModalStore } from '@stores/modal';

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
