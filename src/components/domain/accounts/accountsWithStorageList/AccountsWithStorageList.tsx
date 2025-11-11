import { MoneyStorageBadge } from '@components/domain/moneyStorages/moneyStorageBadge/MoneyStorageBadge';
import { TableUi } from '@components/ui/table/TableUi';
import { useAccountsStore } from '@stores/cashier/accounts';
import { AccountWithStore, MoneyStorage } from '@typings/api/cashier';
import { ColumnsType } from 'antd/es/table';
import cn from 'classnames';

import s from './accountsWithStorageList.module.css';

type Props = {
  className?: string;
}

export const AccountsWithStorageList: React.FC<Props> = ({
  className,
}) => {
  const { accountsWithStores, isAccountsLoading } = useAccountsStore();

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
    }
  ];

  return (
    <div className={cn(className)}>
      <TableUi
        columns={columns}
        dataSource={accountsWithStores}
        loading={isAccountsLoading}
        className={s.root}
      />
    </div>
  );
};
