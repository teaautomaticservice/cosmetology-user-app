import { useModalStore } from '@stores/modal';
import { useAccountsPageStore } from '@stores/pages/accountsPage';
import { Button, Checkbox, Tooltip } from 'antd';
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
    isAggregated,
    toggleEditMode,
    toggleAggregateMode,
  } = useAccountsPageStore();
  const { open } = useModalStore();

  const isDisableCreate = !Boolean(currencies.length);

  const openCreateAccountModal = () => {
    open('createAccountsModal');
  };

  return (
    <div className={cn(s.root, className)}>
      <Tooltip title='Create currency first' open={isDisableCreate ? undefined : false}>
        <Button
          disabled={isDisableCreate}
          onClick={openCreateAccountModal}
        >
          Create account
        </Button>
      </Tooltip>
      <Button type={isEditMode ? 'primary' : 'default'} onClick={toggleEditMode}>Edit mode</Button>
      {isEditMode && (
        <Checkbox checked={isAggregated} onChange={toggleAggregateMode}>Aggregate</Checkbox>
      )}
    </div>
  );
};
