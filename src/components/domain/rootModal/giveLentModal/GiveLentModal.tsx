import { useEffect, useState } from 'react';
import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { useObligationAccountStore } from '@stores/cashier/obligationAccount';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { AccountWithStorageStatusEnum, NewLoan } from '@typings/api/cashier';
import { toAmountApi } from '@utils/amount';
import { debounce } from 'lodash';
import { fromEntityToOptionsList } from 'src/adapters/fromEntityToOptionsList';

import { createTitle } from '../utils/createTitile';

type FormData = {
  moneyStorageId: number;
  description?: string;
  amount: number;
  creditObligationAccountId: number;
}

export const GiveLentModal: React.FC = () => {
  const {
    obligationAccountsStorages,
  } = useObligationAccountStore();
  const {
    createLent,
  } = useTransactionsStore();
  const {
    currentAccountWithStore,
    isAccountsLoading,
    updateAccountsListParams,
  } = useAccountsStore();
  const {
    moneyStorages,
  } = useMoneyStoragesStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const moneyStoragesOptions = fromEntityToOptionsList(moneyStorages);
  const activeObligationStorages =
    obligationAccountsStorages?.filter(({ status }) => status === AccountWithStorageStatusEnum.ACTIVE);
  const optionsObligationsStorages = fromEntityToOptionsList(activeObligationStorages);

  const updateFilterAccounts = debounce((filterData: FormData) => {
    updateAccountsListParams({
      balanceFrom: toAmountApi(filterData.amount ?? 1),
      moneyStoragesIds: filterData.moneyStorageId ? [filterData.moneyStorageId.toString()] : undefined,
    });
  }, 500);

  const onSubmit = async ({
    amount,
    description,
    creditObligationAccountId,
  }: FormData) => {
    if (!currentAccountWithStore) {
      return;
    }

    await createLent({
      amount: toAmountApi(amount),
      creditObligationAccountId,
      description: description ?? null,
      creditId: currentAccountWithStore.id,
    });
    window.location.reload();
  };

  useEffect(() => {
    updateAccountsListParams({
      balanceFrom: 1,
    });
  }, []);

  useEffect(() => {
    if (!isAccountsLoading) {
      setIsLoading(false);
    }
  }, [isAccountsLoading]);

  return (
    <CreateEntityModal<NewLoan & FormData, FormData >
      title={createTitle(currentAccountWithStore, { title: 'Give lent' })}
      onSubmit={onSubmit}
      rows={[
        {
          initialValue: 0,
          label: 'Amount',
          name: 'amount',
          isRequired: true,
          type: 'inputNumber',
          min: 0.01,
          precision: 2,
          step: '0.01',
          formatter: (value) => {
            if (!value) {
              return value;
            }
            return Number(Number(value).toFixed(2));
          },
          onChange: (_, formInstance) =>
            updateFilterAccounts(formInstance.getFieldsValue()),
          suffix: currentAccountWithStore?.currency.code ?? 'n/a',
        },
        {
          label: 'Filter accounts by Money Storage',
          name: 'moneyStorageId',
          type: 'select',
          isSearch: true,
          options: moneyStoragesOptions,
          onChange: (_, formInstance) =>
            updateFilterAccounts(formInstance.getFieldsValue()),
        },
        {
          label: 'Obligation Storage',
          name: 'creditObligationAccountId',
          isRequired: true,
          type: 'select',
          isSearch: true,
          options: optionsObligationsStorages,
        },
        { label: 'Description', name: 'description', type: 'textarea' },
      ]}
      isLoading={isLoading}
    />
  );
};
