import { useEffect } from 'react';
import { MoneyStorages } from '@components/domain/moneyStorages/MoneyStorages';
import { useMoneyStoragesPageStore } from '@stores/pages/moneyStoragesPage';

export const MoneyStoragePage: React.FC = () => {
  const {
    updateMoneyStorages,
    updateTransactionsList,
    updateCurrenciesList,
  } = useMoneyStoragesPageStore();

  useEffect(() => {
    updateMoneyStorages();
    updateTransactionsList();
    updateCurrenciesList();
  }, []);

  return (
    <MoneyStorages />
  );
};
