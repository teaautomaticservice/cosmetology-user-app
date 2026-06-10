import { useEffect, useMemo, useState } from 'react';
import { getAccountsWithMoneyStoragesApi } from '@apiMethods/cashier';
import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useApiCall } from '@hooks/useApiCall';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
// import { useTransactionsStore } from '@stores/cashier/transactions';
import { AccountWithStore, NewTransfer } from '@typings/api/cashier';
import { AccountStatus } from '@typings/api/generated';
import { fromAmountApi, toAmountApi } from '@utils/amount';
import { FormInstance } from 'antd';
import { debounce } from 'lodash';
import { fromEntityToOptionsList } from 'src/adapters/fromEntityToOptionsList';

import { createAccountTitle } from '../utils/createAccountTitle';

type FormData = {
  description?: string;
  amount: number;
  firstDebitId: number;
  secondCreditId: number;
  secondDebitId: number;
  secondMoneyStorageId?: number;
}

const createOptionsFromAccounts = (list: AccountWithStore[]) =>
  list.map((({
    id,
    name,
    moneyStorage,
    available,
    currency
  }) => ({
    value: id,
    label: `${name}: ${moneyStorage?.name ?? 'n/a'}, ${fromAmountApi(available)} ${currency?.code ?? ''}`,
  })));

export const ExchangeAccountsStoragesModal: React.FC = () => {
  // const { createTransfer } = useTransactionsStore();
  const { currentAccountWithStore } = useAccountsStore();
  const { moneyStorages } = useMoneyStoragesStore();

  const {
    execute: updateAccountsList,
    isApiLoading: isAccountsLoading,
    data,
  } = useApiCall(getAccountsWithMoneyStoragesApi);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedSecondMoneyStorageId, setSelectedSecondMoneyStorageId] =
    useState<number | null>(null);
  const [currentAmount, setCurrentAmount] =
    useState<number>(0);

  const { data: accountsList } = data ?? {};

  const firstStorageAccounts = useMemo<AccountWithStore[]>(() =>
    accountsList?.filter(({ moneyStorageId }) => (moneyStorageId === currentAccountWithStore?.moneyStorageId)) ?? [],
  [accountsList]);

  const secondStorageAccounts = useMemo<AccountWithStore[]>(() => {
    if (!accountsList) {
      return [];
    }

    if (!selectedSecondMoneyStorageId) {
      return accountsList.filter(({ moneyStorageId }) => (moneyStorageId !== currentAccountWithStore?.moneyStorageId));
    }

    return accountsList.filter(({ moneyStorageId }) => (moneyStorageId === selectedSecondMoneyStorageId));
  }, [accountsList, selectedSecondMoneyStorageId, currentAmount]);

  const firstStorageAccountsOptions = createOptionsFromAccounts(firstStorageAccounts);
  const secondStorageAccountsOptions = createOptionsFromAccounts(secondStorageAccounts);
  const secondCreditAccountsOptions = createOptionsFromAccounts(
    secondStorageAccounts.filter(
      ({ available }) =>
        available >= toAmountApi(currentAmount) &&
        available > 0
    )
  );

  const moneyStoragesOptions = fromEntityToOptionsList(
    moneyStorages.filter(({ id }) => id !== currentAccountWithStore?.moneyStorageId)
  );

  const updateFilterAccounts = debounce(async (moneyStorageId?: number) => {
    setIsLoading(true);
    try {
      await updateAccountsList({
        moneyStoragesIds: [
          ...(currentAccountWithStore?.moneyStorageId ? [currentAccountWithStore.moneyStorageId.toString()] : []),
          ...(moneyStorageId ? [moneyStorageId.toString()] : []),
        ],
        status: [AccountStatus.ACTIVE],
      });
    } finally {
      setIsLoading(false);
    }
  }, 500);

  const onSecondStorageChange = (form: FormInstance<FormData>) => {
    const { secondMoneyStorageId } = form.getFieldsValue();

    setSelectedSecondMoneyStorageId(secondMoneyStorageId ?? null);

    if (!secondMoneyStorageId || !currentAccountWithStore) {
      return;
    }

    updateFilterAccounts(secondMoneyStorageId);

    const foundedAccount = accountsList?.find(({ name, moneyStorageId }) =>
      name.toLowerCase() === currentAccountWithStore.name.toLowerCase() &&
      moneyStorageId === secondMoneyStorageId);

    form.setFieldValue('firstDebitId', foundedAccount?.id);
  };

  const onSecondCreditAccountChange = (form: FormInstance<FormData>) => {
    const formData = form.getFieldsValue();
    const secondCreditAccount = accountsList?.find(({ id }) => id === formData?.secondCreditId);

    if (!secondCreditAccount || !currentAccountWithStore) {
      return;
    }

    const foundedAccount = accountsList?.find(({ name, moneyStorageId }) =>
      name.toLowerCase() === secondCreditAccount.name.toLowerCase() &&
      moneyStorageId === currentAccountWithStore.moneyStorageId);

    form.setFieldValue('secondDebitId', foundedAccount?.id);
  };

  const onSubmit = async ({
    // amount,
    // description,
    // firstDebitId,
    // secondCreditId,
    // secondDebitId,
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

  useEffect(() => {
    updateAccountsList({
      status: [AccountStatus.ACTIVE],
      pageSize: 1000,
    });
  }, []);

  useEffect(() => {
    if (!isAccountsLoading) {
      setIsLoading(false);
    }
  }, [isAccountsLoading]);

  return (
    <CreateEntityModal<NewTransfer & FormData, FormData >
      title={createAccountTitle(currentAccountWithStore, { title: 'Exchange' })}
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
          suffix: currentAccountWithStore?.currency.code ?? 'n/a',
          onChange: (_, form) =>
            setCurrentAmount(form.getFieldValue('amount') ?? 0)
        },
        {
          label: 'Select second Money Storage',
          name: 'secondMoneyStorageId',
          type: 'select',
          isSearch: true,
          options: moneyStoragesOptions,
          onChange: (_, formInstance) =>
            onSecondStorageChange(formInstance),
          initialValue: currentAmount,
        },
        {
          label: 'First debit account',
          name: 'firstDebitId',
          isRequired: true,
          type: 'select',
          isSearch: true,
          isSort: true,
          options: secondStorageAccountsOptions,
        },
        {
          label: 'Second credit account',
          name: 'secondCreditId',
          isRequired: true,
          type: 'select',
          isSearch: true,
          isSort: true,
          options: secondCreditAccountsOptions,
          onChange: (_, formInstance) =>
            onSecondCreditAccountChange(formInstance)
        },
        {
          label: 'Second debit account',
          name: 'secondDebitId',
          isRequired: true,
          type: 'select',
          isSearch: true,
          isSort: true,
          options: firstStorageAccountsOptions,
        },
        { label: 'Description', name: 'description', type: 'textarea' },
      ]}
      isLoading={isLoading}
    />
  );
};
