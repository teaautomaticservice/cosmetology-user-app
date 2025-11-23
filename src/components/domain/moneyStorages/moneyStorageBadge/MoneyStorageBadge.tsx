import { getColorStatus } from '@constants/colorStatusMap';
import { MoneyStorageStatus } from '@typings/api/cashier';
import { Badge } from 'antd';

type Props = {
  moneyStorageStatus?: MoneyStorageStatus;
  className?: string;
  isSmall?: boolean;
};

export const MoneyStorageBadge: React.FC<Props> = ({
  moneyStorageStatus,
  className,
  isSmall,
}) => {
  if (!moneyStorageStatus) {
    return null;
  }
  
  return (
    <Badge
      className={className}
      color={getColorStatus(moneyStorageStatus)}
      text={isSmall ? '' : moneyStorageStatus}
    />
  );
};
