import { deleteCurrencyApi, getCurrenciesListApi, updateCurrencyApi } from '@apiMethods/cashier';
import { Currency } from '@typings/api/cashier';
import { ID } from '@typings/common';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  currencies: Currency[];
  currentCurrency: Currency | null;
  isLoading: boolean;
}

const { useStore } = storeFactory<Store>({
  currencies: [],
  currentCurrency: null,
  isLoading: true,
});

export const useCurrenciesStore = () => {
  const [state, setState] = useStore();

  const { currencies, isLoading: isCurrenciesLoading, currentCurrency } = state;

  const updateCurrenciesList = async () => {
    setState({
      isLoading: true,
    });
    try {
      const { data } = await getCurrenciesListApi();
      setState({
        currencies: data,
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  const deleteCurrency = async (currentId: ID) => {
    setState({
      isLoading: true,
    });
    try {
      await deleteCurrencyApi(currentId);
      const { data } = await getCurrenciesListApi();
      setState({
        currencies: data,
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  const updateCurrency = async (currentId: ID, newData: Partial<Currency>) => {
    setState({
      isLoading: true,
    });
    try {
      const currentCurrency = await updateCurrencyApi(currentId, newData);
      setState({
        currentCurrency,
        isLoading: false,
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  const setCurrentCurrency = (currency: Currency | null) => {
    setState({
      currentCurrency: currency,
      isLoading: false,
    });
  };

  return {
    currencies,
    isCurrenciesLoading,
    currentCurrency,
    updateCurrenciesList,
    deleteCurrency,
    updateCurrency,
    setCurrentCurrency,
  };
};
