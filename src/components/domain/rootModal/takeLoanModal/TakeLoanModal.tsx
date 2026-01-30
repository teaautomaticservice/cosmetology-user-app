import { useEffect, useState } from 'react';
import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { useObligationAccountStore } from '@stores/cashier/obligationAccount';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { AccountWithStorageStatusEnum, NewLoan } from '@typings/api/cashier';
import { fromAmountApi, toAmountApi } from '@utils/amount';
import cn from 'classnames';
import { debounce } from 'lodash';
import { fromEntityToOptionsList } from 'src/adapters/fromEntityToOptionsList';

type FormData = {
  moneyStorageId: number;
  description?: string;
  amount: number;
  obligationStorageId: number;
  creditId: number;
}

export const TakeLoanModal: React.FC = () => {
  const {
    obligationAccountsStorages,
  } = useObligationAccountStore();
  const {
    createLoan,
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

  const accountsFiltered = accountsWithStoresForParams.filter(({ id, name, currencyId }) => (
    id !== currentAccountWithStore?.id &&
    name !== currentAccountWithStore?.name &&
    currencyId === currentAccountWithStore?.currencyId
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
    creditId,
    obligationStorageId,
  }: FormData) => {
    if (!currentAccountWithStore) {
      return;
    }

    await createLoan({
      amount: toAmountApi(amount),
      obligationStorageId,
      description: description ?? null,
      creditId,
      debitId: currentAccountWithStore.id,
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
      title={cn(
        'Take Loan',
        fromAmountApi(currentAccountWithStore?.available ?? 0),
        currentAccountWithStore?.currency.code,
      )}
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
          label: 'Credit account',
          name: 'creditId',
          isRequired: true,
          type: 'select',
          isSearch: true,
          isSort: true,
          options: accountsOptions,
        },
        {
          label: 'Obligation Storage',
          name: 'obligationStorageId',
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
