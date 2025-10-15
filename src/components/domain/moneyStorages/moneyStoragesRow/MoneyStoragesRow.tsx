import { useMoneyStoragesPageStore } from '@stores/pages/moneyStoragesPage';
import { MoneyStorage } from '@typings/api/cashier';
import { Button, Card, List } from 'antd';
import cn from 'classnames';

import { MoneyStorageBadge } from '../moneyStorageBadge/MoneyStorageBadge';

import s from './moneyStoragesRow.module.css';

type Props = {
  items: MoneyStorage[];
  isLoading?: boolean;
  className?: string;
};

export const MoneyStoragesRow: React.FC<Props> = ({
  items,
  isLoading,
  className,
}) => {
  const { openUpdateModal } = useMoneyStoragesPageStore();

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

  const openModal = (moneyStorage: MoneyStorage) => {
    openUpdateModal(moneyStorage);
  };

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
              extra={<MoneyStorageBadge moneyStorageStatus={storageData.status} />}
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
              <Button
                className={s.actionBtn}
                onClick={() => openModal(storageData)}
              >
                Actions
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
