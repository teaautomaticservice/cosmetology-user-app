import { useAccountsStore } from '@stores/cashier/accounts';
import Title from 'antd/es/typography/Title';

export const Accounts: React.FC = () => {
  const { accountsByStores } = useAccountsStore();

  return (
    <div>
      <Title>Accounts</Title>
      {accountsByStores?.map((data) => (
        <div>{JSON.stringify(data)}</div>
      ))}
    </div>
  );
};
