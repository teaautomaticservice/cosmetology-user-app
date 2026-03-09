import { useAppParams } from '@shared/hooks/useParams';
import { TransactionStatus } from '@typings/api/generated';
import { clarifyObject } from '@utils/clarifyObject';
import { PaginationProps } from 'antd';

type Props = {
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
};

export const useTransactionsParams = () => {
  const { params, isReady, setParams } = useAppParams<Props>({
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

  const updateTransactionsFilters = (currentParam: Props) => {
    const newParams = clarifyObject(currentParam);
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
    updatePagination,
    deleteParam,
    updateTransactionsFilters,
  };
};
