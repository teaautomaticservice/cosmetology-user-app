import Title from 'antd/es/typography/Title';

import { CurrentMonthState } from './currentMonthState/CurrentMonthState';
import { MainActions } from './mainActions/MainActions';
import { ObligationAccount } from './obligationAccount/ObligationAccount';
import { SummaryCashier } from './summaryCashier/SummaryCashier';

import s from './mySpace.module.css';

export const MySpace: React.FC = () => {
  return (
    <div className={s.root}>
      <Title>My space</Title>
      <div className={s.contentContainer}>
        <div className={s.sectionContainer}>
          <MainActions />
          <CurrentMonthState />
        </div>

        <div className={s.sectionContainer}>
          <SummaryCashier />
        </div>

        <div className={s.sectionContainer}>
          <ObligationAccount />
        </div>
      </div>
    </div>
  );
};
