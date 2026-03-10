import { useTransactionsParams } from '@components/pages/transactions/useTransactionsParams';
import { withParams } from '@hocs/withParams';
import { TransactionOperationTypeEnum } from '@typings/api/cashier';
import { fromAmountApi, toAmountApi } from '@utils/amount';
import { inputFormatter } from '@utils/domain/inputFormatter';
import { Input, InputNumber, InputNumberProps, InputProps, Select } from 'antd';
import cn from 'classnames';
import { OptionOfList } from 'src/adapters/fromEntityToOptionsList';

import s from './transactionsActions.module.css';

type Props = {
  className?: string;
}

const InputParams = withParams<string | undefined, InputProps>(Input);
const InputNumberParams = withParams<string | undefined, InputNumberProps<string>>(InputNumber);

export const TransactionsActions: React.FC<Props> = ({ className }) => {
  const {
    params,
    deleteParam,
    updateTransactionsFilters,
  } = useTransactionsParams();

  const transactionOperationTypesOptions: OptionOfList[] =
    Object.entries(TransactionOperationTypeEnum).map(([key, val]) => ({
      label: key,
      value: val,
    }));

  const onChangeInput = (key: keyof typeof params, value?: string) => {
    if (value) {
      updateTransactionsFilters({
        [key]: [value],
      });
    } else {
      deleteParam([key]);
    }
  };

  const onChangeBalance = (key: keyof typeof params, value?: string) => {
    if (value) {
      updateTransactionsFilters({
        [key]: toAmountApi(Number(value)),
      });
    } else {
      deleteParam([key]);
    }
  };

  const onChangeArray = (key: keyof typeof params, value?: string[]) => {
    if (value) {
      updateTransactionsFilters({
        [key]: value,
      });
    } else {
      deleteParam([key]);
    }
  };

  return (
    <div className={cn(s.root, className)}>
      <div className={s.wrapper}>
        <InputParams
          placeholder='Any id'
          className={s.input}
          onChange={(val) => onChangeInput('anyId', val)}
          value={params.anyId ?? ''}
          allowClear
        />
        <InputParams
          placeholder='Query'
          className={s.input}
          onChange={(val) => onChangeInput('query', val)}
          value={params.query ?? ''}
          allowClear
        />
        <InputParams
          placeholder='Any accounts IDs'
          className={s.input}
          onChange={(val) => onChangeInput('anyAccountIds', val)}
          value={params.anyAccountIds?.[0] ?? ''}
          allowClear
        />
        <InputParams
          placeholder='Credit accounts IDs'
          className={s.input}
          onChange={(val) => onChangeInput('creditIds', val)}
          value={params.creditIds?.[0] ?? ''}
          allowClear
        />
        <InputParams
          placeholder='Debit accounts IDs'
          className={s.input}
          onChange={(val) => onChangeInput('debitIds', val)}
          value={params.debitIds?.[0] ?? ''}
          allowClear
        />
        <Select
          mode='multiple'
          options={transactionOperationTypesOptions}
          placeholder='Select operations types'
          value={params.operationTypes}
          onChange={(val) => onChangeArray('operationTypes', val)}
          className={s.select}
          allowClear
        />
        <InputNumberParams
          placeholder='Amount from'
          className={s.input}
          onChange={(val) => onChangeBalance('amountFrom', val)}
          value={params.amountFrom ? fromAmountApi(params.amountFrom) : undefined}
          precision={2}
          step={'0.01'}
          formatter={inputFormatter}
        />
        <InputNumberParams
          placeholder='Amount to'
          className={s.input}
          onChange={(val) => onChangeBalance('amountTo', val)}
          value={params.amountTo ? fromAmountApi(params.amountTo) : undefined}
          precision={2}
          step={'0.01'}
          formatter={inputFormatter}
        />
      </div>
    </div>
  );
};
