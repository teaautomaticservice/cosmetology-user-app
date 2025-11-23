import { MoneyStorageBadge } from '@components/domain/moneyStorages/moneyStorageBadge/MoneyStorageBadge';
import { TableUi } from '@components/ui/table/TableUi';
import { useModalStore } from '@stores/modal';
import { useAccountsPageStore } from '@stores/pages/accountsPage';
import { AccountWithStore, MoneyStorage } from '@typings/api/cashier';
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
    params,
    accountsWithStoresCount,
    updateAggregatedAccountsPagination,
    setCurrentAccountWithStore,
  } = useAccountsPageStore();
  const {
    open,
  } = useModalStore();

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
      <span>TEST</span>
      <TableUi
        columns={columns}
        dataSource={accountsWithStores}
        loading={isAccountsPageLoading}
        className={s.root}
        pagination={{
          total: accountsWithStoresCount,
          current: Number(params.aggregatedPage ?? 1),
          pageSize: Number(params.aggregatedPageSize ?? 10),
          onChange: updateAggregatedAccountsPagination,
          onShowSizeChange: updateAggregatedAccountsPagination,
        }}
      />
    </div>
  );
};
