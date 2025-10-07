import { useMoneyStoragesPageStore } from '@stores/pages/moneyStoragesPage';
import { MoneyStorageDto } from '@typings/api/generated';
import Title from 'antd/es/typography/Title';

import { MoneyStoragesRow } from './moneyStoragesRow/MoneyStoragesRow';

import s from './moneyStorages.module.css';

export const MoneyStorages: React.FC = () => {
  const {
    moneyStorages,
    obligationAccountStorages,
    isLoading,
  } = useMoneyStoragesPageStore();

  const itemsStorages: MoneyStorageDto[] = [
    ...moneyStorages,
    ...(obligationAccountStorages ? [obligationAccountStorages] : []),
  ];

  return (
    <div className={s.root}>
      <Title>Money storages</Title>
      <div className={s.contentContainer}>
        <MoneyStoragesRow isLoading={isLoading} items={itemsStorages}/>
      </div>
    </div>
  );
};
