import { useAppParams } from '@shared/hooks/useParams';
import { PaginationProps } from 'antd';
import { debounce } from 'lodash';

type Props = {
  currenciesPage?: string;
  currenciesPageSize?: string;
  aggregatedPage?: string;
  aggregatedPageSize?: string;
};

const DEBOUNCE_MS = 100;

export const useAccountsParams = ({
  currenciesUpdater,
  // aggregatedAccountUpdater,
}: {
  currenciesUpdater: (...args: any[]) => any;
  // aggregatedAccountUpdater: (...args: any[]) => any;
}) => {
  const { params, setParams } = useAppParams<Props>({
    customDefaultKeys: {
      currenciesPage: '1',
      currenciesPageSize: '10',
      aggregatedPage: '1',
      aggregatedPageSize: '10',
    },
  });

  const debouncedCurrenciesUpdater = debounce(currenciesUpdater, DEBOUNCE_MS);
  // const debouncedAggregatedAccountUpdater = debounce(currenciesUpdater, DEBOUNCE_MS);

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

  return {
    params,
    setParams,
    updateCurrenciesPagination,
  };
};
