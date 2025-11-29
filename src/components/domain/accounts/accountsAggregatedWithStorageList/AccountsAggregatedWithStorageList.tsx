import { useEffect, useState } from 'react';
import { MoneyStorageBadge } from '@components/domain/moneyStorages/moneyStorageBadge/MoneyStorageBadge';
import { TableUi } from '@components/ui/table/TableUi';
import { useAccountsAggregatedWithStorageStore } from '@stores/cashier/accountsAggregatedWithStorage';
import { useModalStore } from '@stores/modal';
import { AccountAggregatedWithStorage, Currency } from '@typings/api/cashier';
import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import cn from 'classnames';

import s from './accountsAggregatedWithStorageList.module.css';

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
  isExtended?: boolean;
}

export const AccountsAggregatedWithStorageList: React.FC<Props> = ({
  className,
  isExtended,
}) => {
  const {
    accountsAggregatedWithStorage,
    isLoading,
    setCurrentAggregatedAccount,
  } = useAccountsAggregatedWithStorageStore();
  const [currentColumns, setCurrentColumns] = useState<ColumnsType<AccountAggregatedWithStorage>>(columns);
  const { open } = useModalStore();

  useEffect(() => {
    if (isExtended) {
      setCurrentColumns([
        {
          title: 'IDs',
          className: s.ids,
          render: (_, account) => (
            <span>{account.ids.join(', ')}</span>
          ),
        },
        ...columns,
        {
          title: 'Money storage',
          dataIndex: 'moneyStorage',
          className: s.moneyStoragesCell,
          render: (_, { moneyStorages }) => (
            <div className={s.moneyStorages}>
              {moneyStorages.map(({
                id,
                name,
                code,
                status,
              }) => (
                <span key={id} className={s.monyStoragesCard}>
                  <strong>{name}</strong>, {code}
                  <MoneyStorageBadge className={s.moneyStoragesBadge} moneyStorageStatus={status} />
                </span>
              ))}
            </div>

          ),
        },
        {
          title: 'Actions',
          className: s.actionsCol,
          render: (_, account) => (
            <div className={s.actions}>
              <Button onClick={() => {
                setCurrentAggregatedAccount(account);
                open('editAggregatedAccount');
              }}>
                Edit
              </Button>
            </div>
          )
        }
      ]);
    };
  }, [isExtended]);

  return (
    <div className={cn(className)}>
      <TableUi
        rowKey={({ name, status, currency }) => `${name}-${status}-${currency.code}`}
        columns={currentColumns}
        dataSource={accountsAggregatedWithStorage}
        loading={isLoading}
        className={s.root}
      />
    </div>
  );
};
