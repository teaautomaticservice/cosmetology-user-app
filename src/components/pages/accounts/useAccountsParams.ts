import { useAppParams } from '@shared/hooks/useParams';
import { AccountStatus } from '@typings/api/generated';
import { PaginationProps } from 'antd';

type Props = {
  page?: string;
  pageSize?: string;
  accountsMoneyStoragesIds?: string[];
  balanceFrom?: string;
  balanceTo?: string;
  status?: AccountStatus[];
  query?: string;
};

export const useAccountsParams = () => {
  const { params, isReady, setParams } = useAppParams<Props>({
    customDefaultKeys: {
      page: '1',
      pageSize: '10',
    },
  });

  const updateAggregatedAccountsPagination:
    PaginationProps['onChange'] |
    PaginationProps['onShowSizeChange']
    = (page, pageSize) => {
      setParams({
        ...params,
        page: page.toString(),
        pageSize: pageSize.toString(),
      });
    };

  const updateAccountsFilters = ({
    accountsMoneyStoragesIds,
    status,
    query,
    balanceFrom,
    balanceTo,
  }: {
    accountsMoneyStoragesIds?: string[];
    status?: AccountStatus[];
    query?: string;
    balanceFrom?: string;
    balanceTo?: string;
  }) => {
    const newParams = {
      ...params,
      ...(accountsMoneyStoragesIds && { accountsMoneyStoragesIds }),
      ...(status && { status }),
      ...(query && { query }),
      ...(balanceFrom && { balanceFrom }),
      ...(balanceTo && { balanceTo }),
    };
    delete newParams.page;
    delete newParams.pageSize;
    setParams(newParams);
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
    updateAccountsFilters,
    deleteParam,
  };
};
