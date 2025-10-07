import { useMySpacePageStore } from '@stores/pages/mySpacePage';
import { Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';

import s from './currentMonthState.module.css';

export const CurrentMonthState: React.FC = () => {
  const {
    isLoading,
  } = useMySpacePageStore();

  return (
    <div className={s.root}>
      <Title level={3} className={s.title}>Current month state</Title>
      <Skeleton loading={isLoading}>
        <Title level={4}>No Data</Title>
      </Skeleton>
    </div>
  );
};
