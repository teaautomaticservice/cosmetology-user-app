import { useAppParams } from '@shared/hooks/useParams';
import { AccountStatus } from '@typings/api/generated';
import { PaginationProps } from 'antd';

type Props = {
  currenciesPage?: string;
  currenciesPageSize?: string;
  accountsPage?: string;
  accountsPageSize?: string;
  accountsMoneyStoragesIds?: string[];
  status?: AccountStatus[];
  query?: string;
};

export const useAccountsParams = () => {
  const { params, isReady, setParams } = useAppParams<Props>({
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
    status,
    query,
  }: {
    accountsMoneyStoragesIds?: string[];
    status?: AccountStatus[];
    query?: string;
  }) => {
    setParams({
      ...params,
      ...(accountsMoneyStoragesIds && { accountsMoneyStoragesIds }),
      ...(status && { status }),
      ...(query && { query }),
    });
  };

  const deleteParam = (keys: (keyof Props)[]) => {
    const currentParam = {
      ...params,
    };

    keys.forEach((key) => {
      delete currentParam[key];
    });

    setParams(currentParam);
  };

  return {
    params,
    isReady,
    setParams,
    updateAggregatedAccountsPagination,
    updateCurrenciesPagination,
    updateAccountsFilters,
    deleteParam,
  };
};
