import { useMemo } from 'react';
import { MoneyStorageBadge } from '@components/domain/moneyStorages/moneyStorageBadge/MoneyStorageBadge';
import { TableUi } from '@components/ui/table/TableUi';
import { paths } from '@router/paths';
import { useAccountsAggregatedWithStorageStore } from '@stores/cashier/accountsAggregatedWithStorage';
import { useModalStore } from '@stores/modal';
import { AccountAggregatedWithStorage, Currency } from '@typings/api/cashier';
import { fromAmountApi } from '@utils/amount';
import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'antd/es/typography/Link';
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
  const { open } = useModalStore();

  const currentColumns: ColumnsType<AccountAggregatedWithStorage> =
    useMemo((): ColumnsType<AccountAggregatedWithStorage> => {
      return [
        ...(isExtended ? [{
          title: 'IDs',
          className: s.ids,
          render: (_, account) => (
            <span>{account.ids.join(', ')}</span>
          ),
        }] satisfies ColumnsType<AccountAggregatedWithStorage> : []),
        ...columns,
        ...(isExtended ? [{
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
        },] satisfies ColumnsType<AccountAggregatedWithStorage> : []),
        {
          title: 'Actions',
          className: s.actionsCol,
          render: (_, account) => (
            <div className={s.actions}>
              {isExtended && (
                <Button onClick={() => {
                  setCurrentAggregatedAccount(account);
                  open('editAggregatedAccount');
                }}>
                  Edit
                </Button>
              )}
              <Link className={s.link} href={paths.accounts(({
                query: account.name.toString(),
              }))}>
                Accounts
              </Link>
            </div>
          )
        }
      ];
    }, [isExtended]);

  return (
    <div className={cn(className)}>
      <TableUi
        rowKey={({ name, status, currency }) => `${name}-${status}-${currency.code}`}
        columns={currentColumns}
        dataSource={accountsAggregatedWithStorage}
        loading={isLoading}
        className={s.root}
        pagination={{
          pageSize: 100,
        }}
      />
    </div>
  );
};
