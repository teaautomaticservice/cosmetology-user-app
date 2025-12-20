import { TableUi } from '@components/ui/table/TableUi';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { Transaction } from '@typings/api/cashier';
import { ColumnsType } from 'antd/es/table';

const finalColumns: ColumnsType<Transaction> = [
  {
    title: 'Execution date',
    dataIndex: 'executionDate'
  },
  {
    title: 'Expired date',
    dataIndex: 'expireDate',
  },
  {
    title: 'Transaction ID',
    dataIndex: 'transactionId',
  },
  {
    title: 'Parent transaction ID',
    dataIndex: 'parentTransactionId',
  },
  {
    title: 'Debit',
    render: ({ debitAccount }: Transaction) => (
      <span>{debitAccount?.name ?? '-'}</span>
    ),
  },
  {
    title: 'Credit',
    render: ({ creditAccount }: Transaction) => (
      <span>{creditAccount?.name ?? '-'}</span>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount'
  },
  {
    title: 'Operation type',
    dataIndex: 'operationType'
  },
  {
    title: 'Description',
    dataIndex: 'description'
  },
  {
    title: 'Status',
    dataIndex: 'status'
  },
];

export const TransactionsList: React.FC = () => {
  const {
    transactions,
    isLoading,
  } = useTransactionsStore();

  return (
    <TableUi
      columns={finalColumns}
      dataSource={transactions}
      loading={isLoading}
    />
  );
};
