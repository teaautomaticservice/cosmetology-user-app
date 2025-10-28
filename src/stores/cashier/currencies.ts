import { deleteCurrencyApi, getCurrenciesListApi } from '@apiMethods/cashier';
import { CurrencyDto } from '@typings/api/generated';
import { ID } from '@typings/common';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  currencies: CurrencyDto[];
  isLoading: boolean;
}

const { useStore } = storeFactory<Store>({
  currencies: [],
  isLoading: true,
});

export const useCurrenciesStore = () => {
  const [state, setState] = useStore();

  const { currencies, isLoading: isCurrenciesLoading } = state;

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

  return {
    currencies,
    isCurrenciesLoading,
    updateCurrenciesList,
    deleteCurrency,
  };
};
