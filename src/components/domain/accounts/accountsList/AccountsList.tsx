import { TableUi } from '@components/ui/table/TableUi';
import { useAccountsPageStore } from '@stores/pages/accountsPage';
import { AccountsWithStore } from '@typings/api/cashier';
import { ColumnsType } from 'antd/es/table';
import cn from 'classnames';

const columns: ColumnsType<AccountsWithStore> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
  },
  {
    title: 'Available',
    dataIndex: 'available',
  },
];

type Props = {
  className?: string;
}

export const AccountsList: React.FC<Props> = ({
  className,
}) => {
  const { accountsWithStores, isAccountsPageLoading } = useAccountsPageStore();

  return (
    <div className={cn(className)}>
      <TableUi
        columns={columns}
        dataSource={accountsWithStores}
        loading={isAccountsPageLoading}
      />
    </div>
  );
};
