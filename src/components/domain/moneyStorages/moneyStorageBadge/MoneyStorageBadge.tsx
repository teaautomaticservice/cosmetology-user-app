import { MoneyStorageStatus, MoneyStorageStatusEnum } from '@typings/api/cashier';
import { Badge, BadgeProps } from 'antd';

type Props = {
  moneyStorageStatus?: MoneyStorageStatus;
  className?: string;
  isSmall?: boolean;
};

const statusColorsMap: Record<MoneyStorageStatus, BadgeProps['color']> = {
  [MoneyStorageStatusEnum.CREATED]: 'yellow',
  [MoneyStorageStatusEnum.ACTIVE]: 'green',
  [MoneyStorageStatusEnum.DEACTIVATED]: 'red',
  [MoneyStorageStatusEnum.FREEZED]: 'blue',
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
      color={statusColorsMap[moneyStorageStatus]}
      text={isSmall ? '' : moneyStorageStatus}
    />
  );
};
