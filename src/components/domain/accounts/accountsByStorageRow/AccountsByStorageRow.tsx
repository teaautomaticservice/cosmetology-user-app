import { useAccountsStore } from '@stores/cashier/accounts';
import { Skeleton } from 'antd';
import cn from 'classnames';

import { AccountsByStorage } from './accountsByStorage/AccountsByStorage';

import s from './accountsByStorageRow.module.css';

type Props = {
  className?: string;
}

export const AccountsByStorageRow: React.FC<Props> = ({
  className,
}) => {
  const { accountsByStores, isAccountsLoading } = useAccountsStore();

  return (
    <div className={cn(s.root, className)}>
      <Skeleton loading={isAccountsLoading}>
        <div className={s.contentContainer}>
          {accountsByStores?.map((data) => (
            <AccountsByStorage key={data.id} data={data} />
          ))}
        </div>
      </Skeleton>
    </div>
  );
};
