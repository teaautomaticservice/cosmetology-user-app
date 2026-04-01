import { MenuOutlined } from '@ant-design/icons';
import { useTransactionsParams } from '@components/pages/transactions/useTransactionsParams';
import { TableUi } from '@components/ui/table/TableUi';
import { dateUtils } from '@shared/utils/dateUtils';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { useObligationAccountStore } from '@stores/cashier/obligationAccount';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { useModalStore } from '@stores/modal';
import { Transaction, TransactionOperationType, TransactionStatus } from '@typings/api/cashier';
import { fromAmountApi } from '@utils/amount';
import { Button, Dropdown, MenuProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import cn from 'classnames';

import s from './transactionsList.module.css';

type Props = {
  className?: string;
}

export const TransactionsList: React.FC<Props> = ({
  className,
}) => {
  const {
    transactions,
    isLoading,
    count,
    setCurrentTransaction,
  } = useTransactionsStore();
  const {
    params,
    updatePagination,
  } = useTransactionsParams();
  const {
    moneyStorages,
  } = useMoneyStoragesStore();
  const {
    obligationAccountsStorages,
  } = useObligationAccountStore();
  const {
    open,
  } = useModalStore();

  const storages = [
    ...moneyStorages,
    ...obligationAccountsStorages,
  ];

  const getStorageData = (currentId?: number) => {
    if (!currentId) {
      return '-';
    }

    return storages.find(({ id }) => id === currentId)?.code ?? '-';
  };

  const createNewRefundIn = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    open('createRefundInModal');
  };

  const createNewRefundOut = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    open('createRefundOutModal');
  };

  const otherActionsItems = (transaction: Transaction): MenuProps['items'] => [
    ...((
      transaction.status === TransactionStatus.COMPLETED &&
      transaction.operationType === TransactionOperationType.CSH
    ) ? [{
        label: 'Refund In',
        key: '3',
        onClick: () => createNewRefundIn(transaction),
      }] : []),
    ...((
      transaction.status === TransactionStatus.COMPLETED &&
      transaction.operationType === TransactionOperationType.RCP
    ) ? [{
        label: 'Refund Out',
        key: '3',
        onClick: () => createNewRefundOut(transaction),
      }] : []),
  ];

  const finalColumns: ColumnsType<Transaction> = [
    {
      title: 'Execution date',
      render: ({ executionDate }: Transaction) => (
        <span>{executionDate ? dateUtils.formattedDateWithTime(new Date(executionDate)) : '-'}</span>
      ),
    },
    {
      title: 'Expired date',
      render: ({ expireDate }: Transaction) => (
        <span>{expireDate ? dateUtils.formattedDateWithTime(new Date(expireDate)) : '-'}</span>
      ),
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
      title: 'Debit Storage',
      render: ({ debitAccount }: Transaction) => (
        <span>{getStorageData(debitAccount?.moneyStorageId)}</span>
      ),
    },
    {
      title: 'Credit',
      render: ({ creditAccount }: Transaction) => (
        <span>{creditAccount?.name ?? '-'}</span>
      ),
    },
    {
      title: 'Credit Storage',
      render: ({ creditAccount }: Transaction) => (
        <span>{getStorageData(creditAccount?.moneyStorageId)}</span>
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
    {
      title: 'Actions',
      className: s.actionsCol,
      render: (_, account) => (
        <div className={s.actions}>
          {
            otherActionsItems(account)?.length ? (
              <div className={s.actionsWrapper}>
                <Dropdown menu={{ items: otherActionsItems(account) }} trigger={['click']}>
                  <Button
                    type="default"
                    title='Other actions'
                    icon={<MenuOutlined />}
                  />
                </Dropdown>
              </div>
            ) : '-'
          }

        </div>
      )
    },
  ];

  return (
    <TableUi
      className={cn(s.root, className)}
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
