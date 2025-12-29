import { useAppParams } from '@shared/hooks/useParams';
import { PaginationProps } from 'antd';

type Props = {
  currenciesPage?: string;
  currenciesPageSize?: string;
  accountsPage?: string;
  accountsPageSize?: string;
  accountsMoneyStoragesIds?: string[];
};

export const useAccountsParams = () => {
  const { params, setParams } = useAppParams<Props>({
    customDefaultKeys: {
      currenciesPage: '1',
      currenciesPageSize: '10',
      accountsPage: '1',
      accountsPageSize: '10',
    },
  });

  const updateCurrenciesPagination:
    PaginationProps['onChange'] |
    PaginationProps['onShowSizeChange']
    = (page, pageSize) => {
      setParams({
        ...params,
        currenciesPage: page.toString(),
        currenciesPageSize: pageSize.toString(),
      });
    };

  const updateAggregatedAccountsPagination:
    PaginationProps['onChange'] |
    PaginationProps['onShowSizeChange']
    = (page, pageSize) => {
      setParams({
        ...params,
        accountsPage: page.toString(),
        accountsPageSize: pageSize.toString(),
      });
    };

  const updateAccountsFilters = ({
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
    updateAggregatedAccountsPagination,
    updateCurrenciesPagination,
    updateAccountsFilters,
  };
};
