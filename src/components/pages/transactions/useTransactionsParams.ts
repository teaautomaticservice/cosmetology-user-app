import { useAppParams } from '@shared/hooks/useParams';
import { TransactionStatus } from '@typings/api/generated';
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
  ids?: string[],
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

  const updateAccountsFilters = ({
    amountFrom,
    amountTo,
    status,
    anyAccountIds,
    creditIds,
    debitIds,
    ids,
  }: {
    amountFrom?: string,
    amountTo?: string,
    status?: TransactionStatus[],
    anyAccountIds?: string[],
    creditIds?: string[],
    debitIds?: string[],
    ids?: string[],
  }) => {
    const newParams = {
      ...params,
      ...(amountFrom && { amountFrom }),
      ...(amountTo && { amountTo }),
      ...(status && { status }),
      ...(anyAccountIds && { anyAccountIds }),
      ...(creditIds && { creditIds }),
      ...(debitIds && { debitIds }),
      ...(ids && { ids }),
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
    updatePagination,
    deleteParam,
    updateAccountsFilters,
  };
};
