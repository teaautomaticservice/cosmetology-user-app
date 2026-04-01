import { useEffect, useState } from 'react';
import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useObligationAccountStore } from '@stores/cashier/obligationAccount';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { AccountWithStorageStatusEnum, NewLoan } from '@typings/api/cashier';
import { toAmountApi } from '@utils/amount';
import { fromEntityToOptionsList } from 'src/adapters/fromEntityToOptionsList';

import { createTitle } from '../utils/createTitile';

type FormData = {
  description?: string;
  amount: number;
  creditObligationStorageId: number;
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

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const activeObligationStorages =
    obligationAccountsStorages?.filter(({ status }) => status === AccountWithStorageStatusEnum.ACTIVE);
  const optionsObligationsStorages = fromEntityToOptionsList(activeObligationStorages);

  const onSubmit = async ({
    amount,
    description,
    creditObligationStorageId,
  }: FormData) => {
    if (!currentAccountWithStore) {
      return;
    }

    await createLent({
      amount: toAmountApi(amount),
      creditObligationStorageId,
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
          suffix: currentAccountWithStore?.currency.code ?? 'n/a',
        },
        {
          label: 'Obligation Storage',
          name: 'creditObligationStorageId',
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
