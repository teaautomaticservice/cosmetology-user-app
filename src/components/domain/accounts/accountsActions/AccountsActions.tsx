import { ChangeEvent } from 'react';
import { useAccountsParams } from '@components/pages/accounts/useAccountsParams';
import { useModalStore } from '@stores/modal';
import { useAccountsPageStore } from '@stores/pages/accountsPage';
import { AccountStatus } from '@typings/api/generated';
import {
  Button,
  Checkbox,
  Input,
  Select,
  Tooltip
} from 'antd';
import cn from 'classnames';
import { debounce } from 'lodash';
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
  } = useAccountsPageStore();
  const { open } = useModalStore();
  const {
    params,
    updateAccountsFilters,
    deleteParam,
  } = useAccountsParams();

  const isDisableCreate = !Boolean(currencies.length);

  const itemsMoneyStorages = fromEntityToOptionsList(moneyStorages);
  const itemsStatuses = Object.values(AccountStatus).map((value) => ({
    value: value,
    label: value,
  }));
  const selectedMoneyStorages = params.accountsMoneyStoragesIds?.map((val) => Number(val));
  const selectedStatuses = params.status;

  const openCreateAccountModal = () => {
    open('createAccountsModal');
  };

  const onChangeMoneyStorage = (val: number[]) => {
    updateAccountsFilters({
      accountsMoneyStoragesIds: val.map((item) => String(item)),
    });
  };

  const onChangeStatus = (val: AccountStatus[]) => {
    updateAccountsFilters({
      status: val,
    });
  };

  const onChangeInput = debounce(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    if (Boolean(currentTarget.value)) {
      updateAccountsFilters({
        query: currentTarget.value,
      });
    } else {
      deleteParam(['query']);
    }
  }, 500);

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
          <Input
            placeholder='Input query'
            className={s.input}
            onChange={onChangeInput}
            defaultValue={params.query}
          />
          <Select
            mode='multiple'
            options={itemsMoneyStorages}
            placeholder='Select money storages'
            value={selectedMoneyStorages}
            onChange={onChangeMoneyStorage}
            className={s.select}
          />
          <Select
            mode='multiple'
            options={itemsStatuses}
            placeholder='Select statuses'
            value={selectedStatuses}
            onChange={onChangeStatus}
            className={s.select}
          />
          <Checkbox checked={isAggregated} onChange={toggleAggregateMode}>Aggregate</Checkbox>
        </>
      )}
    </div>
  );
};
