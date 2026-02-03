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
  debitId: number;
  creditId: number;
  obligationStorageId?: number;
}

export const CreateLoanRepaymentModal: React.FC = () => {
  const {
    currentAccountWithStore,
    accountsWithStoresForParams,
    updateAccountsListParams,
  } = useAccountsStore();
  const {
    createLoanRepayment,
  } = useTransactionsStore();
  const {
    moneyStorages,
  } = useMoneyStoragesStore();

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
  const moneyStoragesOptions = fromEntityToOptionsList(moneyStorages);

  const updateFilterAccounts = debounce((filterData: FormData) => {
    updateAccountsListParams({
      moneyStoragesIds: filterData.obligationStorageId ? [filterData.obligationStorageId.toString()] : undefined,
    });
  }, 500);

  const onSubmit = async ({
    amount,
    description,
    creditId,
    debitId,
  }: FormData) => {
    if (!currentAccountWithStore) {
      return;
    }

    await createLoanRepayment({
      amount: toAmountApi(amount),
      description: description ?? null,
      creditObligationAccountId: currentAccountWithStore.id,
      creditId,
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
          onChange: (_, formInstance) =>
            updateFilterAccounts(formInstance.getFieldsValue()),
          suffix: currentAccountWithStore?.currency.code ?? 'n/a',
        },
        {
          label: 'Filter accounts by Money Storage',
          name: 'obligationStorageId',
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
