import { ColumnsType, TableUi } from '@components/ui/table/TableUi';
import { useAccountsPageStore } from '@stores/pages/accountsPage';
import { Currency } from '@typings/api/cashier';
import { ApiError } from '@typings/errors';
import { addToast } from '@utils/domain/toastEventBus';
import { Button } from 'antd';
import cn from 'classnames';

import s from './currenciesList.module.css';

const columns: ColumnsType<Currency> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Code',
    dataIndex: 'code',
  },
];

type Props = {
  className?: string
}

export const CurrenciesList: React.FC<Props> = ({
  className,
}) => {
  const {
    isAccountsPageLoading,
    currencies,
    isEditMode,
    deleteCurrencyWithUpdateAccounts,
  } = useAccountsPageStore();

  const onDelete = async (id: number) => {
    try {
      await deleteCurrencyWithUpdateAccounts(id);
      addToast({
        description: 'Currency fully deleted',
      });
    } catch(e) {
      addToast({
        type: 'error',
        description: (e as ApiError).message,
      });
    }
  };

  const finalColumns: ColumnsType<Currency> = isEditMode ? [
    ...columns,
    {
      title: 'ACtions',
      className: s.actionsCol,
      render: (_, { id }) => (
        <div className={s.actions}>
          <Button>Edit</Button>
          <Button
            color='danger'
            variant="outlined"
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ] : columns;

  return (
    <div className={cn(s.root, className)}>
      <TableUi
        columns={finalColumns}
        dataSource={currencies}
        loading={isAccountsPageLoading}
      />
    </div>
  );
};
