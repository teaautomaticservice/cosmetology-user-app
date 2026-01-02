import { useMoneyStoragesPageStore } from '@stores/pages/moneyStoragesPage';
import { MoneyStorageDto } from '@typings/api/generated';
import Title from 'antd/es/typography/Title';

import { MoneyStoragesActions } from './moneyStoragesActions/MoneyStoragesActions';
import { MoneyStoragesRow } from './moneyStoragesRow/MoneyStoragesRow';

import s from './moneyStorages.module.css';

export const MoneyStorages: React.FC = () => {
  const {
    moneyStorages,
    obligationAccountsStorages,
    isLoading,
  } = useMoneyStoragesPageStore();

  const itemsStorages: MoneyStorageDto[] = [
    ...moneyStorages,

    ...(obligationAccountsStorages ? obligationAccountsStorages : []),
  ];

  return (
    <div className={s.root}>
      <Title>Money storages</Title>
      <div className={s.contentContainer}>
        <MoneyStoragesActions classNames={s.actionsRow} />
        <MoneyStoragesRow isLoading={isLoading} items={itemsStorages}/>
      </div>
    </div>
  );
};
