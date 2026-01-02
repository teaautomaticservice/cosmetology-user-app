import { MoneyStorageBadge } from '@components/domain/moneyStorages/moneyStorageBadge/MoneyStorageBadge';
import { EditEntityModal } from '@components/ui/editEntityModal/EditEntityModal';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { useObligationAccountStore } from '@stores/cashier/obligationAccount';
import { useModalStore } from '@stores/modal';
import { useUpdateMoneyStorageStore } from '@stores/updateMoneyStorage';
import { MoneyStorage, MoneyStorageStatusEnum, MoneyStorageTypeEnum } from '@typings/api/cashier';
import { Button } from 'antd';

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
  const {
    setCurrentObligationStorage,
  } = useObligationAccountStore();
  const {
    open,
  } = useModalStore();

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

  const onOpenBalanceObligation = () => {
    setCurrentObligationStorage(currentMoneyStorage);
    open('createOpenBalanceObligationModal');
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

  const btnElForObligation = (
    <Button onClick={onOpenBalanceObligation}>
      Open balance for obligation
    </Button>
  );

  return (
    <EditEntityModal<MoneyStorage, FormData>
      className={s.root}
      title={title}
      rows={[
        { label: 'Name:', name: 'name' },
        { label: 'Code:', name: 'code' },
        {
          label: 'Description:',
          name: 'description',
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
      footerEl={currentMoneyStorage?.type === MoneyStorageTypeEnum.OBLIGATION && btnElForObligation}
    />
  );
};
