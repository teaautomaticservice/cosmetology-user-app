import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getAccountsWithMoneyStoragesApi } from '@apiMethods/cashier';
import { useApiCall } from '@hooks/useApiCall';
import { AccountWithStore, GetAccountsControllerListParams } from '@typings/api/cashier';
import { debounce } from 'lodash';

export const useAccountsLoading = (baseParams: GetAccountsControllerListParams = {}) => {
  const [filters, setFilters] = useState<GetAccountsControllerListParams>(baseParams);
  const [pinnedId, setPinnedId] = useState<number | null>(null);
  const seenAccounts = useRef<Map<number, AccountWithStore>>(new Map());

  const {
    isApiLoading,
    data,
    execute,
  } = useApiCall(getAccountsWithMoneyStoragesApi);

  const fetchAccounts = useMemo(() => debounce(execute, 500), [execute]);

  const patchFilters = useCallback(
    (patch: Partial<GetAccountsControllerListParams>) =>
      setFilters((prev) => ({ ...prev, ...patch })),
    []);

  useEffect(() => {
    fetchAccounts(filters);

    return () => fetchAccounts.cancel();
  }, [filters, fetchAccounts]);

  useEffect(() => {
    data?.data?.forEach((account) => seenAccounts.current.set(account.id, account));
  }, [data]);

  const accounts = useMemo(() => {
    const list = data?.data ?? [];

    if (pinnedId === null || list.some(({ id }) => id === pinnedId)) {
      return list;
    }

    const pinned = seenAccounts.current.get(pinnedId);

    return pinned ? [pinned, ...list] : list;
  }, [data, pinnedId]);

  return {
    accounts,
    isLoading: isApiLoading,
    filters,
    patchFilters,
    setFilters,
    pin: setPinnedId,
  };
};
