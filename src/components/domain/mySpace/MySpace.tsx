import { useMySpaceStore } from '@stores/mySpace';
import Title from 'antd/es/typography/Title';

import { CurrentMonthState } from './currentMonthState/CurrentMonthState';
import { MainActions } from './mainActions/MainActions';

import s from './mySpace.module.css';

export const MySpace: React.FC = () => {
  const {
    currencies,
    moneyStorages,
    obligationAccountStorages,
  } = useMySpaceStore();

  return (
    <div className={s.root}>
      <Title>My space</Title>
      <div className={s.contentContainer}>
        <div className={s.sectionContainer}>
          <MainActions />
          <CurrentMonthState />
        </div>

        <div className={s.sectionContainer}>
          <span>{JSON.stringify(currencies)}</span>
          <span>{JSON.stringify(moneyStorages)}</span>
        </div>

        <div className={s.sectionContainer}>
          <span>{JSON.stringify(obligationAccountStorages)}</span>
        </div>
      </div>
    </div>
  )
}