import { useAppParams } from '@shared/hooks/useParams';
import { PaginationProps } from 'antd';
import { debounce } from 'lodash';

type Props = {
  currenciesPage?: string;
  currenciesPageSize?: string;
  accountsPage?: string;
  accountsPageSize?: string;
  accountsMoneyStoragesIds?: string[];
};

const DEBOUNCE_MS = 100;

export const useAccountsParams = ({
  currenciesUpdater,
  aggregatedAccountUpdater,
}: {
  currenciesUpdater: (...args: any[]) => any;
  aggregatedAccountUpdater: (...args: any[]) => any;
}) => {
  const { params, setParams } = useAppParams<Props>({
    customDefaultKeys: {
      currenciesPage: '1',
      currenciesPageSize: '10',
      accountsPage: '1',
      accountsPageSize: '10',
    },
  });

  const debouncedCurrenciesUpdater = debounce(currenciesUpdater, DEBOUNCE_MS);
  const debouncedAggregatedAccountUpdater = debounce(aggregatedAccountUpdater, DEBOUNCE_MS);

  const updateCurrenciesPagination:
    PaginationProps['onChange'] |
    PaginationProps['onShowSizeChange']
    = (page, pageSize) => {
      setParams({
        currenciesPage: page.toString(),
        currenciesPageSize: pageSize.toString(),
      });
      debouncedCurrenciesUpdater();
    };

  const updateAggregatedAccountsPagination:
    PaginationProps['onChange'] |
    PaginationProps['onShowSizeChange']
    = (page, pageSize) => {
      setParams({
        accountsPage: page.toString(),
        accountsPageSize: pageSize.toString(),
      });
      debouncedAggregatedAccountUpdater();
    };

  const test = ({
    accountsMoneyStoragesIds,
  }: {
      accountsMoneyStoragesIds?: string[];
    }) => {
    setParams({
      accountsMoneyStoragesIds,
    });
  };

  return {
    params,
    setParams,
    updateCurrenciesPagination,
    updateAggregatedAccountsPagination,
    test,
  };
};
