import { createCurrencyApi, deleteCurrencyApi, getCurrenciesListApi, updateCurrencyApi } from '@apiMethods/cashier';
import { CreateCurrencyData, Currency } from '@typings/api/cashier';
import { ID } from '@typings/common';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  currencies: Currency[];
  currenciesCount: number;
  currentCurrency: Currency | null;
  isLoading: boolean;
}

const { useStore } = storeFactory<Store>({
  currencies: [],
  currenciesCount: 0,
  currentCurrency: null,
  isLoading: true,
});

export const useCurrenciesStore = () => {
  const [state, setState] = useStore();

  const {
    currencies,
    isLoading: isCurrenciesLoading,
    currentCurrency,
    currenciesCount,
  } = state;

  const updateCurrenciesList = async () => {
    setState({
      isLoading: true,
    });
    try {
      const { data, meta } = await getCurrenciesListApi();
      setState({
        currencies: data,
        currenciesCount: meta.count,
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

  const createCurrency = async (newData: CreateCurrencyData) => {
    setState({
      isLoading: true,
    });
    try {
      await createCurrencyApi(newData);
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  return {
    currencies,
    isCurrenciesLoading,
    currentCurrency,
    currenciesCount,
    updateCurrenciesList,
    deleteCurrency,
    updateCurrency,
    setCurrentCurrency,
    createCurrency,
  };
};
