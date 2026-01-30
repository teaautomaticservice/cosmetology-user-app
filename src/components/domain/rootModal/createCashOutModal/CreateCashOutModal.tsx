import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { NewTransaction } from '@typings/api/cashier';
import { fromAmountApi, toAmountApi } from '@utils/amount';
import cn from 'classnames';

type FormData = {
  amount: number;
  description?: string;
}

export const CreateCashOutModal: React.FC = () => {
  const {
    isAccountsLoading,
    currentAccountWithStore,
  } = useAccountsStore();
  const {
    createCashOut,
  } = useTransactionsStore();

  const onSubmit = async ({
    amount,
    description,
  }: FormData) => {
    if (!currentAccountWithStore) {
      return;
    }

    await createCashOut({
      amount: toAmountApi(amount),
      description: description ?? null,
      debitId: null,
      creditId: currentAccountWithStore.id,
    });
    window.location.reload();
  };

  return (
    <CreateEntityModal<NewTransaction, FormData>
      title={cn(
        'Cash Out',
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
          suffix: currentAccountWithStore?.currency.code ?? 'n/a',
        },
        { label: 'Description', name: 'description', type: 'textarea' },
      ]}
      isLoading={isAccountsLoading}
    />
  );
};
