// import { ChangeEvent } from 'react';
import { useTransactionsParams } from '@components/pages/transactions/useTransactionsParams';
import { withParams } from '@hocs/withParams';
// import { useTransactionsStore } from '@stores/cashier/transactions';
import { Input } from 'antd';
import cn from 'classnames';

import s from './transactionsActions.module.css';

type Props = {
  className?: string;
}

const InputParams = withParams<string | undefined>(Input);

export const TransactionsActions: React.FC<Props> = ({ className }) => {
  const {
    params,
    deleteParam,
    updateTransactionsFilters,
  } = useTransactionsParams();

  const onChangeInput = (value: string | null) => {
    if (value) {
      updateTransactionsFilters({
        anyAccountIds: [value],
      });
    } else {
      deleteParam(['anyAccountIds']);
    }
  };

  return (
    <div className={cn(s.root, className)}>
      <div className={s.wrapper}>
        <InputParams
          placeholder='Input query'
          className={s.input}
          onChange={onChangeInput}
          value={params.anyAccountIds?.[0] ?? ''}
          allowClear
        />
      </div>
    </div>
  );
};
