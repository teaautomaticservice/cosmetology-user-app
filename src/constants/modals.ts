import { MessageModal } from '@components/domain/historyMessages/components/messageModal/MessageModal';
import { MODALS_TYPE } from '@typings/modals';

export const ModalsMap = {
  [MODALS_TYPE.HISTORY]: MessageModal,
};
