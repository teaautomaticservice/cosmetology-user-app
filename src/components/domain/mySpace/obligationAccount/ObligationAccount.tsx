import { MoneyStorageBadge } from '@components/domain/moneyStorages/moneyStorageBadge/MoneyStorageBadge';
import { TableUi } from '@components/ui/table/TableUi';
import { useMySpacePageStore } from '@stores/pages/mySpacePage';
import { MoneyStorage, MoneyStorageStatusEnum } from '@typings/api/cashier';
import { Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Title from 'antd/es/typography/Title';

import s from './obligationAccount.module.css';

const columns: ColumnsType<MoneyStorage> = [
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
  const { isLoading, obligationAccountsStorages } = useMySpacePageStore();

  return (
    <div className={s.root}>
      <Title level={3} className={s.title}>Current obligation state</Title>
      <div className={s.contentContainer}>
        <div className={s.wrapper}>
          {obligationAccountsStorages?.map(({ status, code }) => (
            <div key={code}>
              {status !== MoneyStorageStatusEnum.ACTIVE && (
                <div>
                  <div className={s.statusRow}>
                    <MoneyStorageBadge moneyStorageStatus={status} className={s.status} />
                    <Typography>
                      Activate this storage for using history obligation
                    </Typography>
                  </div>
                </div>
              )}
              <TableUi
                className={s.table}
                columns={columns}
                dataSource={[]}
                loading={isLoading}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
