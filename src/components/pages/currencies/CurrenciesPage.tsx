import { useEffect } from 'react';
import { Currencies } from '@components/domain/currencies/Currencies';
import { useCurrenciesStore } from '@stores/cashier/currencies';

export const CurrenciesPage: React.FC = () => {
  const {
    updateCurrenciesList,
  } = useCurrenciesStore();

  useEffect(() => {
    updateCurrenciesList();
  }, []);

  return (
    <Currencies />
  );
};
