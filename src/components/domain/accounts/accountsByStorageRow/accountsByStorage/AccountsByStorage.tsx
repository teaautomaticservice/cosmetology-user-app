import { MoneyStorageBadge } from '@components/domain/moneyStorages/moneyStorageBadge/MoneyStorageBadge';
import { type ColumnsType, TableUi } from '@components/ui/table/TableUi';
import { Account, AccountsByStore, Currency } from '@typings/api/cashier';
import { fromAmountApi } from '@utils/amount';

import s from './accountsByStorage.module.css';

type Props = {
  data: AccountsByStore;
}

export const AccountsByStorage: React.FC<Props> = ({
  data,
}) => {
  const columns: ColumnsType<Account> = [
    {
      align: 'left',
      title: () => (
        <span>
          <strong>{data.name}</strong>, {data.code}
          <MoneyStorageBadge moneyStorageStatus={data.status} className={s.badge} />
        </span>
      ),
      children: [
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
          render: ({ balance }: Account) => (
            <span>{fromAmountApi(balance)}</span>
          )
        },
        {
          title: 'Available',
          render: ({ available }: Account) => (
            <span>{fromAmountApi(available)}</span>
          )
        },
        {
          title: 'Currency',
          dataIndex: 'currency',
          render: ({ code }: Currency) => (
            <span>{code}</span>
          ),
        },
      ],
    },
  ];

  return (
    <TableUi
      className={s.root}
      columns={columns}
      dataSource={data.accounts}
    />
  );
};
