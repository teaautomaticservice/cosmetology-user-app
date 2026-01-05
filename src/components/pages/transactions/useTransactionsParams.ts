import { useAppParams } from '@shared/hooks/useParams';
import { PaginationProps } from 'antd';

type Props = {
  page?: string;
  pageSize?: string;
};

export const useTransactionsParams = () => {
  const { params, isReady, setParams } = useAppParams<Props>({
    customDefaultKeys: {
      page: '1',
      pageSize: '50',
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
  };
};
