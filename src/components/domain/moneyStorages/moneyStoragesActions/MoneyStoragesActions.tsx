import { useModalStore } from '@stores/modal';
import { Button } from 'antd';
import cn from 'classnames';

import s from './moneyStoragesActions.module.css';

type Props = {
  classNames?: string;
}

export const MoneyStoragesActions: React.FC<Props> = ({
  classNames,
}) => {
  const { open } = useModalStore();

  const openCreateMoneyStorageModal = () => {
    open('createMoneyStorageModal');
  };

  const openCreateObligationStorageModal = () => {
    open('createObligationStorageModal');
  };

  return (
    <div className={cn(s.root, classNames)}>
      <Button onClick={openCreateMoneyStorageModal}>Create new Storage</Button>
      <Button onClick={openCreateObligationStorageModal}>Create new Obligation Storage</Button>
    </div>
  );
};
