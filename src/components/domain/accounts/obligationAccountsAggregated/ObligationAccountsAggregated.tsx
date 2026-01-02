import { TableUi } from '@components/ui/table/TableUi';
import { useAccountsAggregatedWithStorageStore } from '@stores/cashier/accountsAggregatedWithStorage';
import { AccountAggregatedWithStorage, Currency } from '@typings/api/cashier';
import { fromAmountApi } from '@utils/amount';
import { ColumnsType } from 'antd/es/table';

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
    render: ({ balance }: AccountAggregatedWithStorage) => (
      <span>{fromAmountApi(balance)}</span>
    )
  },
  {
    title: 'Available',
    render: ({ available }: AccountAggregatedWithStorage) => (
      <span>{fromAmountApi(available)}</span>
    )
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

export const ObligationAccountsAggregated: React.FC<Props> = ({
  className,
}) => {
  const {
    obligationAccountsAggregatedWithStorage,
    isLoading,
  } = useAccountsAggregatedWithStorageStore();

  return (
    <div className={className}>
      <TableUi
        rowKey={({ name, status, currency }) => `${name}-${status}-${currency.code}`}
        columns={columns}
        dataSource={obligationAccountsAggregatedWithStorage}
        loading={isLoading}
      />
    </div>
  );
};
