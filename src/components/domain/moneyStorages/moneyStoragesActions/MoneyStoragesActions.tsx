import { Button } from 'antd';
import cn from 'classnames';

import s from './moneyStoragesActions.module.css';

type Props = {
  classNames?: string;
}

export const MoneyStoragesActions: React.FC<Props> = ({
  classNames,
}) => {
  return (
    <div className={cn(s.root, classNames)}>
      <Button>Create new Storage</Button>
    </div>
  );
};
