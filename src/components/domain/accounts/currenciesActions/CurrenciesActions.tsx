import { useModalStore } from '@stores/modal';
import { Button } from 'antd';
import cn from 'classnames';

import s from './currenciesActions.module.css';

type Props = {
  className?: string;
}

export const CurrenciesActions: React.FC<Props> = ({
  className,
}) => {
  const { open } = useModalStore();

  const openCreate = () => open('createCurrencyModal');

  return (
    <div className={cn(s.root, className)}>
      <Button onClick={openCreate}>Create currency</Button>
    </div>
  );
};
