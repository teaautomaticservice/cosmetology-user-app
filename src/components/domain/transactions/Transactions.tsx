import Title from 'antd/es/typography/Title';

import { TransactionsList } from './transactionsList/TransactionsList';

export const Transactions: React.FC = () => {
  return (
    <div>
      <Title>Transactions</Title>
      <TransactionsList />
    </div>
  );
};
