import { MenuOutlined } from '@ant-design/icons';
import { MoneyStorageBadge } from '@components/domain/moneyStorages/moneyStorageBadge/MoneyStorageBadge';
import { useAccountsParams } from '@components/pages/accounts/useAccountsParams';
import { TableUi } from '@components/ui/table/TableUi';
import { getColorStatus } from '@constants/colorStatusMap';
import { paths } from '@router/paths';
import { useModalStore } from '@stores/modal';
import { useAccountsPageStore } from '@stores/pages/accountsPage';
import { AccountWithStorageStatusEnum, AccountWithStore, Currency, MoneyStorage } from '@typings/api/cashier';
import { fromAmountApi } from '@utils/amount';
import { Badge, Button, Dropdown, MenuProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'antd/es/typography/Link';
import cn from 'classnames';

import s from './accountsWithStorageList.module.css';

type Props = {
  className?: string;
}

export const AccountsWithStorageList: React.FC<Props> = ({
  className,
}) => {
  const {
    accountsWithStores,
    isAccountsPageLoading,
    accountsWithStoresCount,
    setCurrentAccountWithStore,
  } = useAccountsPageStore();
  const {
    open,
  } = useModalStore();
  const {
    params,
    updateAggregatedAccountsPagination,
  } = useAccountsParams();

  const openEditModal = (account: AccountWithStore) => {
    setCurrentAccountWithStore(account);
    open('editAccountWithStorages');
  };

  const openOpenBalanceModal = (account: AccountWithStore) => {
    setCurrentAccountWithStore(account);
    open('createOpenBalanceModal');
  };

  const openCashOutModal = (account: AccountWithStore) => {
    setCurrentAccountWithStore(account);
    open('createCashOutModal');
  };

  const openTakeLoanModal = (account: AccountWithStore) => {
    setCurrentAccountWithStore(account);
    open('takeLoanModal');
  };

  const openGiveLentModal = (account: AccountWithStore) => {
    setCurrentAccountWithStore(account);
    open('giveLentModal');
  };

  const openReceiptModal = (account: AccountWithStore) => {
    setCurrentAccountWithStore(account);
    open('createReceiptModal');
  };

  const openTransferModal = (account: AccountWithStore) => {
    setCurrentAccountWithStore(account);
    open('transferModal');
  };

  const otherActionsItems = (account: AccountWithStore): MenuProps['items'] => [
    {
      label: 'Edit',
      key: '1',
      onClick: () => openEditModal(account),
    },
    ...((
      Number(account.balance) === 0 &&
      Number(account.available) === 0 &&
      account.status === AccountWithStorageStatusEnum.ACTIVE
    ) ? [{
        label: 'Open Balance',
        key: '2',
        onClick: () => openOpenBalanceModal(account),
      }] : []),
    ...(account.status === AccountWithStorageStatusEnum.ACTIVE ? [{
      label: 'Take loan',
      key: '3',
      onClick: () => openTakeLoanModal(account),
    }] : []),
    ...((
      Number(account.balance) !== 0 &&
      Number(account.available) !== 0 &&
      account.status === AccountWithStorageStatusEnum.ACTIVE
    ) ? [{
        label: 'Give lent',
        key: '4',
        onClick: () => openGiveLentModal(account),
      }] : []),
  ];

  const columns: ColumnsType<AccountWithStore> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Status',
      render: ({ status }: AccountWithStore) => (
        <Badge
          color={getColorStatus(status)}
          text={status}
        />
      )
    },
    {
      title: 'Balance',
      render: ({ balance }: AccountWithStore) => (
        <span>{fromAmountApi(balance)}</span>
      )
    },
    {
      title: 'Available',
      render: ({ available }: AccountWithStore) => (
        <span>{fromAmountApi(available)}</span>
      )
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      render: ({ code }: Currency) => (
        <span>{code}</span>
      )
    },
    {
      title: 'Money storage',
      dataIndex: 'moneyStorage',
      render: ({ name, code, status }: MoneyStorage) => (
        <span className={s.monyStoragesCard}>
          <strong>{name}</strong>, {code}
          <MoneyStorageBadge moneyStorageStatus={status} />
        </span>
      ),
    },
    {
      title: 'Actions',
      className: s.actionsCol,
      render: (_, account) => (
        <div className={s.actions}>
          <div className={s.actionsWrapper}>
            {(
              account.status === AccountWithStorageStatusEnum.ACTIVE
            ) && (
              <Button onClick={() => openReceiptModal(account)}>
                  Receipt
              </Button>
            )}
            {(
              Number(account.balance) > 0 &&
              Number(account.available) > 0 &&
              account.status === AccountWithStorageStatusEnum.ACTIVE
            ) && (
              <Button onClick={() => openTransferModal(account)}>
                  Transfer to
              </Button>
            )}
            {(
              Number(account.available) > 0 &&
              account.status === AccountWithStorageStatusEnum.ACTIVE
            ) && (
              <Button onClick={() => openCashOutModal(account)}>
                  Cash Out
              </Button>
            )}
            <Dropdown menu={{ items: otherActionsItems(account) }} trigger={['click']}>
              <Button
                type="default"
                title='Other actions'
                icon={<MenuOutlined />}
              />
            </Dropdown>
            <Link className={s.link} href={paths.transactions({
              anyAccountIds: [account.id.toString()],
            })}>
              History
            </Link>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className={cn(className)}>
      <TableUi
        columns={columns}
        dataSource={accountsWithStores}
        loading={isAccountsPageLoading}
        className={s.root}
        pagination={{
          total: accountsWithStoresCount,
          current: Number(params.page ?? 1),
          pageSize: Number(params.pageSize ?? 10),
          onChange: updateAggregatedAccountsPagination,
          onShowSizeChange: updateAggregatedAccountsPagination,
        }}
      />
    </div>
  );
};
