import Title from 'antd/es/typography/Title';

import { AccountsByStorageRow } from '../accountsByStorageRow/AccountsByStorageRow';

export const AccountsByStorage: React.FC = () => {
  return (
    <div>
      <Title>Accounts by Storage</Title>
      <AccountsByStorageRow />
    </div>
  );
};
