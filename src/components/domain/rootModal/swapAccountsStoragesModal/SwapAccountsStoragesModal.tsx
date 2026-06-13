import { useEffect, useState } from 'react';
import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useAccountsLoading } from '@hooks/domain/useAccountsLoading';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { AccountWithStore, NewTransfer } from '@typings/api/cashier';
import { AccountStatus } from '@typings/api/generated';
import { fromAmountApi, toAmountApi } from '@utils/amount';
import { Form } from 'antd';
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

export const SwapAccountsStoragesModal: React.FC = () => {
  const { swapAccounts } = useTransactionsStore();
  const { currentAccountWithStore } = useAccountsStore();
  const { moneyStorages } = useMoneyStoragesStore();
  const [formInstance] = Form.useForm<FormData>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const moneyStoragesOptions = fromEntityToOptionsList(
    moneyStorages.filter(({ id }) => id !== currentAccountWithStore?.moneyStorageId)
  );

  const firstDebitAccountsState = useAccountsLoading();
  const secondCreditAccountsState = useAccountsLoading();
  const secondDebitAccountsState = useAccountsLoading();

  const firstDebitAccountsFilterUpdate = ({
    query,
  }: {
    query?: string;
  } = {}) => {
    const { secondMoneyStorageId } = formInstance.getFieldsValue();

    if (!secondMoneyStorageId) {
      return;
    }

    firstDebitAccountsState.patchFilters({
      notMoneyStoragesIds: currentAccountWithStore?.moneyStorageId ?
        [currentAccountWithStore.moneyStorageId] :
        undefined,
      moneyStoragesIds: [secondMoneyStorageId],
      status: [AccountStatus.ACTIVE],
      query,
      pageSize: 1000,
    });
  };

  const secondCreditAccountsFilterUpdate = ({
    query,
  }: {
    query?: string;
  } = {}) => {
    const { secondMoneyStorageId, amount } = formInstance.getFieldsValue();

    if (!secondMoneyStorageId) {
      return;
    }

    secondCreditAccountsState.patchFilters({
      notMoneyStoragesIds: currentAccountWithStore?.moneyStorageId ?
        [currentAccountWithStore.moneyStorageId] :
        undefined,
      moneyStoragesIds: [secondMoneyStorageId],
      balanceFrom: amount ? toAmountApi(amount) : 1,
      status: [AccountStatus.ACTIVE],
      query,
      pageSize: 1000,
    });
  };

  const secondDebitAccountsFilterUpdate = ({
    query,
  }: {
    query?: string;
  } = {}) => {
    secondDebitAccountsState.patchFilters({
      moneyStoragesIds: currentAccountWithStore?.moneyStorageId ?
        [currentAccountWithStore.moneyStorageId] :
        undefined,
      status: [AccountStatus.ACTIVE],
      query,
      pageSize: 1000,
    });
  };

  const onSecondStorageChange = () => {
    formInstance.setFieldsValue({
      firstDebitId: undefined,
      secondCreditId: undefined,
      secondDebitId: undefined,
    });
    firstDebitAccountsState.pin(null);
    secondCreditAccountsState.pin(null);

    firstDebitAccountsFilterUpdate();
    secondCreditAccountsFilterUpdate();
  };

  const trySetSecondDebitAccount = () => {
    const { secondCreditId } = formInstance.getFieldsValue();

    if (!secondCreditId || !currentAccountWithStore) {
      return;
    }

    const secondCreditAccount = secondCreditAccountsState.accounts.find(
      ({ id }) => id === secondCreditId
    );

    if (!secondCreditAccount) {
      return;
    }

    const foundedAccount = secondDebitAccountsState.accounts.find(({ name, moneyStorageId }) =>
      name.toLowerCase() === secondCreditAccount.name.toLowerCase() &&
      moneyStorageId === currentAccountWithStore.moneyStorageId);

    if (foundedAccount) {
      secondDebitAccountsState.pin(foundedAccount.id);
      formInstance.setFieldValue('secondDebitId', foundedAccount.id);
    }
  };

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

    setIsSubmitting(true);
    try {
      await swapAccounts({
        amount: toAmountApi(amount),
        description: description ?? null,
        firstCreditId: currentAccountWithStore.id,
        firstDebitId,
        secondCreditId,
        secondDebitId,
      });
      window.location.reload();
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const { secondMoneyStorageId, firstDebitId } = formInstance.getFieldsValue();

    if (firstDebitId || !secondMoneyStorageId || !currentAccountWithStore) {
      return;
    }

    const foundedAccount = firstDebitAccountsState.accounts.find(({ name, moneyStorageId }) =>
      name.toLowerCase() === currentAccountWithStore.name.toLowerCase() &&
      moneyStorageId === secondMoneyStorageId);

    if (foundedAccount) {
      firstDebitAccountsState.pin(foundedAccount.id);
      formInstance.setFieldValue('firstDebitId', foundedAccount.id);
    }
  }, [firstDebitAccountsState.accounts]);

  useEffect(() => {
    secondDebitAccountsFilterUpdate();
  }, []);

  return (
    <CreateEntityModal<NewTransfer & FormData, FormData >
      title={createAccountTitle(currentAccountWithStore, { title: 'Swap' })}
      onSubmit={onSubmit}
      form={formInstance}
      isLoading={isSubmitting}
      rows={[
        {
          label: 'Amount',
          name: 'amount',
          isRequired: true,
          type: 'inputNumber',
          min: 0.01,
          max: Number(fromAmountApi(currentAccountWithStore?.available ?? 0)),
          precision: 2,
          step: '0.01',
          formatter: (value) => {
            if (!value) {
              return value;
            }
            return Number(Number(value).toFixed(2));
          },
          suffix: currentAccountWithStore?.currency.code ?? 'n/a',
          onChange: () => secondCreditAccountsFilterUpdate(),
        },
        {
          label: 'Select second Money Storage',
          name: 'secondMoneyStorageId',
          type: 'select',
          isSearch: true,
          options: moneyStoragesOptions,
          onChange: () => onSecondStorageChange(),
        },
        {
          label: 'First debit account',
          name: 'firstDebitId',
          isRequired: true,
          type: 'select',
          isSort: true,
          loading: firstDebitAccountsState.isLoading,
          options: createOptionsFromAccounts(firstDebitAccountsState.accounts),
          onSearch: (query) => firstDebitAccountsFilterUpdate({ query: query || undefined }),
          onChange: (value) => firstDebitAccountsState.pin(Number(value)),
        },
        {
          label: 'Second credit account',
          name: 'secondCreditId',
          isRequired: true,
          type: 'select',
          isSort: true,
          loading: secondCreditAccountsState.isLoading,
          options: createOptionsFromAccounts(secondCreditAccountsState.accounts),
          onSearch: (query) => secondCreditAccountsFilterUpdate({ query: query || undefined }),
          onChange: (value) => {
            secondCreditAccountsState.pin(Number(value));
            trySetSecondDebitAccount();
          },
        },
        {
          label: 'Second debit account',
          name: 'secondDebitId',
          isRequired: true,
          type: 'select',
          isSort: true,
          loading: secondDebitAccountsState.isLoading,
          options: createOptionsFromAccounts(secondDebitAccountsState.accounts),
          onSearch: (query) => secondDebitAccountsFilterUpdate({ query: query || undefined }),
          onChange: (value) => secondDebitAccountsState.pin(Number(value)),
        },
        { label: 'Description', name: 'description', type: 'textarea' },
      ]}
    />
  );
};
