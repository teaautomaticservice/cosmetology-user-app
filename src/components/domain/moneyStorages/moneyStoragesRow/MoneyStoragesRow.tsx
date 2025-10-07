import { MoneyStorage, MoneyStorageStatus, MoneyStorageStatusEnum } from '@typings/api/moneyStorage';
import { Badge, BadgeProps, Button, Card, List } from 'antd';
import cn from 'classnames';

import s from './moneyStoragesRow.module.css';

type Props = {
  items: MoneyStorage[];
  isLoading?: boolean;
  className?: string;
};

const statusColorsMap: Record<MoneyStorageStatus, BadgeProps['color']> = {
  [MoneyStorageStatusEnum.CREATED]: 'yellow',
  [MoneyStorageStatusEnum.ACTIVE]: 'green',
  [MoneyStorageStatusEnum.DEACTIVATED]: 'red',
  [MoneyStorageStatusEnum.FREEZED]: 'blue',
};

export const MoneyStoragesRow: React.FC<Props> = ({
  items,
  isLoading,
  className,
}) => {

  const adapterDataToList = ({
    id,
    name,
    code,
    status,
  }: MoneyStorage) => ([
    { label: 'ID:', value: id },
    { label: 'Name:', value: name },
    { label: 'Status:', value: status },
    { label: 'Code:', value: code },
  ]);

  return (
    <div className={cn(s.root, className)}>
      {isLoading && (
        <div className={s.itemsContainer}>
          <Card loading={true} className={s.card} />
          <Card loading={true} className={s.card} />
          <Card loading={true} className={s.card} />
        </div>
      )}
      {!isLoading && (
        <div className={s.itemsContainer}>
          {items.map((storageData) => (
            <Card
              key={storageData.id}
              className={s.card}
              title={`${storageData.name}, ${storageData.code}`}
              extra={<Badge color={statusColorsMap[storageData.status]} text={storageData.status} />}
            >
              <List
                dataSource={adapterDataToList(storageData)}
                renderItem={(item) => (
                  <List.Item>
                    <strong className={s.listLabel}>{item.label}</strong> {item.value}
                  </List.Item>
                )}
              />
              {Boolean(storageData.description) && (
                <p>{storageData.description}</p>
              )}
              <Button>Actions</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
