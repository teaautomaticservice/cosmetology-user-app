import {
  ActionsMoneyStorageModal
} from '@components/domain/rootModal/actionsMoneyStorageModal/ActionsMoneyStorageModal';
import { CreateMoneyStorageModal } from '@components/domain/rootModal/createMoneyStorageModal/CreateMoneyStorageModal';
import { MessageModal } from '@components/domain/rootModal/messageModal/MessageModal';

export const ModalsMap = {
  'history': MessageModal,
  'actionsMoneyStorage': ActionsMoneyStorageModal,
  'createMoneyStorageModal': CreateMoneyStorageModal,
};
