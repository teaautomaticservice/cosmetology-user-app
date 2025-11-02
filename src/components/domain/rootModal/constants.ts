import {
  ActionsMoneyStorageModal
} from '@components/domain/rootModal/actionsMoneyStorageModal/ActionsMoneyStorageModal';
import { CreateMoneyStorageModal } from '@components/domain/rootModal/createMoneyStorageModal/CreateMoneyStorageModal';
import { MessageModal } from '@components/domain/rootModal/messageModal/MessageModal';

import { CreateAccountsModal } from './createAccountsModal/CreateAccountsModal';
import { CreateCurrencyModal } from './createCurrencyModal/CreateCurrencyModal';
import { EditCurrency } from './editCurrency/EditCurrency';

export const ModalsMap = {
  'history': MessageModal,
  'actionsMoneyStorage': ActionsMoneyStorageModal,
  'createMoneyStorageModal': CreateMoneyStorageModal,
  'editCurrency': EditCurrency,
  'createCurrencyModal': CreateCurrencyModal,
  'createAccountsModal': CreateAccountsModal,
};
