import { CashierService } from '@typings/api/generated';
import { Button } from 'antd';

import s from './mySpaceActions.module.css';

export const MainActions: React.FC = () => {
  const test = async () => {
    await CashierService.currenciesControllerCreateCurrency({
      requestBody: {
        name: 'Rubles',
        code: 'Rus',
      }
    });
  };

  return (
    <div className={s.root}>
      <Button type="primary" onClick={test}>Income</Button>
      <Button type="primary">Expenditure</Button>
      <Button type="primary">Movement</Button>
    </div>
  );
};
