import { useState } from 'react';
import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useCurrenciesStore } from '@stores/cashier/currencies';
import { useObligationAccountStore } from '@stores/cashier/obligationAccount';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { Currency, NewOpenBalanceObligation } from '@typings/api/cashier';
import { toAmountApi } from '@utils/amount';
import { fromEntityToOptionsList } from 'src/adapters/fromEntityToOptionsList';

type FormData = {
  amount: number;
  description?: string;
  debitName: string;
  currencyId: number;
}

export const CreateOpenBalanceObligationModal: React.FC = () => {
  const {
    currentObligationStorage,
  } = useObligationAccountStore();
  const {
    isLoading,
    createOpenBalanceObligation,
  } = useTransactionsStore();
  const {
    activeCurrencies,
  } = useCurrenciesStore();

  const [currentCurrency, setCurrentCurrency] = useState<Currency | null>();

  const currenciesOptions = fromEntityToOptionsList(activeCurrencies);

  const onChangeCurrency = (currentId: number) => {
    const selectedCurrency = activeCurrencies.find(({ id }) => id === currentId );
    setCurrentCurrency(selectedCurrency ?? null);
  };

  const onSubmit = async ({
    amount,
    description,
    currencyId,
    debitName,
  }: FormData) => {
    if (!currentObligationStorage) {
      return;
    }

    await createOpenBalanceObligation({
      amount: toAmountApi(amount),
      obligationStorageId: currentObligationStorage.id,
      description: description ?? null,
      currencyId,
      debitName,
    });
    window.location.reload();
  };

  return (
    <CreateEntityModal<NewOpenBalanceObligation, FormData>
      title="Open Balance"
      onSubmit={onSubmit}
      rows={[
        { label: 'Debit Name', name: 'debitName', isRequired: true },
        {
          label: 'Currency',
          name: 'currencyId',
          isRequired: true,
          type: 'select',
          options: currenciesOptions,
          onChange: onChangeCurrency,
        },
        {
          initialValue: 0,
          label: 'Amount',
          name: 'amount',
          isRequired: true,
          type: 'inputNumber',
          min: 0,
          precision: 2,
          step: '0.01',
          formatter: (value) => {
            if (!value) {
              return value;
            }
            return Number(Number(value).toFixed(2));
          },
          suffix: currentCurrency?.code ?? 'n/a',
        },
        { label: 'Description', name: 'description', type: 'textarea' },
      ]}
      isLoading={isLoading}
    />
  );
};
