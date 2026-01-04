import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { NewTransaction } from '@typings/api/cashier';
import { toAmountApi } from '@utils/amount';

type FormData = {
  amount: number;
  description?: string;
}

export const CreateReceiptModal: React.FC = () => {
  const {
    isAccountsLoading,
    currentAccountWithStore,
  } = useAccountsStore();
  const {
    createReceipt,
  } = useTransactionsStore();

  const onSubmit = async ({
    amount,
    description,
  }: FormData) => {
    if (!currentAccountWithStore) {
      return;
    }

    await createReceipt({
      amount: toAmountApi(amount),
      description: description ?? null,
      debitId: currentAccountWithStore.id,
      creditId: null,
    });
    window.location.reload();
  };

  return (
    <CreateEntityModal<NewTransaction, FormData>
      title="Receipt"
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
