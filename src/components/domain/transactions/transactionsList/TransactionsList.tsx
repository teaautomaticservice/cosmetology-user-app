import { useTransactionsParams } from '@components/pages/transactions/useTransactionsParams';
import { TableUi } from '@components/ui/table/TableUi';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { Transaction } from '@typings/api/cashier';
import { fromAmountApi } from '@utils/amount';
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
    render: ({ amount }: Transaction) => (
      <span>{fromAmountApi(amount)}</span>
    )
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
    count,
  } = useTransactionsStore();

  const {
    params,
    updatePagination,
  } = useTransactionsParams();

  return (
    <TableUi
      columns={finalColumns}
      dataSource={transactions}
      loading={isLoading}
      pagination={{
        total: count,
        current: Number(params.page ?? 1),
        pageSize: Number(params.pageSize ?? 10),
        onChange: updatePagination,
        onShowSizeChange: updatePagination,
      }}
    />
  );
};
