import { MoneyStorageBadge } from '@components/domain/moneyStorages/moneyStorageBadge/MoneyStorageBadge';
import { useAccountsParams } from '@components/pages/accounts/useAccountsParams';
import { ColumnsType, TableUi } from '@components/ui/table/TableUi';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useModalStore } from '@stores/modal';
import { AccountWithStorageStatusEnum, AccountWithStore, Currency, MoneyStorage } from '@typings/api/cashier';
import { fromAmountApi } from '@utils/amount';
import { Button } from 'antd';

import s from './obligationAccountsList.module.css';

type Props = {
  className?: string;
}

export const ObligationAccountsList: React.FC<Props> = ({
  className,
}) => {
  const {
    obligationAccountsWithStores,
    isAccountsLoading,
    obligationAccountsWithStoresCount,
    setCurrentAccountWithStore,
  } = useAccountsStore();
  const {
    open,
  } = useModalStore();

  const {
    params,
    updateAggregatedAccountsPagination,
  } = useAccountsParams();

  const openLoanRepayment = (account: AccountWithStore) => {
    setCurrentAccountWithStore(account);
    open('createLoanRepaymentModal');
  };

  const columns: ColumnsType<AccountWithStore> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
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
      render: ({ balance }: AccountWithStore) => (
        <span>{fromAmountApi(balance)}</span>
      )
    },
    {
      title: 'Available',
      render: ({ available }: AccountWithStore) => (
        <span>{fromAmountApi(available)}</span>
      )
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      render: ({ code }: Currency) => (
        <span>{code}</span>
      )
    },
    {
      title: 'Money storage',
      dataIndex: 'moneyStorage',
      render: ({ name, code, status }: MoneyStorage) => (
        <span className={s.monyStoragesCard}>
          <strong>{name}</strong>, {code}
          <MoneyStorageBadge moneyStorageStatus={status} />
        </span>
      ),
    },
    {
      title: 'Actions',
      className: s.actionsCol,
      render: (_, account) => (
        <div className={s.actions}>
          <div className={s.actionsWrapper}>
            {(
              Number(account.available) > 0 &&
              account.status === AccountWithStorageStatusEnum.ACTIVE
            ) && (
              <Button onClick={() => openLoanRepayment(account)}>
                  Loan Repayment
              </Button>
            )}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className={className}>
      <TableUi
        columns={columns}
        dataSource={obligationAccountsWithStores}
        loading={isAccountsLoading}
        className={s.root}
        pagination={{
          total: obligationAccountsWithStoresCount,
          current: Number(params.page ?? 1),
          pageSize: Number(params.pageSize ?? 10),
          onChange: updateAggregatedAccountsPagination,
          onShowSizeChange: updateAggregatedAccountsPagination,
        }}
      />
    </div>
  );
};
