import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { dateUtils } from '@shared/utils/dateUtils';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { NewRefundInApi } from '@typings/api/cashier';
import { fromAmountApi, toAmountApi } from '@utils/amount';
import cn from 'classnames';

type FormData = {
  amount: number;
  description?: string;
}

export const CreateRefundInModal: React.FC = () => {
  const {
    isLoading,
    currentTransactions,
    createRefundIn,
  } = useTransactionsStore();

  const suffix = currentTransactions?.creditAccount?.currency?.code ?? 'n/a';

  const onSubmit = async ({
    amount,
    description,
  }: FormData) => {
    if (!currentTransactions) {
      return;
    }

    await createRefundIn({
      amount: toAmountApi(amount),
      description: description ?? null,
      transactionId: currentTransactions.transactionId,
    });
    window.location.reload();
  };

  return (
    <CreateEntityModal<NewRefundInApi, FormData>
      title={cn(
        'Refund In:',
        currentTransactions?.executionDate &&
        dateUtils.formattedDateWithTime(new Date(currentTransactions?.executionDate)),
        currentTransactions?.operationType,
        ';',
        currentTransactions?.transactionId,
        'Available:',
        fromAmountApi(currentTransactions?.amount ?? 0),
        currentTransactions?.operationType,
        currentTransactions?.description,
      )}
      onSubmit={onSubmit}
      rows={[
        {
          initialValue: fromAmountApi(currentTransactions?.amount ?? 0),
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
          suffix,
        },
        { label: 'Description', name: 'description', type: 'textarea' },
      ]}
      isLoading={isLoading}
    />
  );
};
