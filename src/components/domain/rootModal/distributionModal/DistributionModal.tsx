import { useEffect, useMemo, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { CreateEntityModal, CreateModalRow } from '@components/ui/createEntityModal/CreateEntityModal';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { AccountStatus } from '@typings/api/generated';
import { fromAmountApi, toAmountApi } from '@utils/amount';
import { selectFIlterOption } from '@utils/selectFIlterOption';
import { selectFilterSort } from '@utils/selectFilterSort';
import { Button, InputNumber, Select } from 'antd';
import { debounce } from 'lodash';
import { fromEntityToOptionsList } from 'src/adapters/fromEntityToOptionsList';

import { createAccountTitle } from '../utils/createTitile';

import s from './distributionModal.module.css';

type DebitAccount = {
  moneyStorageId: number;
  amount: number;
  debitId: number;
}

type FormData = {
  description?: string;
  debitAccounts: DebitAccount[];
}

type Modal = CreateModalRow<any, FormData>;

export const DistributionModal: React.FC = () => {
  const {
    createTransfer,
  } = useTransactionsStore();
  const {
    accountsWithStoresForParams,
    currentAccountWithStore,
    isAccountsLoading,
    updateAccountsListParams,
  } = useAccountsStore();
  const {
    moneyStorages,
  } = useMoneyStoragesStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rowAccountsCount, setRowAccountsCount] = useState(1);
  const [accountsAmount, setAccountsAmount] = useState(0);

  const accountsOptions = useMemo(() =>
    accountsWithStoresForParams
      .filter(({ id }) => (
        id !== currentAccountWithStore?.id
      ))
      .map((({
        id,
        name,
        moneyStorage,
        available,
        currency
      }) => ({
        value: id,
        label: `${name}: ${moneyStorage?.name ?? 'n/a'}, ${fromAmountApi(available)} ${currency?.code ?? ''}`,
      }))), [accountsWithStoresForParams]);

  const accountsRows = useMemo<Modal[]>(
    () => Array.from({ length: rowAccountsCount }, (_, index): Modal => ({
      name: `account-${index}`,
      type: 'custom',
      className: s.accountRow,
      CustomComponent: ({ FormItem }) => (
        <div className={s.accountRowContent}>
          <FormItem
            className={s.accountSelect}
            name={['debitAccounts', index, 'debitId']}
            rules={[{ required: true, message: 'Please select account' }]}
            label='Debit account'
          >
            <Select
              showSearch
              options={accountsOptions}
              filterOption={selectFIlterOption}
              filterSort={selectFilterSort}
              className={s.item}
            />
          </FormItem>
          <FormItem
            className={s.accountAmount}
            name={['debitAccounts', index, 'amount']}
            rules={[{ required: true }]}
            label='Amount'
          >
            <InputNumber
              min={0.01}
              step="0.01"
              precision={2}
              className={s.item}
            />
          </FormItem>
          <FormItem className={s.accountBtn}>
            <Button icon={<CloseOutlined />} />
          </FormItem>
        </div>
      )
    })),
    [rowAccountsCount]
  );

  const updateFilterAccounts = debounce(() => {
    updateAccountsListParams({
      moneyStoragesIds:
        currentAccountWithStore?.moneyStorageId ?
          [currentAccountWithStore.moneyStorageId.toString()] :
          undefined,
      status: [AccountStatus.ACTIVE]
    });
  }, 500);

  const addAccountRow = () => {
    console.log(accountsRows);
    setRowAccountsCount((state) => state += 1);
  };

  const onSubmit = async (formData: FormData) => {
    if (!currentAccountWithStore) {
      return;
    }

    console.log('submit', formData);

    // await createTransfer({
    //   amount: toAmountApi(amount),
    //   description: description ?? null,
    //   creditId: currentAccountWithStore.id,
    //   debitId,
    // });
    // window.location.reload();
  };

  useEffect(() => {
    updateFilterAccounts();
  }, []);

  useEffect(() => {
    if (!isAccountsLoading) {
      setIsLoading(false);
    }
  }, [isAccountsLoading]);

  return (
    <CreateEntityModal<any & FormData, FormData >
      title={createAccountTitle(currentAccountWithStore, { title: 'Distribution' })}
      onSubmit={onSubmit}
      className={s.root}
      rows={[
        {
          initialValue: 0,
          label: 'Amount',
          name: 'amount',
          isRequired: true,
          type: 'inputNumber',
          min: 0.01,
          max: currentAccountWithStore?.available,
          precision: 2,
          step: '0.01',
          formatter: (value) => {
            if (!value) {
              return value;
            }
            return Number(Number(value).toFixed(2));
          },
          onChange: (_, formInstance) =>
            updateFilterAccounts(),
          suffix: currentAccountWithStore?.currency.code ?? 'n/a',
        },
        ...accountsRows,
        {
          type: 'button',
          name: 'buttonClick',
          buttonLabel: 'Add distribution account',
          onClick: addAccountRow,
        },
        // {
        //   label: 'Debit account',
        //   name: 'debitId',
        //   isRequired: true,
        //   type: 'select',
        //   isSearch: true,
        //   isSort: true,
        //   options: accountsOptions,
        // },
        { label: 'Description', name: 'description', type: 'textarea' },
      ]}
      isLoading={isLoading}
    />
  );
};
