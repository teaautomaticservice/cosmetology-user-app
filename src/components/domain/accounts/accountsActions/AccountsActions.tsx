import { useAccountsParams } from '@components/pages/accounts/useAccountsParams';
import { useModalStore } from '@stores/modal';
import { useAccountsPageStore } from '@stores/pages/accountsPage';
import {
  Button,
  Checkbox,
  Select,
  Tooltip
} from 'antd';
import cn from 'classnames';
import { fromEntityToOptionsList } from 'src/adapters/fromEntityToOptionsList';

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
    moneyStorages,
    toggleEditMode,
    toggleAggregateMode,
    updateAccountsList,
  } = useAccountsPageStore();
  const { open } = useModalStore();
  const {
    params,
    updateAccountsFilters,
  } = useAccountsParams();

  const isDisableCreate = !Boolean(currencies.length);

  const items = fromEntityToOptionsList(moneyStorages);
  const selectValues = params.accountsMoneyStoragesIds?.map((val) => Number(val));

  const openCreateAccountModal = () => {
    open('createAccountsModal');
  };

  const onChange = (val: number[]) => {
    updateAccountsFilters({
      accountsMoneyStoragesIds: val.map((item) => String(item)),
    });
    updateAccountsList();
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
        <>
          <Select
            mode='multiple'
            options={items}
            placeholder='Select money storages'
            value={selectValues}
            onChange={onChange}
            className={s.select}
          />
          <Checkbox checked={isAggregated} onChange={toggleAggregateMode}>Aggregate</Checkbox>
        </>
      )}
    </div>
  );
};
