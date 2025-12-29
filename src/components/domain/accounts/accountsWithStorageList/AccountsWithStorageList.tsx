import { MoneyStorageBadge } from '@components/domain/moneyStorages/moneyStorageBadge/MoneyStorageBadge';
import { useAccountsParams } from '@components/pages/accounts/useAccountsParams';
import { TableUi } from '@components/ui/table/TableUi';
import { useModalStore } from '@stores/modal';
import { useAccountsPageStore } from '@stores/pages/accountsPage';
import { AccountWithStore, Currency, MoneyStorage } from '@typings/api/cashier';
import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import cn from 'classnames';

import s from './accountsWithStorageList.module.css';

type Props = {
  className?: string;
}

export const AccountsWithStorageList: React.FC<Props> = ({
  className,
}) => {
  const {
    accountsWithStores,
    isAccountsPageLoading,
    accountsWithStoresCount,
    setCurrentAccountWithStore,
  } = useAccountsPageStore();
  const {
    open,
  } = useModalStore();
  const {
    params,
    updateAggregatedAccountsPagination,
  } = useAccountsParams();

  const openEditModal = (account: AccountWithStore) => {
    setCurrentAccountWithStore(account);
    open('editAccountWithStorages');
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
      dataIndex: 'balance',
    },
    {
      title: 'Available',
      dataIndex: 'available',
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
          <Button onClick={() => openEditModal(account)}>
            Edit
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className={cn(className)}>
      <TableUi
        columns={columns}
        dataSource={accountsWithStores}
        loading={isAccountsPageLoading}
        className={s.root}
        pagination={{
          total: accountsWithStoresCount,
          current: Number(params.accountsPage ?? 1),
          pageSize: Number(params.accountsPageSize ?? 10),
          onChange: updateAggregatedAccountsPagination,
          onShowSizeChange: updateAggregatedAccountsPagination,
        }}
      />
    </div>
  );
};
