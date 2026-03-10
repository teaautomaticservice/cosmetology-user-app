import { useAppParams } from '@shared/hooks/useParams';
import { TransactionStatus } from '@typings/api/generated';
import { clarifyObject } from '@utils/clarifyObject';
import { PaginationProps } from 'antd';

export type TransactionsParams = {
  page?: string;
  pageSize?: string;
  amountFrom?: string,
  amountTo?: string,
  status?: TransactionStatus[],
  anyAccountIds?: string[],
  creditIds?: string[],
  debitIds?: string[],
  anyId?: string;
  query?: string;
  operationTypes?: string[];
};

export const useTransactionsParams = () => {
  const { params, isReady, setParams } = useAppParams<TransactionsParams>({
    customDefaultKeys: {
      page: '1',
      pageSize: '10',
    },
  });

  const updatePagination:
    PaginationProps['onChange'] |
    PaginationProps['onShowSizeChange']
    = (page, pageSize) => {
      setParams({
        ...params,
        page: page.toString(),
        pageSize: pageSize.toString(),
      });
    };

  const updateTransactionsFilters = (currentParam: TransactionsParams) => {
    const newParams = clarifyObject(currentParam);
    delete newParams.page;
    delete newParams.pageSize;
    setParams(newParams);
  };

  const deleteParam = (keys: (keyof TransactionsParams)[]) => {
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
    updatePagination,
    deleteParam,
    updateTransactionsFilters,
  };
};
