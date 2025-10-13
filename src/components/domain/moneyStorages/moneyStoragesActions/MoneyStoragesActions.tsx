import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { Button } from 'antd';
import cn from 'classnames';

import s from './moneyStoragesActions.module.css';

type Props = {
  classNames?: string;
}

export const MoneyStoragesActions: React.FC<Props> = ({
  classNames,
}) => {
  const { createMoneyStorage, updateAllMoneyStorages } = useMoneyStoragesStore();

  const onCreateClick = async () => {
    await createMoneyStorage();
    updateAllMoneyStorages();
  };

  return (
    <div className={cn(s.root, classNames)}>
      <Button onClick={onCreateClick}>Create new Storage</Button>
    </div>
  );
};
