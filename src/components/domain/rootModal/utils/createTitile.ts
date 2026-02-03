import { GetAccountWithStorageDto } from '@typings/api/generated';
import { fromAmountApi } from '@utils/amount';
import cn from 'classnames';

export const createTitle = (account: GetAccountWithStorageDto | null, {
  title,
}: {
  title: string;
}) => cn(
  `${title}:`,
  account?.name,
  '-',
  account?.moneyStorage?.code,
  'Available:',
  fromAmountApi(account?.available ?? 0),
  account?.currency.code,
);
