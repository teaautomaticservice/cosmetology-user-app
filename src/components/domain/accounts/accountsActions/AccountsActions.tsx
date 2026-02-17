import { useAccountsParams } from '@components/pages/accounts/useAccountsParams';
import { withParams } from '@hocs/withParams';
import { useObligationAccountStore } from '@stores/cashier/obligationAccount';
import { useModalStore } from '@stores/modal';
import { useAccountsPageStore } from '@stores/pages/accountsPage';
import { AccountStatus } from '@typings/api/generated';
import { fromAmountApi, toAmountApi } from '@utils/amount';
import { inputFormatter } from '@utils/domain/inputFormatter';
import {
  Button,
  Input,
  InputNumber,
  Select,
  Tooltip
} from 'antd';
import cn from 'classnames';
import { fromEntityToOptionsList } from 'src/adapters/fromEntityToOptionsList';

import s from './accountsActions.module.css';

type Props = {
  className?: string;
  isCreateAccount?: boolean;
  typeMoneyStorages?: 'common' | 'obligation';
}

const InputParams = withParams<string | undefined>(Input);
const InputNumberParams = withParams<string | undefined>(InputNumber);

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

  const onChangeInput = (value?: string) => {
    if (Boolean(value)) {
      updateAccountsFilters({
        query: value,
      });
    } else {
      deleteParam(['query']);
    }
  };

  const onChangeBalanceFrom = (value?: number) => {
    if (value) {
      updateAccountsFilters({
        balanceFrom: toAmountApi(value).toString(),
      });
    } else {
      deleteParam(['balanceFrom']);
    }
  };

  const onChangeBalanceTo = (value?: number) => {
    if (value) {
      updateAccountsFilters({
        balanceTo: toAmountApi(value).toString(),
      });
    } else {
      deleteParam(['balanceTo']);
    }
  };

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
          <InputParams
            placeholder='Input query'
            className={s.input}
            onChange={onChangeInput}
            value={params.query}
          />
          <InputNumberParams
            placeholder='Input balance From'
            className={s.input}
            onChange={onChangeBalanceFrom}
            value={params.balanceFrom ? Number(fromAmountApi(params.balanceFrom)) : undefined}
            precision={2}
            step={'0.01'}
            formatter={inputFormatter}
          />
          <InputNumberParams
            placeholder='Input balance To'
            className={s.input}
            onChange={onChangeBalanceTo}
            defaultValue={params.balanceTo ? Number(fromAmountApi(params.balanceTo)) : undefined}
            precision={2}
            step={'0.01'}
            formatter={inputFormatter}
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
        </>
      </div>
    </div>
  );
};
