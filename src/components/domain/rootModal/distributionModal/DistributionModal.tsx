import { useEffect, useState } from 'react';
import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { fromAmountApi, toAmountApi } from '@utils/amount';
import { debounce } from 'lodash';
import { fromEntityToOptionsList } from 'src/adapters/fromEntityToOptionsList';

import { createAccountTitle } from '../utils/createTitile';

type DebitAccount = {
  moneyStorageId: number;
  amount: number;
  debitId: number;
}

type FormData = {
  description?: string;
  debitAccounts: DebitAccount[];
}

export const DistributionModal: React.FC = () => {
  const {
    createTransfer,
  } = useTransactionsStore();
  const {
    accountsWithStoresForParams,
    currentAccountWithStore,
    isAccountsLoading,
    updateAccountsListParams,
  } = useAccountsStore();
  const {
    moneyStorages,
  } = useMoneyStoragesStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const accountsFiltered = accountsWithStoresForParams.filter(({ id }) => (
    id !== currentAccountWithStore?.id
  ));
  const accountsOptions = accountsFiltered.map((({
    id,
    name,
    moneyStorage,
    available,
    currency
  }) => ({
    value: id,
    label: `${name}: ${moneyStorage?.name ?? 'n/a'}, ${fromAmountApi(available)} ${currency?.code ?? ''}`,
  })));

  const moneyStoragesOptions = fromEntityToOptionsList(moneyStorages);

  const updateFilterAccounts = debounce((filterData: FormData) => {
    updateAccountsListParams({
      // moneyStoragesIds: filterData.moneyStorageId ? [filterData.moneyStorageId.toString()] : undefined,
      moneyStoragesIds: undefined,
    });
  }, 500);

  const onSubmit = async ({
    description,
  }: FormData) => {
    if (!currentAccountWithStore) {
      return;
    }

    // await createTransfer({
    //   amount: toAmountApi(amount),
    //   description: description ?? null,
    //   creditId: currentAccountWithStore.id,
    //   debitId,
    // });
    window.location.reload();
  };

  // useEffect(() => {
  //   updateAccountsListParams({
  //     status: [AccountStatus.ACTIVE],
  //   });
  // }, []);

  useEffect(() => {
    if (!isAccountsLoading) {
      setIsLoading(false);
    }
  }, [isAccountsLoading]);

  return (
    <CreateEntityModal<any & FormData, FormData >
      title={createAccountTitle(currentAccountWithStore, { title: 'Distribution' })}
      onSubmit={onSubmit}
      rows={[
        {
          initialValue: 0,
          label: 'Amount',
          name: 'amount',
          isRequired: true,
          type: 'inputNumber',
          min: 0.01,
          max: currentAccountWithStore?.available,
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
          type: 'button',
          name: 'buttonClick',
          buttonLabel: 'Add distribution account',
          onClick: (e) => { console.log(e);}
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
          label: 'Debit account',
          name: 'debitId',
          isRequired: true,
          type: 'select',
          isSearch: true,
          isSort: true,
          options: accountsOptions,
        },
        { label: 'Description', name: 'description', type: 'textarea' },
      ]}
      isLoading={isLoading}
    />
  );
};
