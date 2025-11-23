import { EditEntityModal } from '@components/ui/editEntityModal/EditEntityModal';
import { getColorStatus } from '@constants/colorStatusMap';
import { useCurrenciesStore } from '@stores/cashier/currencies';
import { Currency, CurrencyStatusEnum } from '@typings/api/cashier';
import { Badge } from 'antd';

import s from './editCurrency.module.css';

type FormData = {
  name?: string;
  code?: string;
}

export const EditCurrency: React.FC = () => {
  const {
    currentCurrency,
    isCurrenciesLoading: isLoading,
    updateCurrenciesList,
    deleteCurrency,
    updateCurrency,
    setCurrentCurrency,
  } = useCurrenciesStore();

  const SubtitleComponent = () => {
    if (!currentCurrency) {
      return null;
    }

    return (
      <>
        <strong>ID: {currentCurrency.id}</strong>
        <Badge
          className={s.badge}
          color={getColorStatus(currentCurrency.status)}
          text={currentCurrency.status}
        />
      </>
    );
  };

  const onUpdate = async (newData: FormData) => {
    if (currentCurrency) {
      await updateCurrency(currentCurrency.id, newData);
      updateCurrenciesList();
    }
  };

  const onDelete = async () => {
    if (currentCurrency) {
      await deleteCurrency(currentCurrency.id);
    }
  };

  const onClose = () => {
    setCurrentCurrency(null);
  };

  return (
    <EditEntityModal<Currency, FormData>
      className={s.root}
      title="Currency"
      SubtitleComponent={SubtitleComponent}
      rows={[
        {
          label: 'Name',
          name: 'name',
        },
        {
          label: 'Code',
          name: 'code',
        },
      ]}
      isLoading={isLoading}
      onUpdate={onUpdate}
      onClose={onClose}
      entity={currentCurrency}
      editDropdown={{
        title: 'Status',
        dropdownProp: 'status',
        dropdownItems: [
          { key: CurrencyStatusEnum.ACTIVE, label: 'Activate' },
          { key: CurrencyStatusEnum.DISABLED, label: 'Disable' },
        ],
        onDelete,
      }}
    />
  );
};
