import { MoneyStorageBadge } from '@components/domain/moneyStorages/moneyStorageBadge/MoneyStorageBadge';
import { useMySpacePageStore } from '@stores/pages/mySpacePage';
import { MoneyStorageStatusEnum } from '@typings/api/cashier';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Title from 'antd/es/typography/Title';

import s from './obligationAccount.module.css';

const columns: ColumnsType<History> = [
  {
    title: 'Transaction',
    dataIndex: 'transaction',
    width: '150px',
  },
  {
    title: 'Debit',
    dataIndex: 'debit',
    width: '300px',
  },
  {
    title: 'Credit',
    dataIndex: 'credit',
    width: '300px',
  },
];

export const ObligationAccount: React.FC = () => {
  const { isLoading, obligationAccountStorages } = useMySpacePageStore();

  const isStorageNotActive = obligationAccountStorages?.status !== MoneyStorageStatusEnum.ACTIVE;

  return (
    <div className={s.root}>
      {isStorageNotActive && (
        <div>
          <Title level={3}>Money storage is not active</Title>
          <div className={s.statusRow}>
            <MoneyStorageBadge moneyStorageStatus={obligationAccountStorages?.status} />
            <Typography>
              Activate this storage for using history obligation
            </Typography>
          </div>
        </div>
      )}
      <Table
        className={s.table}
        columns={columns}
        dataSource={[]}
        rowKey={'id'}
        loading={isLoading}
      />
    </div>
  );
};
