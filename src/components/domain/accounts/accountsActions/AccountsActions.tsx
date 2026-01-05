import { ChangeEvent } from 'react';
import { useAccountsParams } from '@components/pages/accounts/useAccountsParams';
import { useObligationAccountStore } from '@stores/cashier/obligationAccount';
import { useModalStore } from '@stores/modal';
import { useAccountsPageStore } from '@stores/pages/accountsPage';
import { AccountStatus } from '@typings/api/generated';
import { fromAmountApi, toAmountApi } from '@utils/amount';
import {
  Button,
  Input,
  InputNumber,
  Select,
  Tooltip
} from 'antd';
import cn from 'classnames';
import { debounce } from 'lodash';
import { fromEntityToOptionsList } from 'src/adapters/fromEntityToOptionsList';

import s from './accountsActions.module.css';

type Props = {
  className?: string;
  isCreateAccount?: boolean;
  typeMoneyStorages?: 'common' | 'obligation';
}

export const AccountsActions: React.FC<Props> = ({
  className,
  isCreateAccount = false,
  typeMoneyStorages = 'common',
}) => {
  const {
    currencies,
    moneyStorages,
  } = useAccountsPageStore();
  const { open } = useModalStore();
  const {
    params,
    updateAccountsFilters,
    deleteParam,
  } = useAccountsParams();
  const {
    obligationAccountsStorages,
  } = useObligationAccountStore();

  const isDisableCreate = !Boolean(currencies.length);

  const itemsMoneyStorages = fromEntityToOptionsList(
    typeMoneyStorages === 'obligation' ? obligationAccountsStorages : moneyStorages
  );

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

  const onChangeBalanceFrom = debounce((value: number | null) => {
    if (value) {
      updateAccountsFilters({
        balanceFrom: toAmountApi(value).toString(),
      });
    } else {
      deleteParam(['balanceFrom']);
    }
  }, 500);

  const onChangeBalanceTo = debounce((value: number | null) => {
    if (value) {
      updateAccountsFilters({
        balanceTo: toAmountApi(value).toString(),
      });
    } else {
      deleteParam(['balanceTo']);
    }
  }, 500);

  return (
    <div className={cn(s.root, className)}>
      <div className={s.wrapper}>
        {isCreateAccount && (
          <Tooltip title='Create currency first' open={isDisableCreate ? undefined : false}>
            <Button
              disabled={isDisableCreate}
              onClick={openCreateAccountModal}
            >
              Create account
            </Button>
          </Tooltip>
        )}
        <>
          <Input
            placeholder='Input query'
            className={s.input}
            onChange={onChangeInput}
            value={params.query}
          />
          <InputNumber
            placeholder='Input balance From'
            className={s.input}
            onChange={onChangeBalanceFrom}
            value={params.balanceFrom ? Number(fromAmountApi(params.balanceFrom)) : undefined}
            precision={2}
            step={'0.01'}
            formatter={(value) => {
              if (!value) {
                return String(value ?? '');
              }
              return String(Number(value).toFixed(2));
            }}
          />
          <InputNumber
            placeholder='Input balance To'
            className={s.input}
            onChange={onChangeBalanceTo}
            value={params.balanceTo ? Number(fromAmountApi(params.balanceTo)) : undefined}
            precision={2}
            step={'0.01'}
            formatter={(value) => {
              if (!value) {
                return String(value ?? '');
              }
              return String(Number(value).toFixed(2));
            }}
          />
          < Select
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
        </>
      </div>
    </div>
  );
};
