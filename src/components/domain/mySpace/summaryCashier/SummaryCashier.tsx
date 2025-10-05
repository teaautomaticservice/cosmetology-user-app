import { useMySpaceStore } from '@stores/mySpace';
import { Skeleton, Typography } from 'antd';
import Title from 'antd/es/typography/Title';

import s from './summaryCashier.module.css';

export const SummaryCashier: React.FC = () => {
  const { isLoading, moneyStorages } = useMySpaceStore();

  const hasMoneyStorages = Boolean(moneyStorages.length);

  return (
    <div className={s.root}>
      <Title level={3} className={s.title}>Current month state</Title>
      <Skeleton loading={isLoading}>
        {!hasMoneyStorages && (
          <div>
            <Title level={4}>No Data</Title>
            <Typography>Create and activate storages for using history transactions</Typography>
          </div>
        )}
      </Skeleton>
    </div>
  );
};
