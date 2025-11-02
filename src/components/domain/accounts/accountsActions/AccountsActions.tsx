import { useModalStore } from '@stores/modal';
import { useAccountsPageStore } from '@stores/pages/accountsPage';
import { Button, Tooltip } from 'antd';
import cn from 'classnames';

import s from './accountsActions.module.css';

type Props = {
  className?: string;
}

export const AccountsActions: React.FC<Props> = ({
  className,
}) => {
  const {
    isEditMode,
    currencies,
    toggleEditMode,
  } = useAccountsPageStore();
  const { open } = useModalStore();

  const isDisableCreate = !Boolean(currencies.length);

  const openCreateAccountModal = () => {
    open('createAccountsModal');
  };

  return (
    <div className={cn(s.root, className)}>
      <Button type={isEditMode ? 'primary' : 'default'} onClick={toggleEditMode}>Edit mode</Button>
      <Tooltip title='Create currency first' open={isDisableCreate ? undefined : false}>
        <Button
          disabled={isDisableCreate}
          onClick={openCreateAccountModal}
        >
          Create account
        </Button>
      </Tooltip>
    </div>
  );
};
