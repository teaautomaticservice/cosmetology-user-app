import { MessageModal } from '@components/historyMessages/components/messageModal/MessageModal';
import { MODALS_TYPE } from 'src/typings/modals';

export const ModalsMap = {
  [MODALS_TYPE.HISTORY]: MessageModal,
};
