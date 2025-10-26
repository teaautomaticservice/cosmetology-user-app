import { useAccountsPageStore } from '@stores/pages/accountsPage';
import { Button } from 'antd';
import cn from 'classnames';

import s from './accountsActions.module.css';

type Props = {
  className?: string;
}

export const AccountsActions: React.FC<Props> = ({
  className,
}) => {
  const { isEditMode, toggleEditMode } = useAccountsPageStore();

  return (
    <div className={cn(s.root, className)}>
      <Button type={isEditMode ? 'primary' : 'default'} onClick={toggleEditMode}>Edit mode</Button>
    </div>
  );
};
