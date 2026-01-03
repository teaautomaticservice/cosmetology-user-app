import {
  ActionsMoneyStorageModal
} from '@components/domain/rootModal/actionsMoneyStorageModal/ActionsMoneyStorageModal';
import { CreateMoneyStorageModal } from '@components/domain/rootModal/createMoneyStorageModal/CreateMoneyStorageModal';
import { MessageModal } from '@components/domain/rootModal/messageModal/MessageModal';

import { CreateAccountsModal } from './createAccountsModal/CreateAccountsModal';
import { CreateCashOutModal } from './createCashOutModal/CreateCashOutModal';
import { CreateCurrencyModal } from './createCurrencyModal/CreateCurrencyModal';
import { CreateObligationStorageModal } from './createObligationStorageModal/CreateObligationStorageModal';
import { CreateOpenBalanceModal } from './createOpenBalanceModal/CreateOpenBalanceModal';
import {
  CreateOpenBalanceObligationModal,
} from './createOpenBalanceObligationModal/CreateOpenBalanceObligationModal';
import { EditAccountWithStorages } from './editAccountWithStorages/EditAccountWithStorages';
import { EditAggregatedAccount } from './editAggregatedAccount/EditAggregatedAccount';
import { EditCurrency } from './editCurrency/EditCurrency';
import { TakeLoanModal } from './takeLoanModal/TakeLoanModal';

export const ModalsMap = {
  'history': MessageModal,
  'actionsMoneyStorage': ActionsMoneyStorageModal,
  'createMoneyStorageModal': CreateMoneyStorageModal,
  'editCurrency': EditCurrency,
  'createCurrencyModal': CreateCurrencyModal,
  'createAccountsModal': CreateAccountsModal,
  'editAccountWithStorages': EditAccountWithStorages,
  'editAggregatedAccount': EditAggregatedAccount,
  'createOpenBalanceModal': CreateOpenBalanceModal,
  'createCashOutModal': CreateCashOutModal,
  'createObligationStorageModal': CreateObligationStorageModal,
  'createOpenBalanceObligationModal': CreateOpenBalanceObligationModal,
  'takeLoanModal': TakeLoanModal,
};
