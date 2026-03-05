import { useEffect } from 'react';
import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { NewTransaction } from '@typings/api/cashier';
import { fromAmountApi, toAmountApi } from '@utils/amount';
import { debounce } from 'lodash';
import { fromEntityToOptionsList } from 'src/adapters/fromEntityToOptionsList';

import { createTitle } from '../utils/createTitile';

type FormData = {
  amount: number;
  description?: string;
  storageId?: string;
  debitId: number;
}

export const CreateLentRepaymentModal: React.FC = () => {
  const {
    currentAccountWithStore,
    accountsWithStoresForParams,
    updateAccountsListParams,
  } = useAccountsStore();
  const {
    createLentRepayment,
  } = useTransactionsStore();
  const {
    moneyStorages,
  } = useMoneyStoragesStore();

  const moneyStoragesOptions = fromEntityToOptionsList(moneyStorages);
  const accountsOptions = accountsWithStoresForParams.map((({
    id,
    name,
    moneyStorage,
    available,
    currency
  }) => ({
    value: id,
    label: `${name}: ${moneyStorage?.name ?? 'n/a'}, ${fromAmountApi(available)} ${currency?.code ?? ''}`,
  })));

  const updateFilterAccounts = debounce((filterData: FormData) => {
    updateAccountsListParams({
      moneyStoragesIds: filterData.storageId ? [filterData.storageId.toString()] : undefined,
    });
  }, 500);

  const onSubmit = async ({
    amount,
    description,
    debitId,
  }: FormData) => {
    if (!currentAccountWithStore) {
      return;
    }

    await createLentRepayment({
      amount: toAmountApi(amount),
      description: description ?? null,
      obligationAccountId: currentAccountWithStore.id,
      debitId
    });
    window.location.reload();
  };

  useEffect(() => {
    updateAccountsListParams();
  }, []);

  return (
    <CreateEntityModal<NewTransaction & FormData, FormData>
      title={createTitle(currentAccountWithStore, { title: 'Loan Repayment' })}
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
          suffix: currentAccountWithStore?.currency.code ?? 'n/a',
        },
        {
          label: 'Filter accounts by Money Storage',
          name: 'storageId',
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
    />
  );
};
