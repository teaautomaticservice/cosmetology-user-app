import { ComponentProps } from 'react';
import { ModalsMap } from '@constants/modals';
import { storeFactory } from '@utils/storeFactory';

type ModalsType = keyof typeof ModalsMap;

type GetComponentsMapProp<T extends ModalsType = ModalsType> = ComponentProps<(typeof ModalsMap[T])>;

interface ModalStore<
  T extends ModalsType | null = ModalsType | null,
  O = T extends ModalsType ? GetComponentsMapProp : null,
> {
  type: T;
  props?: O;
}

const { useStore, setEvent } = storeFactory<ModalStore>({
  type: null,
});

export const useModalStore = () => {
  const [state, setState] = useStore();

  const close = () => setEvent({
    type: null,
    props: null,
  });

  const open = <T extends ModalsType>(type: T, props?: GetComponentsMapProp<T>) => {
    setState({
      type: type,
      props,
    });
  };

  const isOpen = state.type === null ? false : true;

  return {
    isOpen,
    modalType: state.type,
    modalProps: state.props,
    close,
    open,
  };
};
