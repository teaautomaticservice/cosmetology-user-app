import Title from 'antd/es/typography/Title';

import { TransactionsActions } from './transactionsActions/TransactionsActions';
import { TransactionsList } from './transactionsList/TransactionsList';

import s from './transactions.module.css';

export const Transactions: React.FC = () => {
  return (
    <div className={s.root}>
      <Title>Transactions</Title>
      <TransactionsActions className={s.actions} />
      <div className={s.tableWrapper}>
        <TransactionsList />
      </div>
    </div>
  );
};
