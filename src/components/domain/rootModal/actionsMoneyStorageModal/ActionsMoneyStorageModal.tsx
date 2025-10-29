import { MoneyStorageBadge } from '@components/domain/moneyStorages/moneyStorageBadge/MoneyStorageBadge';
import { EditEntityModal } from '@components/ui/editEntityModal/EditEntityModal';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { useUpdateMoneyStorageStore } from '@stores/updateMoneyStorage';
import { MoneyStorage, MoneyStorageStatusEnum } from '@typings/api/cashier';

import s from './actionsMoneyStorageModal.module.css';

type FormData = {
  name?: string;
  code?: string;
  description?: string;
}

export const ActionsMoneyStorageModal: React.FC = () => {
  const { updateAllMoneyStorages } = useMoneyStoragesStore();

  const {
    isLoading,
    currentMoneyStorage,
    updateMoneyStorageData,
    deleteMoneyStorage
  } = useUpdateMoneyStorageStore();

  const title = currentMoneyStorage ?
    `${currentMoneyStorage?.name}, ${currentMoneyStorage?.code}` :
    'Money storage detail';

  const onUpdate = async (formData: FormData) => {
    await updateMoneyStorageData(formData);
    updateAllMoneyStorages();
  };

  const onDelete = async () => {
    await deleteMoneyStorage();
    updateAllMoneyStorages();
  };

  const SubtitleComponent = () => (
    <>
      <strong>ID: {currentMoneyStorage?.id}</strong>
      <MoneyStorageBadge
        className={s.badge}
        moneyStorageStatus={currentMoneyStorage?.status}
      />
    </>
  );

  return (
    <EditEntityModal<MoneyStorage, FormData>
      className={s.root}
      title={title}
      rows={[
        { label: 'Name:', name: 'name', value: currentMoneyStorage?.name ?? 'N/A' },
        { label: 'Code:', name: 'code', value: currentMoneyStorage?.code ?? 'N/A' },
        {
          label: 'Description:',
          name: 'description',
          value: currentMoneyStorage?.description ?? 'N/A',
        }
      ]}
      onUpdate={onUpdate}
      isLoading={isLoading}
      entity={currentMoneyStorage}
      SubtitleComponent={SubtitleComponent}
      editDropdown={{
        title: 'Change status',
        dropdownProp: 'status',
        dropdownItems: [
          { key: MoneyStorageStatusEnum.ACTIVE, label: 'Activate' },
          { key: MoneyStorageStatusEnum.FREEZED, label: 'Freeze' },
          { key: MoneyStorageStatusEnum.DEACTIVATED, label: 'Deactivate' },
        ],
        onDelete,
      }}
    />
  );
};
