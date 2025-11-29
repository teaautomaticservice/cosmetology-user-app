import { deleteAccountApi, updateAccountApi } from '@apiMethods/cashier';
import { EditEntityModal } from '@components/ui/editEntityModal/EditEntityModal';
import { getColorStatus } from '@constants/colorStatusMap';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useCurrenciesStore } from '@stores/cashier/currencies';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import {
  AccountWithStorageStatusEnum,
  AccountWithStore,
} from '@typings/api/cashier';
import { Badge } from 'antd';
import { fromEntityToOptionsList } from 'src/adapters/fromEntityToOptionsList';

import s from './editAccountWithStorages.module.css';

type FormData = {
  name?: string;
  currencyId?: number;
  status?: AccountWithStore['status'];
}

export const EditAccountWithStorages: React.FC = () => {
  const {
    currentAccountWithStore,
    isAccountsLoading,
    updateAccountsList,
    setCurrentAccountWithStore,
  } = useAccountsStore();
  const {
    activeCurrencies,
  } = useCurrenciesStore();
  const {
    activeMoneyStorages,
  } = useMoneyStoragesStore();

  const currenciesOptions = fromEntityToOptionsList(activeCurrencies);
  const moneyStoragesOptions = fromEntityToOptionsList(activeMoneyStorages);

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
        {
          label: 'Currency',
          name: 'currencyId',
          type: 'select',
          options: currenciesOptions,
        },
        {
          label: 'Money storage',
          name: 'moneyStorageId',
          type: 'select',
          options: moneyStoragesOptions,
        },
      ]}
      initialValues={{
        name: currentAccountWithStore?.name,
        currencyId: currentAccountWithStore?.currencyId,
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
