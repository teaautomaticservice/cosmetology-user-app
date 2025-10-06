import { useMySpaceStore } from '@stores/mySpace';
import { MoneyStorageStatusEnum } from '@typings/api/moneyStorage';
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
  const { isLoading, obligationAccountStorages } = useMySpaceStore();

  const isStorageNotActive = obligationAccountStorages?.status !== MoneyStorageStatusEnum.ACTIVE;

  return (
    <div className={s.root}>
      {isStorageNotActive && (
        <div>
          <Title level={3}>Money storage is not active</Title>
          <Typography>Activate this storage for using history obligation</Typography>
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
