import { useEffect, useMemo, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { CreateEntityModal, CreateModalRow } from '@components/ui/createEntityModal/CreateEntityModal';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { DistributionAccountsApi } from '@typings/api/cashier';
import { AccountStatus } from '@typings/api/generated';
import { fromAmountApi, toAmountApi } from '@utils/amount';
import { selectFIlterOption } from '@utils/selectFIlterOption';
import { selectFilterSort } from '@utils/selectFilterSort';
import { Button, InputNumber, Select, Typography } from 'antd';
import { debounce } from 'lodash';

import { createAccountTitle } from '../utils/createAccountTitle';

import s from './distributionModal.module.css';

const { Text } = Typography;

type DebitAccount = {
  moneyStorageId: number;
  amount: number;
  debitId: number;
}

type FormData = {
  description?: string;
  debitAccounts: Record<string, DebitAccount>;
}

type Modal = CreateModalRow<any, FormData>;

export const DistributionModal: React.FC = () => {
  const {
    distributionAccounts,
  } = useTransactionsStore();
  const {
    accountsWithStoresForParams,
    currentAccountWithStore,
    isAccountsLoading,
    updateAccountsListParams,
  } = useAccountsStore();

  const initialCalculation = {
    distributed: 0,
    available: currentAccountWithStore?.available ?? 0,
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rowAccountsKeys, setRowAccountsKeys] = useState<string[]>([crypto.randomUUID()]);
  const [calculation, setCalculation] = useState(initialCalculation);

  const isAvailable = calculation.available >= 0;
  const calculationType = isAvailable ? undefined : 'danger';

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
    setRowAccountsKeys((state) => [...state, crypto.randomUUID()]);
  };

  const removeAccountRow = (val: string) => {
    setRowAccountsKeys((state) => state.filter((key) => val !== key));
  };

  const onFormChange = (formData: FormData | undefined) => {
    setCalculation(initialCalculation);
    if (!formData?.debitAccounts) {
      return;
    };
    const currentDebitAccounts = Object.values(formData.debitAccounts);
    currentDebitAccounts.forEach(({ amount }) => {
      setCalculation((state) => ({
        available: state.available - toAmountApi(amount ?? 0),
        distributed: state.distributed + toAmountApi(amount ?? 0),
      }));
    });
  };

  const onSubmit = async ({
    description,
    debitAccounts,
  }: FormData) => {
    if (!currentAccountWithStore) {
      return;
    }

    await distributionAccounts({
      creditId: currentAccountWithStore.id,
      description: description ?? null,
      distributedAccounts: Object.values(debitAccounts),
    });
    window.location.reload();
  };

  useEffect(() => {
    updateFilterAccounts();
  }, []);

  useEffect(() => {
    if (!isAccountsLoading) {
      setIsLoading(false);
    }
  }, [isAccountsLoading]);

  const accountsRows = useMemo<Modal[]>(
    () => rowAccountsKeys.map((key) => ({
      name: `account-${key}`,
      type: 'custom',
      className: s.accountRow,
      CustomComponent: ({ FormItem, formInstance }) => (
        <div className={s.accountRowContent}>
          <FormItem
            className={s.accountSelect}
            name={['debitAccounts', key, 'debitId']}
            rules={[
              { required: true, message: 'Please select account' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.resolve();
                  }
                  const accounts: FormData['debitAccounts'] =
                    getFieldValue('debitAccounts') ?? {};
                  const isDuplicate = Object.entries(accounts).some(
                    ([rowKey, acc]) => rowKey !== key && acc?.debitId === value
                  );
                  return isDuplicate
                    ? Promise.reject(new Error('Account already selected'))
                    : Promise.resolve();
                },
              }),
            ]}
            label='Debit account'
          >
            <Select
              showSearch
              options={accountsOptions}
              filterOption={selectFIlterOption}
              filterSort={selectFilterSort}
              className={s.item}
              onChange={() => {
                formInstance.validateFields(
                  rowAccountsKeys.map((k) => ['debitAccounts', k, 'debitId'])
                );
              }}
            />
          </FormItem>
          <FormItem
            className={s.accountAmount}
            name={['debitAccounts', key, 'amount']}
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
            <Button
              icon={<CloseOutlined />}
              onClick={() => removeAccountRow(key)}
            />
          </FormItem>
        </div>
      ),
    })),
    [rowAccountsKeys],
  );

  return (
    <CreateEntityModal<DistributionAccountsApi & FormData, FormData >
      title={createAccountTitle(currentAccountWithStore, { title: 'Distribution' })}
      onSubmit={onSubmit}
      className={s.root}
      onFormChange={onFormChange}
      classNameContainer={s.contentWrapper}
      classNameForm={s.formContainer}
      externalDisabled={!isAvailable}
      rows={[
        ...accountsRows,
        {
          type: 'button',
          name: 'buttonClick',
          buttonLabel: 'Add distribution account',
          onClick: addAccountRow,
        },
        { label: 'Description', name: 'description', type: 'textarea' },
      ]}
      isLoading={isLoading}
    >
      <div className={s.contentContainer}>
        <Text>Available</Text>
        <Text strong type={calculationType}>
          {fromAmountApi(calculation.available)}
        </Text>
        <Text>Distributed</Text>
        <Text strong type={calculationType}>
          {fromAmountApi(calculation.distributed)}
        </Text>
      </div>
    </CreateEntityModal>
  );
};
