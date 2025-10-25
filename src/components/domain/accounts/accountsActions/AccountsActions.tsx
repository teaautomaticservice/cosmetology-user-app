import { Button } from 'antd';
import cn from 'classnames';

import s from './accountsActions.module.css';

type Props = {
  className?: string;
}

export const AccountsActions: React.FC<Props> = ({
  className,
}) => {
  return (
    <div className={cn(s.root, className)}>
      <Button>Edit mode</Button>
    </div>
  );
};
