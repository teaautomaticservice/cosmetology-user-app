import { ColumnsType, TableUi } from '@components/ui/table/TableUi';
import { useModalStore } from '@stores/modal';
import { useAccountsPageStore } from '@stores/pages/accountsPage';
import { Currency } from '@typings/api/cashier';
import { Button } from 'antd';
import cn from 'classnames';

import s from './currenciesList.module.css';

type Props = {
  className?: string
}

export const CurrenciesList: React.FC<Props> = ({
  className,
}) => {
  const {
    isAccountsPageLoading,
    currencies,
    setCurrentCurrency,
  } = useAccountsPageStore();
  const { open } = useModalStore();

  const openEditCurrencyModal = (currentCurrency: Currency) => {
    setCurrentCurrency(currentCurrency);
    open('editCurrency');
  };

  const finalColumns: ColumnsType<Currency> = [
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
    {
      title: 'Actions',
      className: s.actionsCol,
      render: (_, currentCurrency) => (
        <div className={s.actions}>
          <Button onClick={() => openEditCurrencyModal(currentCurrency)}>
            Edit
          </Button>
        </div>
      )
    }
  ];

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
