import { EditEntityModal } from '@components/ui/editEntityModal/EditEntityModal';
import { getColorStatus } from '@constants/colorStatusMap';
import { useAccountsStore } from '@stores/cashier/accounts';
import { AccountWithStorageStatusEnum, AccountWithStore } from '@typings/api/cashier';
import { Badge } from 'antd';

import s from './editAccountWithStorages.module.css';

type FormData = {
  name?: string;
}

export const EditAccountWithStorages: React.FC = () => {
  const {
    currentAccountWithStore,
    isAccountsLoading,
  } = useAccountsStore();

  const onUpdate = async () => {
    console.log('onUpdate');
  };

  const onClose = () => {
    console.log('onUpdate');
  };

  const onDelete = async () => {
    console.log('onUpdate');
  };

  const SubtitleComponent = () => {
    if (!currentAccountWithStore) {
      return null;
    }

    return (
      <div className={s.subTitle}>
        <div>
          <strong>ID: {currentAccountWithStore.id}</strong>
          <Badge
            className={s.badge}
            color={getColorStatus(currentAccountWithStore.status)}
            text={currentAccountWithStore.status}
          />
        </div>

        <strong className={s.balance}>{
          currentAccountWithStore.balance
        } - {
          currentAccountWithStore.available
        }</strong>
      </div>
    );
  };

  return (
    <EditEntityModal<AccountWithStore, FormData>
      className={s.root}
      title="Account"
      SubtitleComponent={SubtitleComponent}
      rows={[
        {
          label: 'Name',
          name: 'name',
        },
      ]}
      isLoading={isAccountsLoading}
      onUpdate={onUpdate}
      onClose={onClose}
      entity={currentAccountWithStore}
      editDropdown={{
        title: 'Status',
        dropdownProp: 'status',
        dropdownItems: [
          { key: AccountWithStorageStatusEnum.ACTIVE, label: 'Activate' },
          { key: AccountWithStorageStatusEnum.DEACTIVATED, label: 'Deactivated' },
          { key: AccountWithStorageStatusEnum.FREEZED, label: 'Freezed' },
        ],
        onDelete,
      }}
    />
  );
};
