import { ComponentProps } from 'react';
import { ModalsMap } from '@constants/modals';
import { MODALS_TYPE } from '@typings/modals';
import { storeFactory } from '@utils/storeFactory';

type GetComponentsMapProp<T extends MODALS_TYPE> = ComponentProps<(typeof ModalsMap)[T]>;

interface ModalStore<
  T extends MODALS_TYPE | null = MODALS_TYPE | null,
  O = T extends MODALS_TYPE ? GetComponentsMapProp<T> : null,
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

  const open = <T extends MODALS_TYPE>(type: T, props?: GetComponentsMapProp<T>) => {
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
