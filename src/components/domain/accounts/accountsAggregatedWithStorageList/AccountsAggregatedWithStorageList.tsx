import { TableUi } from '@components/ui/table/TableUi';
import { useAccountsAggregatedWithStorageStore } from '@stores/cashier/accountsAggregatedWithStorage';
import { AccountAggregatedWithStorage, Currency } from '@typings/api/cashier';
import { ColumnsType } from 'antd/es/table';
import cn from 'classnames';

const columns: ColumnsType<AccountAggregatedWithStorage> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
  },
  {
    title: 'Available',
    dataIndex: 'available',
  },
  {
    title: 'Currency',
    dataIndex: 'currency',
    render: (currency: Currency) => <span>{currency.code}</span>
  },
];

type Props = {
  className?: string;
}

export const AccountsAggregatedWithStorageList: React.FC<Props> = ({
  className,
}) => {
  const { accountsAggregatedWithStorage, isLoading } = useAccountsAggregatedWithStorageStore();

  return (
    <div className={cn(className)}>
      <TableUi
        rowKey={({ name, status, currency }) => `${name}-${status}-${currency.code}`}
        columns={columns}
        dataSource={accountsAggregatedWithStorage}
        loading={isLoading}
      />
    </div>
  );
};
