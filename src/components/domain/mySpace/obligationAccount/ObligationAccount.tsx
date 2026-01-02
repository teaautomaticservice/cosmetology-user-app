import {
  ObligationAccountsAggregated,
} from '@components/domain/accounts/obligationAccountsAggregated/ObligationAccountsAggregated';
import Title from 'antd/es/typography/Title';

import s from './obligationAccount.module.css';

export const ObligationAccount: React.FC = () => {
  return (
    <div className={s.root}>
      <Title level={3} className={s.title}>Current obligation state</Title>
      <ObligationAccountsAggregated />
    </div>
  );
};
