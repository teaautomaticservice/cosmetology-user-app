import { Button } from 'antd';
import cn from 'classnames';

import s from './currenciesActions.module.css';

type Props = {
  className?: string;
}

export const CurrenciesActions: React.FC<Props> = ({
  className,
}) => {
  return (
    <div className={cn(s.root, className)}>
      <Button>Create currency</Button>
    </div>
  );
};
