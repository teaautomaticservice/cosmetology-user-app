import Title from 'antd/es/typography/Title';

import {
  AccountsAggregatedWithStorageList,
} from '../accountsAggregatedWithStorageList/AccountsAggregatedWithStorageList';

export const AccountsAggregated: React.FC = () => {
  return (
    <div>
      <Title>Accounts aggregated</Title>
      <AccountsAggregatedWithStorageList isExtended />
    </div>
  );
};
