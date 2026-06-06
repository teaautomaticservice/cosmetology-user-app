import { useEffect, useMemo, useState } from 'react';
import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { AccountWithStore, NewTransfer } from '@typings/api/cashier';
import { AccountStatus } from '@typings/api/generated';
import { fromAmountApi, toAmountApi } from '@utils/amount';
import { debounce } from 'lodash';
import { fromEntityToOptionsList } from 'src/adapters/fromEntityToOptionsList';

import { createAccountTitle } from '../utils/createAccountTitle';

type FormData = {
  moneyStorageId?: number;
  description?: string;
  amount: number;
  firstDebitId: number;
  secondCreditId: number;
  secondDebitId: number;
}

export const ExchangeAccountsStoragesModal: React.FC = () => {
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
  const [selectedSecondMoneyStorageId, setSelectedSecondMoneyStorageId] =
    useState<number | null>(null);
  const [selectedSecondCreditAccount, setSelectedSecondCreditAccount] =
    useState<AccountWithStore | null>(null);

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

  const secondDebitAccount = useMemo<AccountWithStore | undefined>(() => {
    if (!selectedSecondMoneyStorageId) {
      return;
    }

    console.log(currentAccountWithStore?.id, selectedSecondCreditAccount?.name, accountsWithStoresForParams);

    return accountsWithStoresForParams.find(({
      moneyStorageId,
      name,
    }) => (
      moneyStorageId === currentAccountWithStore?.id &&
      name === selectedSecondCreditAccount?.name
    ));
  }, [
    accountsWithStoresForParams,
    currentAccountWithStore,
    selectedSecondMoneyStorageId,
    selectedSecondCreditAccount,
  ]);

  const moneyStoragesOptions = fromEntityToOptionsList(moneyStorages);

  const updateFilterAccounts = debounce((filterData: FormData) => {
    updateAccountsListParams({
      moneyStoragesIds: [
        // ...(currentAccountWithStore?.moneyStorageId ? [currentAccountWithStore.moneyStorageId.toString()] : []),
        ...(filterData?.moneyStorageId ? [filterData.moneyStorageId.toString()] : []),
      ],
    });
  }, 500);

  const onSubmit = async ({
    amount,
    description,
    firstDebitId,
    secondCreditId,
    secondDebitId,
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
    // window.location.reload();
  };

  const onFormChange = (formData: FormData | undefined) => {
    if (!formData) {
      return;
    }

    const {
      moneyStorageId,
      secondCreditId,
    } = formData;
    
    setSelectedSecondMoneyStorageId(moneyStorageId ?? null);
    const secondCreditAccount = accountsWithStoresForParams.find(({ id }) => id === secondCreditId);
    setSelectedSecondCreditAccount(secondCreditAccount ?? null);
  };

  useEffect(() => {
    updateAccountsListParams({
      status: [AccountStatus.ACTIVE],
    });
  }, []);

  useEffect(() => {
    if (!isAccountsLoading) {
      setIsLoading(false);
    }
  }, [isAccountsLoading]);

  return (
    <CreateEntityModal<NewTransfer & FormData, FormData >
      title={createAccountTitle(currentAccountWithStore, { title: secondDebitAccount?.name ?? '' })}
      onSubmit={onSubmit}
      onFormChange={onFormChange}
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
          label: 'Filter accounts by Money Storage',
          name: 'moneyStorageId',
          type: 'select',
          isSearch: true,
          options: moneyStoragesOptions,
          onChange: (_, formInstance) =>
            updateFilterAccounts(formInstance.getFieldsValue()),
        },
        {
          label: 'First debit account',
          name: 'firstDebitId',
          isRequired: true,
          type: 'select',
          isSearch: true,
          isSort: true,
          options: accountsOptions,
        },
        {
          label: 'Second credit account',
          name: 'secondCreditId',
          isRequired: true,
          type: 'select',
          isSearch: true,
          isSort: true,
          options: accountsOptions,
        },
        {
          label: 'Second debit account',
          name: 'secondDebitId',
          isRequired: true,
          type: 'select',
          isSearch: true,
          isSort: true,
          options: accountsOptions,
          initialValue: secondDebitAccount?.id,
        },
        { label: 'Description', name: 'description', type: 'textarea' },
      ]}
      isLoading={isLoading}
    />
  );
};
