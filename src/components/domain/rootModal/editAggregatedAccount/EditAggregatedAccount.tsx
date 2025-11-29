import { EditEntityModal } from '@components/ui/editEntityModal/EditEntityModal';
import { getColorStatus } from '@constants/colorStatusMap';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useAccountsAggregatedWithStorageStore } from '@stores/cashier/accountsAggregatedWithStorage';
import { useModalStore } from '@stores/modal';
import { AccountAggregatedWithStorage, AccountWithStorageStatusEnum } from '@typings/api/cashier';
import { addToast } from '@utils/domain/toastEventBus';
import { Badge, Typography } from 'antd';

import s from './editAggregatedAccount.module.css';

const { Title } = Typography;

type FormData = {
  status?: AccountAggregatedWithStorage['status'];
}

export const EditAggregatedAccount: React.FC = () => {
  const {
    currentAggregatedAccount,
    isLoading,
    multiplyUpdateAccounts,
    updateAccountsAggregatedWithStorage,
  } = useAccountsAggregatedWithStorageStore();
  const {
    updateAccountsList,
  } = useAccountsStore();
  const { close } = useModalStore();

  const onUpdate = async (data: FormData) => {
    if (currentAggregatedAccount) {
      await multiplyUpdateAccounts({
        ids: currentAggregatedAccount.ids,
        ...data,
      });
      await Promise.all([
        updateAccountsAggregatedWithStorage(),
        updateAccountsList(),
      ]);
      addToast({
        description: `All '${currentAggregatedAccount.name}' accounts updated`
      });
      close();
    }
  };

  const SubtitleComponent = () => {
    if (!currentAggregatedAccount) {
      return null;
    }

    return (
      <div className={s.subTitle}>
        <div>
          <Title level={3} className={s.title}>{currentAggregatedAccount.name}</Title>
          <strong>IDs:</strong> {currentAggregatedAccount.ids.join(', ')}
          <Badge
            className={s.badge}
            color={getColorStatus(currentAggregatedAccount.status)}
            text={currentAggregatedAccount.status}
          />
        </div>

        <span className={s.balance}>
          <strong>Balance: </strong>{
            currentAggregatedAccount.balance
          } {
            currentAggregatedAccount.currency.code
          }
          <strong> Available: </strong>{
            currentAggregatedAccount.available
          } {
            currentAggregatedAccount.currency.code
          }</span>
      </div>
    );
  };

  return (
    <EditEntityModal<AccountAggregatedWithStorage, FormData>
      className={s.root}
      title="Account"
      SubtitleComponent={SubtitleComponent}
      isLoading={isLoading}
      onUpdate={onUpdate}
      entity={currentAggregatedAccount}
      rows={[]}
      editDropdown={{
        title: 'Status',
        dropdownProp: 'status',
        dropdownItems: [
          { key: AccountWithStorageStatusEnum.ACTIVE, label: 'Activate' },
          { key: AccountWithStorageStatusEnum.FREEZED, label: 'Freezed' },
        ],
      }}
    />
  );
};
