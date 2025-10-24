import { useAccountsStore } from '@stores/cashier/accounts';
import cn from 'classnames';

import { AccountsByStorage } from './accountsByStorage/AccountsByStorage';

import s from './accountsByStorageRow.module.css';

type Props = {
  className?: string;
}

export const AccountsByStorageRow: React.FC<Props> = ({
  className,
}) => {
  const { accountsByStores } = useAccountsStore();

  return (
    <div className={cn(s.root, className)}>
      <div className={s.contentContainer}>
        {accountsByStores?.map((data) => (
          <AccountsByStorage data={data} />
        ))}
      </div>
    </div>
  );
};
