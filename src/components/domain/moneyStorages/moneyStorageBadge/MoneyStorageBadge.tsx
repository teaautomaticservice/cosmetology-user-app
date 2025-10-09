import { MoneyStorageStatus, MoneyStorageStatusEnum } from '@typings/api/moneyStorage';
import { Badge, BadgeProps } from 'antd';

type Props = {
  moneyStorageStatus?: MoneyStorageStatus;
  className?: string;
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
}) => {
  if (!moneyStorageStatus) {
    return null;
  }
  
  return (
    <Badge
      className={className}
      color={statusColorsMap[moneyStorageStatus]}
      text={moneyStorageStatus}
    />
  );
};
