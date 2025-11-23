import { deleteAccountApi, updateAccountApi } from '@apiMethods/cashier';
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
    updateAccountsList,
    setCurrentAccountWithStore,
  } = useAccountsStore();

  const onUpdate = async (formData: FormData) => {
    if (currentAccountWithStore) {
      const resp = await updateAccountApi(currentAccountWithStore.id, formData);
      setCurrentAccountWithStore(resp);
      updateAccountsList();
    }
  };

  const onDelete = async () => {
    if (currentAccountWithStore) {
      await deleteAccountApi(currentAccountWithStore.id);
      updateAccountsList();
    }
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
      initialValues={{
        name: currentAccountWithStore?.name,
      }}
      isLoading={isAccountsLoading}
      onUpdate={onUpdate}
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
