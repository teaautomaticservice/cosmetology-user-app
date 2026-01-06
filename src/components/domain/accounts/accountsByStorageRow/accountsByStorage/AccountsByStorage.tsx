import { MoneyStorageBadge } from '@components/domain/moneyStorages/moneyStorageBadge/MoneyStorageBadge';
import { type ColumnsType, TableUi } from '@components/ui/table/TableUi';
import { Account, AccountsByStore, Currency, MoneyStorageStatusEnum } from '@typings/api/cashier';
import { fromAmountApi } from '@utils/amount';
import { Badge } from 'antd';

import s from './accountsByStorage.module.css';

type Props = {
  data: AccountsByStore;
}

export const AccountsByStorage: React.FC<Props> = ({
  data,
}) => {
  const isHealth = data.income - data.expend === data.balance;
  const columns: ColumnsType<Account> = [
    {
      align: 'left',
      title: () => (
        <div className={s.title}>
          <span>
            <strong>{
              data.name
            }</strong>, {
              data.code
            }
            <MoneyStorageBadge moneyStorageStatus={data.status} className={s.badge} />
          </span>
          <span>
            Balance: {
              fromAmountApi(data.balance)
            } Available: {
              fromAmountApi(data.available)
            }
          </span>
          <span>
            Income: {
              fromAmountApi(data.income)
            } Expend: {
              fromAmountApi(data.expend)
            } Transfer: {
              fromAmountApi(data.transfer)
            }
          </span>
          {data.status === MoneyStorageStatusEnum.ACTIVE && (
            <span>Health: <Badge
              className={s.badge}
              color={isHealth ? 'green' : 'red'}
              text={isHealth ? 'good' : `bad: ${
                fromAmountApi(data.balance - data.income - data.expend)
              }`}
            /></span>
          )}
        </div>
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
      pagination={{
        pageSize: 50,
      }}
    />
  );
};
